import { useEffect } from "react";
import { useSessionStore } from "../stores/useSessionStore";
import { motion, useAnimate } from "framer-motion";

export const Locked = () => {
  const state = useSessionStore();

  const [ref, animate] = useAnimate();

  useEffect(() => {
    if (state.locked) {
      animate(
        ref.current,
        {
          y: 0,
          opacity: 1,
          display: "fixed",
        },
        { ease: "easeInOut" },
      );
    } else {
      animate(
        ref.current,
        {
          y: "-100vh",
          opacity: 0,
          display: "none",
        },
        { ease: "easeInOut", duration: 0.2 },
      );
    }
  }, [state.locked]);

  return (
    <div ref={ref} className="h-full w-full fixed top-[0px]left-0 z-20">
      <div className="flex flex-col gap-4 w-full h-full justify-center items-center bg-slate-200">
        <p className="text-4xl ubuntu-bold">Locked</p>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex w-full justify-center gap-4"
        >
          <input
            type="password"
            className="bg-slate-300 p-2 rounded-md min-w-[30%]"
          />
          <button
            onClick={() => {
              state.setLocked(false);
            }}
            className="bg-black text-slate-200 px-4 py-2 h-fit rounded-md text-lg font-bold"
          >
            Unlock
          </button>
        </form>
      </div>
    </div>
  );
};
