import { create } from "zustand";
import { devtools, persist, PersistStorage } from "zustand/middleware";

interface SessionState {
  locked: boolean;
  setLocked: (locked: boolean) => void;
  masterEncryptionKey: string;
  setMasterEncryptionKey: (masterEncryptionKey: string) => void;
}

export const useSessionStore = create<SessionState>()(
  devtools(
    persist(
      (set) => ({
        locked: true,
        setLocked: (locked) => set({ locked }),
        masterEncryptionKey: "",
        setMasterEncryptionKey: (masterEncryptionKey) =>
          set({ masterEncryptionKey }),
      }),
      { name: "session-store" },
    ),
  ),
);
