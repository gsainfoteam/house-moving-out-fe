export const moveOutQueryKeys = {
  all: ['move-out'] as const,
  schedules: () => [...moveOutQueryKeys.all, 'schedules'] as const,
  schedule: (id: number) => [...moveOutQueryKeys.schedules(), id] as const,
  scheduleWithSlots: (id: number) => [...moveOutQueryKeys.schedule(id), 'with-slots'] as const,
} as const;
