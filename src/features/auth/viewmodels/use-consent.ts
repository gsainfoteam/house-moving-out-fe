import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ConsentState {
  privacyPolicy: boolean;
  termsOfService: boolean;
  setPrivacyPolicy: (value: boolean) => void;
  setTermsOfService: (value: boolean) => void;
  setAll: (value: boolean) => void;
  isAllAgreed: () => boolean;
  reset: () => void;
}

const CONSENT_STORAGE_KEY = 'consent';

const initialState = {
  privacyPolicy: false,
  termsOfService: false,
};

export const useConsent = create<ConsentState>()(
  persist(
    (set, get) => ({
      ...initialState,
      setPrivacyPolicy: (value) =>
        set((state) => ({ ...state, privacyPolicy: value })),
      setTermsOfService: (value) =>
        set((state) => ({ ...state, termsOfService: value })),
      setAll: (value) =>
        set({
          privacyPolicy: value,
          termsOfService: value,
        }),
      isAllAgreed: () => {
        const state = get();
        return state.privacyPolicy && state.termsOfService;
      },
      reset: () => set(initialState),
    }),
    { name: CONSENT_STORAGE_KEY },
  ),
);
