import { useParams } from '@tanstack/react-router';

import { useInspectorsOfSchedule } from '../../viewmodels';

export function InspectorsListFrame() {
  const { uuid } = useParams({ from: '/admin/schedules/$uuid/inspectors' });
  const { data: inspectors } = useInspectorsOfSchedule(uuid);

  return (
    <div className="flex flex-col gap-4 p-4">
      <div>{JSON.stringify(inspectors)}</div>
    </div>
  );
}
