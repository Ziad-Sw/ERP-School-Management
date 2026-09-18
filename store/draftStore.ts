import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type DraftState = {
  drafts: Record<string, unknown>;
  setDraft: (key: string, data: unknown) => void;
  getDraft: (key: string) => unknown;
  clearDraft: (key: string) => void;
};

export const useDraftStore = create<DraftState>()(
  persist(
    (set, get) => ({
      drafts: {},
      setDraft: (key, data) =>
        set((state) => ({ drafts: { ...state.drafts, [key]: data } })),
      getDraft: (key) => get().drafts[key],
      clearDraft: (key) =>
        set((state) => {
          const next = { ...state.drafts };
          delete next[key];
          return { drafts: next };
        }),
    }),
    { name: 'draft-storage' }
  )
);
