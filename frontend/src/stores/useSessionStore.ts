import { create } from "zustand";

export const useSessionStore = create<{
  locked: boolean;
  masterEncryptionKey: string;

  setLocked: (locked: boolean) => void;
  setMasterEncryptionKey: (masterEncryptionKey: string) => void;
}>((set) => ({
  locked: true,
  masterEncryptionKey: "",

  setLocked: (locked: boolean) => set({ locked }),
  setMasterEncryptionKey: (masterEncryptionKey: string) =>
    set({ masterEncryptionKey }),
}));
