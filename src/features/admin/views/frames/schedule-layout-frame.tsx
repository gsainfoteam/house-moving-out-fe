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

  return (
    <Link
      to={to}
      from="/admin/schedules/$uuid"
      className={cn(
        'flex gap-2 rounded-xl p-2 hover:bg-gray-100',
        location.pathname === props.href && 'bg-gray-100',
      )}
    >
      {icon}
      {text}
    </Link>
  );
};

export function ScheduleLayoutFrame() {
  const { t } = useTranslation('admin');
  return (
    <div className="flex flex-1">
      <aside className="flex shrink-0 flex-col gap-1 border-r border-gray-200 p-2">
        <LinkButton to="." icon={<LayoutDashboard />} text={t('schedule.main')} />
        <LinkButton to="./targets" icon={<Target />} text={t('target.list')} />
        <LinkButton to="./applications" icon={<Pencil />} text={t('application.list')} />
        <LinkButton to="./inspectors" icon={<Clipboard />} text={t('inspectors.list.title')} />
      </aside>
      <Outlet />
    </div>
  );
}
