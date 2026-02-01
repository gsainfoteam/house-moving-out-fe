import { useFindActiveMoveOutScheduleWithSlots } from '../../viewmodels';

export function ApplicationFrame() {
  const { inspectionDays } = useFindActiveMoveOutScheduleWithSlots();

  return (
    <div className="p-4">
      <div className="flex gap-4">
        {inspectionDays.map((day) => (
          <div key={day.toISOString()} className="flex flex-col gap-1 text-center">
            <h2>{day.format('MM/DD')}</h2>
            <p>{day.format('dddd')}</p>
          </div>
        ))}
      </div>
      <h1>Application Frame</h1>
    </div>
  );
}
