import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface OAuthState {
  state: string | null;
  codeVerifier: string | null;
  nonce: string | null;
  setState: (state: string | null) => void;
  setCodeVerifier: (codeVerifier: string | null) => void;
  setNonce: (nonce: string | null) => void;
  clear: () => void;
}

const OAUTH_STATE_STORAGE_KEY = 'oauth_state';

export const useOAuthState = create<OAuthState>()(
  persist(
    (set) => ({
      state: null,
      codeVerifier: null,
      nonce: null,
      setState: (state) => set((prev) => ({ ...prev, state })),
      setCodeVerifier: (codeVerifier) =>
        set((prev) => ({ ...prev, codeVerifier })),
      setNonce: (nonce) => set((prev) => ({ ...prev, nonce })),
      clear: () => set({ state: null, codeVerifier: null, nonce: null }),
    }),
    {
      name: OAUTH_STATE_STORAGE_KEY,
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
