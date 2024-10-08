import { useCallback, useEffect, useMemo, useState } from "react";
import { useSessionStore } from "../stores/useSessionStore";
import { motion, useAnimate } from "framer-motion";
import { useValidateKey } from "../hooks/useValidateKey";
import { hash } from "../utilities/hash";
import { useIsSetup } from "../hooks/useIsSetup";
import { Register } from "./Register";

export const Locked = () => {
  const state = useSessionStore();

  const [ref, animate] = useAnimate();

  const [key, setKey] = useState("");

  const { validate } = useValidateKey();

  const handleSubmit = async () => {
    const hashedKey = hash(key);

    const isValid = await validate(hashedKey);

    state.setLocked(!isValid);

    if (isValid) {
      state.setMasterEncryptionKey(hashedKey);
      setError("");
    } else {
      setError("Invalid key.");
    }
  };

  const [error, setError] = useState("");

  const { isSetup } = useIsSetup();

  useEffect(() => {
    if (!isSetup) return;

    if (state.masterEncryptionKey) {
      ref.current.style.display = "none";
      return;
    }

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

  let inputClass = "bg-slate-300 p-2 rounded-md border-2 border-blue-400";

  if (!isSetup) return <Register />;

  if (!!error) {
    inputClass = inputClass.replace("border-blue-400", "border-red-400");
  }

  return (
    <div ref={ref} className="h-full w-full fixed top-[0px]left-0 z-20">
      <div className="flex flex-col gap-4 w-full h-full justify-center items-center bg-slate-200">
        <p className="text-4xl ubuntu-bold">Locked</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleSubmit();
          }}
          className="flex flex-col w-full items-center gap-4"
        >
          <p className="text-lg">
            Enter your master encryption key to unlock <b>Cerberus</b>.
          </p>

          <div className="flex flex-col min-w-[30%] gap-2">
            <input
              type="password"
              className={inputClass}
              value={key}
              onChange={(e) => setKey(e.target.value)}
            />
            {!!error && (
              <p className="text-red-400 font-semibold ml-4">{error}</p>
            )}
          </div>
          <button className="bg-black text-slate-200 px-4 py-2 h-fit rounded-md text-lg font-bold">
            Unlock
          </button>
        </form>
      </div>
    </div>
  );
};
