import { base64StringToBlob } from "blob-util";
import { useSessionStore } from "../stores/useSessionStore";
import { decrypt } from "../utilities/decrypt";

export const useGetFile = () => {
  const session = useSessionStore();

  const getFile = async (uuid: string) => {
    const response = await fetch(`http://localhost:4000/api/file/${uuid}`);

    const data = await response.json();

    return {
      ...data,
      data: base64StringToBlob(
        decrypt(data.data, session.masterEncryptionKey + data.salt.trim()),
        data.type,
      ),
    };
  };

  return { getFile };
};
