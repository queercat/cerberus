import { useEffect, useState } from "react";
import "./App.css";
import { useGetFiles } from "./hooks/useGetFiles";
import { File } from "./components/File/File";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { LockClosedIcon, XCircleIcon } from "@heroicons/react/16/solid";
import { motion } from "framer-motion";
import { encode } from "js-base64";
import { Locked } from "./pages/Locked";

function App() {
  const { files, getFiles } = useGetFiles();
  const [uploadOpen, setUploadOpen] = useState(false);
  const [modalClass, setModalClass] = useState(
    "absolute z-10 hidden bg-slate-500 bg-opacity-50 min-w-full min-h-full justify-center items-center",
  );

  const [title, setTitle] = useState("");

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (!uploadOpen) {
      const newModalClass = modalClass.replace("flex", "hidden");
      setModalClass(newModalClass);
      return;
    }

    const newModalClass = modalClass.replace("hidden", "flex");
    setModalClass(newModalClass);
  }, [uploadOpen]);

  const handleSubmit = async () => {
    const api = "http://localhost:4000/api/files";
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    const file = fileInput.files![0];

    const fileData = btoa(
      new Uint8Array(await file.arrayBuffer()).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        "",
      ),
    );

    const fileType = file.type;

    const payload = {
      title: title,
      data: fileData,
      type: fileType,
    };

    fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).then(() => {
      getFiles();
      setUploadOpen(false);
      setTitle("");
    });
  };

  return (
    <>
      <Locked />
      <div className="flex items-center bg-slate-400 flex-1 flex-col">
        <SearchBar
          setModal={setUploadOpen}
          searchText={searchText}
          setSearchText={setSearchText}
        />
        <div className="flex w-full items-center p-8 gap-1">
          <p className="text-4xl font-bold">Cerberus</p>
          <div className="flex min-h-full justify-center">
            <LockClosedIcon width={32} className="text-black" />
          </div>
        </div>
        <div
          className={
            "grid grid-cols-2 md:grid-cols-4 p-4 grid-rows-5 gap-x-4 w-full bg-white border-slate-200 border-t-4 min-h-full"
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
        <div className={modalClass}>
          <dialog
            open={uploadOpen}
            className="pt-8 rounded-md border-r-4 border-slate-200 shadow-xl"
          >
            <button
              className="absolute top-4 right-4"
              onClick={() => setUploadOpen(false)}
            >
              <XCircleIcon width={24} />
            </button>
            <form
              className="flex flex-col gap-2 p-4"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className="grid items-center">
                <label htmlFor="titleInput" className="font-semibold">
                  Title*
                </label>
                <input
                  type="text"
                  id="titleInput"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  className="bg-slate-200 p-2 rounded-md"
                />
              </div>
              <div className="grid items-center">
                <label htmlFor="fileInput" className="font-semibold">
                  File*
                </label>
                <input
                  type="file"
                  id="fileInput"
                  className="bg-slate-200 p-2 rounded-md"
                />
              </div>
              <button
                onClick={handleSubmit}
                className="bg-black text-slate-200 px-4 py-2 rounded-md text-sm"
              >
                Upload
              </button>
            </form>
          </dialog>
        </div>
      </div>
    </>
  );
}

export default App;
