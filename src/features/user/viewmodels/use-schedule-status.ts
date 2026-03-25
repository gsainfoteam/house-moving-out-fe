import { create } from 'zustand';

export type ScheduleStatus =
  | 'not_period'
  | 'not_target'
  | 'cleaning_service'
  | 'application'
  | 'waiting'
  | 'in_progress'
  | 'failed'
  | 'passed';

type ScheduleStatusStore = {
  status: ScheduleStatus;
  setStatus: (status: ScheduleStatus) => void;
};

export const useScheduleStatus = create<ScheduleStatusStore>((set) => ({
  status: 'not_period',
  setStatus: (status) => set({ status }),
}));
