import { expect, test } from "vitest";

import { encrypt } from "./encrypt";
import { decrypt } from "./decrypt";

test("encrypt and decrypt", () => {
  const data = "hello world";
  const key = "mysecretkey";

  const encrypted = encrypt(data, key);

  // Assert that the encrypted data is different from the original
  expect(encrypted).not.toBe(data);

  const decrypted = decrypt(encrypted, key);

  // Assert that the decrypted data matches the original
  expect(decrypted).toBe(data);
});
