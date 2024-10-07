import { base64StringToBlob } from "blob-util";

export const useGetFile = () => {
  const getFile = async (uuid: string) => {
    const response = await fetch(`http://localhost:4000/api/file/${uuid}`);

    const data = await response.json();

    return {
      ...data,
      data: base64StringToBlob(data.data, data.type),
    };
  };

  return { getFile };
};
