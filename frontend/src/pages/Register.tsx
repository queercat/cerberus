import { FC, useState } from "react";
import { useSetKey } from "../hooks/useSetKey";

export const Register: FC = () => {
  let inputClass = "bg-slate-300 p-2 rounded-md border-2 border-blue-400";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const { setKey } = useSetKey();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    await setKey(password);
  };

  return (
    <div className="h-full w-full fixed top-[0px] left-0 z-20">
      <div className="flex flex-col gap-4 w-full h-full justify-center items-center bg-slate-200">
        <p className="text-4xl ubuntu-bold">Register</p>
        <form
          className="flex flex-col w-full items-center gap-4"
          onSubmit={handleSubmit}
        >
          <p className="text-lg">
            Register a master encryption key for <b>Cerberus</b>.
          </p>

          <div className="flex flex-col min-w-[30%] gap-2">
            <label htmlFor="key_input" className="font-semibold pl-4">
              Key
            </label>
            <input
              id="key_input"
              type="password"
              className={inputClass}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="confirm_key_input" className="font-semibold pl-4">
              Confirm Key
            </label>
            <input
              id="confirm_key_input"
              type="password"
              className={inputClass}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button className="bg-black text-slate-200 px-4 py-2 h-fit rounded-md text-lg font-bold">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};
