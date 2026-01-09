import { create } from 'zustand';

interface AuthPromptState {
  recentLogout: boolean;
  setRecentLogout: (recentLogout: boolean) => void;
}

export const useAuthPrompt = create<AuthPromptState>((set) => ({
  recentLogout: false,
  setRecentLogout: (recentLogout) => set((prev) => ({ ...prev, recentLogout })),
}));
