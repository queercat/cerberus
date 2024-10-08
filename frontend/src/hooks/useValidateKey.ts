export const useValidateKey = () => {
  const validate = async (key: string) => {
    const payload = { hashed_key: key };
    const api = "http://localhost:4000/api/key/validate";

    const response = await fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    return data.message === "valid";
  };

  return { validate };
};
