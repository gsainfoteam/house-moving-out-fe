import { useMemo, useState } from 'react';

import dayjs from 'dayjs';
import { isNil } from 'es-toolkit';

import { useGetInspectionTargets } from '../../viewmodels';
import { InspectionListScreen } from '../screens';

export function InspectionListFrame() {
  const [filter, setFilter] =
    useState<React.ComponentProps<typeof InspectionListScreen>['filter']>('all');
  const { targets, isLoading } = useGetInspectionTargets();
  const filteredTargets = useMemo(() => {
    return targets.filter((target) => {
      if (filter === 'all') return true;
      if (filter === 'today') return dayjs(target.inspectionTime).isSame(dayjs(), 'day');
      if (filter === 'not_completed') return isNil(target.status);
      throw new Error(`Invalid filter: ${filter}`);
    });
  }, [targets, filter]);

  return (
    <InspectionListScreen
      targets={filteredTargets}
      isLoading={isLoading}
      filter={filter}
      onFilterChange={setFilter}
    />
  );
}
