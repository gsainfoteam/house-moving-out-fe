import { ExternalLink, LogOut } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Button, LayoutCard } from '@/common/components';
import { cn } from '@/common/utils';
import type { Gender } from '@/features/user';

function InfoRow({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={cn('flex items-center justify-between py-3', className)}>
      <span className="text-body text-text-secondary">{label}</span>
      <span className="text-body text-text-primary font-medium">{value}</span>
    </div>
  );
}

function Avatar({ name }: { name: string }) {
  return (
    <div className="bg-primary/10 flex size-20 items-center justify-center rounded-full">
      <span className="text-primary text-2xl font-semibold">{name.slice(0, 1)}</span>
    </div>
  );
}

export function MypageScreen({
  isLoading,
  name,
  email,
  studentNumber,
  gender,
  roomNumber,
  houseName,
  applyCleaningService,
  isInspector,
  onLogout,
}: MypageScreen.Props) {
  const { t } = useTranslation('user');

  return (
    <LayoutCard.Root isLoading={isLoading}>
      <LayoutCard.Header className="items-center">
        {name && <Avatar name={name} />}
        <LayoutCard.Text className="items-center">
          <LayoutCard.Title className="text-text-primary">{name}</LayoutCard.Title>
          <LayoutCard.Description>{email}</LayoutCard.Description>
        </LayoutCard.Text>
      </LayoutCard.Header>
      <LayoutCard.Body>
        <div className="divide-border w-full divide-y">
          {studentNumber && (
            <InfoRow label={t('mypage.fields.studentNumber')} value={studentNumber} />
          )}
          {gender && (
            <InfoRow
              label={t('mypage.fields.gender')}
              value={t(`mypage.gender.${gender.toLowerCase() as 'male' | 'female'}`)}
            />
          )}
          {roomNumber && (
            <InfoRow
              label={t('mypage.fields.roomNumber')}
              value={houseName ? `${houseName}동 ${roomNumber}호` : `${roomNumber}호`}
            />
          )}
          {applyCleaningService !== undefined && (
            <InfoRow
              label={t('mypage.fields.cleaningService')}
              value={
                applyCleaningService
                  ? t('mypage.cleaningService.applied')
                  : t('mypage.cleaningService.notApplied')
              }
            />
          )}
          {isInspector !== undefined && (
            <InfoRow
              label={t('mypage.fields.inspector')}
              value={isInspector ? t('mypage.inspector.yes') : t('mypage.inspector.no')}
            />
          )}
        </div>
      </LayoutCard.Body>

      <LayoutCard.Footer>
        <div className="flex w-full flex-col gap-3">
          <Button variant="outline" className="w-full" asChild>
            <a href="https://account.gistory.me/" target="_blank" rel="noreferrer">
              {t('mypage.accountSettings')}
              <ExternalLink className="size-4" />
            </a>
          </Button>
          <Button variant="failed-outline" className="w-full" onClick={onLogout}>
            <LogOut className="size-4" />
            {t('fab.logout', { ns: 'common' })}
          </Button>
        </div>
      </LayoutCard.Footer>
    </LayoutCard.Root>
  );
}

export namespace MypageScreen {
  export type Props = {
    isLoading: boolean;
    name?: string;
    email?: string;
    studentNumber?: string;
    gender?: Gender;
    roomNumber?: string;
    houseName?: string;
    applyCleaningService?: boolean;
    isInspector?: boolean;
    onLogout?: () => void;
  };
}
