import { useEffect, useState } from "react";
import "./App.css";
import { useGetFiles } from "./hooks/useGetFiles";
import { File } from "./components/File/File";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { LockClosedIcon, XCircleIcon } from "@heroicons/react/16/solid";
import { motion } from "framer-motion";
import { Locked } from "./pages/Locked";
import { useSessionStore } from "./stores/useSessionStore";
import { UploadModal } from "./components/UploadModal/UploadModal";
import { encrypt } from "./utilities/encrypt";
import CryptoJS from "crypto-js";
import { useValidateKey } from "./hooks/useValidateKey";
import { useUploadFile } from "./hooks/useUploadFile";

function App() {
  const { files, getFiles } = useGetFiles();
  const [uploadOpen, setUploadOpen] = useState(false);
  const [modalClass, setModalClass] = useState();

  const [title, setTitle] = useState("");

  const [searchText, setSearchText] = useState("");

  const state = useSessionStore();
  const validateKey = useValidateKey();

  const { uploadFile } = useUploadFile();

  const handleSubmit = async () => {
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    const file = fileInput.files![0];

    await uploadFile({ file, title });
    setUploadOpen(false);
    setTitle("");
    getFiles();
  };

  useEffect(() => {
    const main = async () => {
      if (state.masterEncryptionKey) {
        const isValid = await validateKey.validate(state.masterEncryptionKey);

        if (isValid) return;

        state.setMasterEncryptionKey("");
        state.setLocked(true);
      }
    };

    main();
  }, []);

  return (
    <>
      {!state.masterEncryptionKey && <Locked />}
      <div className="flex flex-col min-h-screen bg-orange-200">
        <div className="flex items-center justify-between p-8 gap-1">
          <div className="flex items-center gap-2">
            <p className="text-4xl font-bold">Cerberus</p>
            <div className="flex justify-center">
              <LockClosedIcon width={32} className="text-black" />
            </div>
          </div>
          <SearchBar
            setModal={setUploadOpen}
            searchText={searchText}
            setSearchText={setSearchText}
            lockApp={() => {
              state.setLocked(true);
              state.setMasterEncryptionKey("");
            }}
          />
        </div>
        <div
          className={
            "grid grid-cols-2 md:grid-cols-4 p-4 auto-rows-min gap-y-4 gap-x-4 w-full bg-white border-slate-200 border-t-4 min-h-full"
          }
        >
          {files
            .filter((file) => {
              return file.title
                .toLowerCase()
                .includes(searchText.toLowerCase());
            })
            .map((file, i) => (
              <motion.div
                key={file.uuid}
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, ease: "easeInOut" }}
              >
                <File key={file.uuid} title={file.title} uuid={file.uuid} />
              </motion.div>
            ))}
        </div>
      </div>
      <UploadModal
        uploadOpen={uploadOpen}
        handleSubmit={handleSubmit}
        setUploadOpen={setUploadOpen}
        setTitle={setTitle}
        title={title}
      />
    </>
  );
}

export default App;
