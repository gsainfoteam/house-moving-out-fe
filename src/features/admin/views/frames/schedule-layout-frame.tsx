import {
  Link,
  Outlet,
  useLinkProps,
  useLocation,
  type RegisteredRouter,
  type UseLinkPropsOptions,
} from '@tanstack/react-router';

import { Clipboard, LayoutDashboard, Pencil, Target } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { cn } from '@/common/utils';

const LinkButton = ({
  icon,
  to,
  text,
}: {
  icon: React.ReactNode;
  to: UseLinkPropsOptions<RegisteredRouter, '/admin/schedules/$uuid'>['to'];
  text: string;
}) => {
  const location = useLocation();
  const props = useLinkProps({ to, from: '/admin/schedules/$uuid' });
  const isActive = location.pathname === props.href;

  return (
    <Link
      to={to}
      from="/admin/schedules/$uuid"
      className={cn(
        'text-sub2 flex items-center gap-2.5 rounded-lg px-3 py-2.5 transition-colors',
        isActive
          ? 'bg-primary-main/12 text-primary-main font-medium'
          : 'text-text-gray hover:bg-bg-surface hover:text-text-black',
      )}
    >
      <span className={cn('shrink-0 [&>svg]:size-4', isActive && 'text-primary-main')}>{icon}</span>
      {text}
    </Link>
  );
};

export function ScheduleLayoutFrame() {
  const { t } = useTranslation('admin');
  return (
    <div className="flex flex-1">
      <aside className="bg-bg-white flex w-52 shrink-0 flex-col gap-0.5 border-r border-gray-200 p-3">
        <LinkButton to="." icon={<LayoutDashboard />} text={t('schedule.main')} />
        <LinkButton to="./targets" icon={<Target />} text={t('target.list')} />
        <LinkButton to="./applications" icon={<Pencil />} text={t('application.list')} />
        <LinkButton to="./inspectors" icon={<Clipboard />} text={t('inspectors.list.title')} />
      </aside>
      <div className="min-h-0 min-w-0 flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
