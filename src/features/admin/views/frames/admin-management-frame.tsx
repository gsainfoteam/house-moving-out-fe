import { useTransition } from 'react';

import dayjs from 'dayjs';
import { Crown, Trash } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Button, Dialog, Input, Loading } from '@/common/components';
import { overlay, useOverlayContext } from '@/common/lib';
import { cn } from '@/common/utils';
import { useAuth } from '@/features/auth';

import {
  useCreateAdminForm,
  useDeleteAdmin,
  useListAdmins,
  useTransferSuperAdmin,
  UserDtoRole,
  type AdminListItem,
} from '../../viewmodels';

function AdminRoleBadge({ role }: { role: UserDtoRole }) {
  const { t } = useTranslation('admin', { keyPrefix: 'admins.role' });
  return (
    <span
      className={cn(
        'text-body rounded-full px-2.5 py-0.5 font-medium',
        role === UserDtoRole.SUPERADMIN && 'bg-primary-light text-primary',
        role === UserDtoRole.ADMIN && 'bg-border text-text-secondary',
      )}
    >
      {role === UserDtoRole.SUPERADMIN ? t('superadmin') : t('admin')}
    </span>
  );
}

function CreateAdminDialog() {
  const { close } = useOverlayContext();
  const { t } = useTranslation('admin', { keyPrefix: 'admins.create' });
  const { register, onSubmit, isSubmitting, errors } = useCreateAdminForm(close);

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <Dialog.Header>
        <Dialog.Title>{t('title')}</Dialog.Title>
      </Dialog.Header>
      <Dialog.Body className="flex flex-col gap-4">
        <label>
          {t('name.label')}
          <Input
            error={errors.name?.message}
            placeholder={t('name.placeholder')}
            {...register('name')}
          />
        </label>
        <label>
          {t('studentNumber.label')}
          <Input
            error={errors.studentNumber?.message}
            placeholder={t('studentNumber.placeholder')}
            {...register('studentNumber')}
          />
        </label>
      </Dialog.Body>
      <Dialog.Footer>
        <Dialog.Close asChild>
          <Button type="button" variant="subtle" disabled={isSubmitting}>
            {t('cancel')}
          </Button>
        </Dialog.Close>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {t('submit')}
        </Button>
      </Dialog.Footer>
    </form>
  );
}

function DeleteAdminDialog({ admin }: { admin: AdminListItem }) {
  const { mutateAsync: deleteAdmin } = useDeleteAdmin();
  const [loading, startLoading] = useTransition();
  const { close } = useOverlayContext();
  const { t } = useTranslation('admin', { keyPrefix: 'admins.actions.delete' });

  return (
    <>
      <Dialog.Header>
        <Dialog.Title>{t('title')}</Dialog.Title>
        <Dialog.Description>{t('description', { name: admin.name })}</Dialog.Description>
      </Dialog.Header>
      <Dialog.Footer>
        <Dialog.Close asChild>
          <Button variant="subtle" disabled={loading}>
            {t('cancel')}
          </Button>
        </Dialog.Close>
        <Button
          className="w-full"
          variant="failed"
          disabled={loading}
          onClick={() =>
            startLoading(() =>
              deleteAdmin({ params: { path: { userUuid: admin.uuid } } })
                .then(close)
                .catch(() => {}),
            )
          }
        >
          {t('submit')}
        </Button>
      </Dialog.Footer>
    </>
  );
}

function TransferSuperAdminDialog({ admin }: { admin: AdminListItem }) {
  const { mutateAsync: transferSuperAdmin } = useTransferSuperAdmin();
  const { refetchUser } = useAuth();
  const [loading, startLoading] = useTransition();
  const { close } = useOverlayContext();
  const { t } = useTranslation('admin', { keyPrefix: 'admins.actions.transfer' });

  return (
    <>
      <Dialog.Header>
        <Dialog.Title>{t('title')}</Dialog.Title>
        <Dialog.Description>{t('description', { name: admin.name })}</Dialog.Description>
      </Dialog.Header>
      <Dialog.Footer>
        <Dialog.Close asChild>
          <Button variant="subtle" disabled={loading}>
            {t('cancel')}
          </Button>
        </Dialog.Close>
        <Button
          className="w-full"
          disabled={loading}
          onClick={() =>
            startLoading(() =>
              transferSuperAdmin({ body: { targetUserUuid: admin.uuid } })
                .then(() => refetchUser())
                .then(close)
                .catch(() => {}),
            )
          }
        >
          {t('submit')}
        </Button>
      </Dialog.Footer>
    </>
  );
}

export function AdminManagementFrame() {
  const { t } = useTranslation('admin', { keyPrefix: 'admins' });
  const { data, isLoading } = useListAdmins();
  const admins = data?.admins ?? [];

  return (
    <main className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-title3 text-text-primary font-semibold">{t('title')}</h1>
        <Button
          onClick={() =>
            overlay.open(() => (
              <Dialog.Root>
                <CreateAdminDialog />
              </Dialog.Root>
            ))
          }
        >
          {t('add')}
        </Button>
      </div>

      {isLoading ? (
        <Loading containerClassName="h-full" />
      ) : admins.length === 0 ? (
        <div className="text-body text-text-secondary">{t('empty')}</div>
      ) : (
        <div className="bg-bg border-border overflow-hidden rounded-xl border">
          <table className="[&_td,&_th]:border-border w-full text-center [&_td,&_th]:border [&_td,&_th]:px-3 [&_td,&_th]:py-2">
            <thead>
              <tr className="bg-bg-surface/80 [&_th]:text-text-primary [&_th]:font-medium">
                <th>{t('columns.name')}</th>
                <th>{t('columns.email')}</th>
                <th>{t('columns.studentNumber')}</th>
                <th>{t('columns.role')}</th>
                <th>{t('columns.createdAt')}</th>
                <th>{t('columns.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin.uuid}>
                  <td>{admin.name}</td>
                  <td>{admin.email}</td>
                  <td>{admin.studentNumber}</td>
                  <td>
                    <AdminRoleBadge role={admin.role} />
                  </td>
                  <td>{dayjs(admin.createdAt).format('YYYY-MM-DD HH:mm')}</td>
                  <td>
                    {admin.role === UserDtoRole.ADMIN && (
                      <div className="flex justify-center gap-2">
                        <Button
                          size="icon"
                          title={t('actions.transfer.title')}
                          onClick={() =>
                            overlay.open(() => (
                              <Dialog.Root>
                                <TransferSuperAdminDialog admin={admin} />
                              </Dialog.Root>
                            ))
                          }
                        >
                          <Crown />
                        </Button>
                        <Button
                          size="icon"
                          className="bg-red-600"
                          title={t('actions.delete.title')}
                          onClick={() =>
                            overlay.open(() => (
                              <Dialog.Root>
                                <DeleteAdminDialog admin={admin} />
                              </Dialog.Root>
                            ))
                          }
                        >
                          <Trash />
                        </Button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
