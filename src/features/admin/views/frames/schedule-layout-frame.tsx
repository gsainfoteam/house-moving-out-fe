import { useState } from 'react';

import {
  Link,
  Outlet,
  useLinkProps,
  useLocation,
  type RegisteredRouter,
  type UseLinkPropsOptions,
} from '@tanstack/react-router';

import {
  ChevronLeft,
  ChevronRight,
  Clipboard,
  LayoutDashboard,
  ListIcon,
  Pencil,
  Target,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { cn } from '@/common/utils';

const LinkButton = ({
  icon,
  to,
  text,
  isCollapsed,
}: {
  icon: React.ReactNode;
  to: UseLinkPropsOptions<RegisteredRouter, '/admin/schedules/$uuid'>['to'];
  text: string;
  isCollapsed: boolean;
}) => {
  const location = useLocation();
  const props = useLinkProps({ to, from: '/admin/schedules/$uuid' });
  const isActive = location.pathname === props.href;

  return (
    <Link
      to={to}
      from="/admin/schedules/$uuid"
      title={isCollapsed ? text : undefined}
      className={cn(
        'text-body flex items-center gap-2.5 rounded-lg px-3 py-2.5 transition-colors',
        isCollapsed && 'justify-center px-2',
        isActive
          ? 'bg-primary/12 text-primary font-medium'
          : 'text-text-secondary hover:bg-bg-surface hover:text-text-primary',
      )}
    >
      <span className={cn('shrink-0 [&>svg]:size-4', isActive && 'text-primary')}>{icon}</span>
      {!isCollapsed && <span className="truncate">{text}</span>}
    </Link>
  );
};

export function ScheduleLayoutFrame() {
  const { t } = useTranslation('admin');
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex min-h-0 flex-1">
      <aside
        className={cn(
          'bg-bg border-border flex shrink-0 flex-col gap-0.5 border-r p-3 transition-[width] duration-200 ease-in-out',
          isCollapsed ? 'w-14' : 'w-52',
        )}
      >
        <div className="flex flex-1 flex-col gap-0.5">
          <LinkButton
            to="."
            icon={<LayoutDashboard />}
            text={t('schedule.main')}
            isCollapsed={isCollapsed}
          />
          <LinkButton
            to="./rooms"
            icon={<ListIcon />}
            text={t('room.list')}
            isCollapsed={isCollapsed}
          />
          <LinkButton
            to="./targets"
            icon={<Target />}
            text={t('target.list')}
            isCollapsed={isCollapsed}
          />
          <LinkButton
            to="./applications"
            icon={<Pencil />}
            text={t('application.list')}
            isCollapsed={isCollapsed}
          />
          <LinkButton
            to="./inspectors"
            icon={<Clipboard />}
            text={t('inspectors.list.title')}
            isCollapsed={isCollapsed}
          />
        </div>
        <button
          type="button"
          onClick={() => setIsCollapsed((c) => !c)}
          title={isCollapsed ? t('schedule.sidebar.expand') : t('schedule.sidebar.collapse')}
          className="text-text-secondary hover:bg-bg-surface hover:text-text-primary mt-2 flex items-center justify-center rounded-lg py-2 transition-colors [&>svg]:size-5"
          aria-label={isCollapsed ? t('schedule.sidebar.expand') : t('schedule.sidebar.collapse')}
        >
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </button>
      </aside>
      <div className="min-h-0 min-w-0 flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
