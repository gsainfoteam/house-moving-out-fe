import { useFindAllMoveOutSchedules } from '../../viewmodels';
import { ScheduleCard } from '../components/schedule-card';

export function ScheduleListFrame() {
  const { data: schedules } = useFindAllMoveOutSchedules();
  return (
    <div className="p-4">
      {schedules ? (
        schedules.map((schedule) => <ScheduleCard schedule={schedule} key={schedule.id} />)
      ) : (
        <div></div>
      )}
    </div>
  );
}
