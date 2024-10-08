import { XCircleIcon } from "@heroicons/react/16/solid";
import { FC, useEffect, useState } from "react";

export const UploadModal: FC<{
  uploadOpen: boolean;
  setUploadOpen: (uploadOpen: boolean) => void;
  title: string;
  setTitle: (title: string) => void;
  handleSubmit: () => void;
}> = ({ handleSubmit, setTitle, setUploadOpen, title, uploadOpen }) => {
  const [modalClass, setModalClass] = useState(
    "fixed z-10 hidden bg-slate-500 bg-opacity-50 min-w-full min-h-full justify-center items-center",
  );

  useEffect(() => {
    if (!uploadOpen) {
      const newModalClass = modalClass.replace("flex", "hidden");
      setModalClass(newModalClass);
      return;
    }

    const newModalClass = modalClass.replace("hidden", "flex");
    setModalClass(newModalClass);
  }, [uploadOpen]);

  return (
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
  );
};
