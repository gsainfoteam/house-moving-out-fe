import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { ApplicationUuidDto } from '../../models';

interface ApplicationStoreState {
  applicationUuid: ApplicationUuidDto['applicationUuid'] | null;
  setApplicationUuid: (applicationUuid: ApplicationUuidDto['applicationUuid'] | null) => void;
}

const APPLICATION_STORAGE_KEY = 'user-application';

export const useApplicationStore = create<ApplicationStoreState>()(
  persist(
    (set) => ({
      applicationUuid: null,
      setApplicationUuid: (applicationUuid) => set({ applicationUuid }),
    }),
    {
      name: APPLICATION_STORAGE_KEY,
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
