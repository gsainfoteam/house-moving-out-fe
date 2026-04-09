import { create } from 'zustand';

export type OverlayControllerProps = {
  overlayId: string;
  isOpen: boolean;
  close: () => void;
  unmount: () => void;
};

export type OverlayController = (props: OverlayControllerProps) => React.ReactNode;

type DeclarativeOverlayEntry = {
  id: string;
  controller: OverlayController;
  isOpen: boolean;
};

type OverlayState = {
  entries: DeclarativeOverlayEntry[];
  open: (controller: OverlayController) => string;
  /** 닫기만 하고 스택에는 유지. exit 애니메이션 후 unmount() 호출해야 함. */
  close: (overlayId: string) => void;
  /** 스택에서 제거. close() 후 애니메이션이 끝난 뒤 호출. */
  unmount: (overlayId: string) => void;
};

export const useOverlayStore = create<OverlayState>((set) => ({
  entries: [],

  open: (controller) => {
    const id = crypto.randomUUID();
    set((state) => ({
      entries: [...state.entries, { id, controller, isOpen: true }],
    }));
    return id;
  },

  close: (overlayId) => {
    set((state) => ({
      entries: state.entries.map((e) => (e.id === overlayId ? { ...e, isOpen: false } : e)),
    }));
  },

  unmount: (overlayId) => {
    set((state) => ({
      entries: state.entries.filter((e) => e.id !== overlayId),
    }));
  },
}));

export function useOverlayIsOpen(overlayId: string | null): boolean {
  return useOverlayStore(
    (state) => overlayId !== null && state.entries.some((e) => e.id === overlayId && e.isOpen),
  );
}

export const overlay = {
  open: (controller: OverlayController) => useOverlayStore.getState().open(controller),
  close: (overlayId: string) => useOverlayStore.getState().close(overlayId),
  unmount: (overlayId: string) => useOverlayStore.getState().unmount(overlayId),
  isOpen: (overlayId: string) =>
    useOverlayStore.getState().entries.some((e) => e.id === overlayId && e.isOpen),
};
