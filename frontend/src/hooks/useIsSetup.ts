import { useEffect, useState } from "react";

export const useIsSetup = () => {
  const [isSetup, setIsSetup] = useState(false);

  const query = async () => {
    const api = "http://localhost:4000/api/key";

    const response = await fetch(api);
    const data = await response.json();

    if (data.key === null) {
      setIsSetup(false);
      return;
    }

    setIsSetup(true);
  };

  useEffect(() => {
    query();
  }, []);

  return { isSetup };
};
