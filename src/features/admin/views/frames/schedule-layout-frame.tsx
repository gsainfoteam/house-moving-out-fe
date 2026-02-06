import { Link, Outlet } from '@tanstack/react-router';

import { Clipboard, LayoutDashboard, Pencil, Target } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function ScheduleLayoutFrame() {
  const { t } = useTranslation('admin');
  return (
    <div className="flex flex-1">
      <aside className="flex shrink-0 flex-col gap-2 border-r border-gray-200 p-4">
        <Link to="/admin/schedules/$uuid" from="/admin/schedules/$uuid" className="flex gap-2">
          <LayoutDashboard />
          {t('schedule.main')}
        </Link>
        <Link
          to="/admin/schedules/$uuid/targets"
          from="/admin/schedules/$uuid"
          className="flex gap-2"
        >
          <Target />
          {t('target.list')}
        </Link>
        <Link
          to="/admin/schedules/$uuid/applications"
          from="/admin/schedules/$uuid"
          className="flex gap-2"
        >
          <Pencil />
          {t('application.list')}
        </Link>
        <Link
          to="/admin/schedules/$uuid/inspectors"
          from="/admin/schedules/$uuid"
          className="flex gap-2"
        >
          <Clipboard />
          {t('inspectors.list')}
        </Link>
      </aside>
      <Outlet />
    </div>
  );
}
