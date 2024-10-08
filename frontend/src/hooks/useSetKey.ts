import * as Argon2 from "argon2";
import { hash } from "../utilities/hash";

export const useSetKey = () => {
  const setKey = async (key: string) => {
    const api = "http://localhost:4000/api/key";

    const payload = {
      hashed_key: hash(key),
    };

    await fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  };

  return { setKey };
};
