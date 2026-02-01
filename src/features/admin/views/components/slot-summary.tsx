import dayjs from 'dayjs';
import { groupBy } from 'es-toolkit/array';

import type { InspectionSlot } from '../../models';

export function SlotSummary({ slots }: { slots: InspectionSlot[] }) {
  const groupedSlot = groupBy(slots, (s) => dayjs(s.startTime).day());
  return <>{JSON.stringify(Object.keys(groupedSlot))}</>;
}
