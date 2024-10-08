import { useSessionStore } from "../stores/useSessionStore";
import { encrypt } from "../utilities/encrypt";

export const useUploadFile = () => {
  const state = useSessionStore();

  const uploadFile = async ({ file, title }: { file: File; title: string }) => {
    const api = "http://localhost:4000/files";

    // 1. Base64 encode the file
    let fileData = btoa(
      new Uint8Array(await file.arrayBuffer()).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        "",
      ),
    );

    // 2. Encrypt using the a. master encryption key with aes256, and the b. salt.
    const key = state.masterEncryptionKey;

    const salt = CryptoJS.lib.WordArray.random(16).toString();

    fileData = encrypt(fileData, key + salt);

    const fileType = file.type;

    const payload = {
      title: title,
      data: fileData,
      type: fileType,
      salt: salt,
    };

    await fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  };

  return { uploadFile };
};
