import { FC } from "react";
import "./File.css";
import { ArrowDownCircleIcon } from "@heroicons/react/16/solid";
import { useGetFile } from "../../hooks/useGetFile";
import { useDownloadBlob } from "../../hooks/useDownloadBlob";

export const File: FC<{ title: string; uuid: string }> = (props) => {
  const { getFile } = useGetFile();
  const { downloadBlob } = useDownloadBlob();

  const handleDownload = async () => {
    const data = await getFile(props.uuid);

    downloadBlob(data.data, data.title);
  };

  return (
    <div
      tabIndex={0}
      onClick={handleDownload}
      className="file min-w-[200px] bg-slate-200 cursor-pointer relative smooth-border border-2 border-slate-300 hover:border-slate-950 p-4 shadow-md min-h-32 rounded-md flex justify-center items-center"
    >
      <p className="font-bold">{props.title}</p>
      <div className="download-icon">
        <ArrowDownCircleIcon width={32} className="squirk" />
      </div>
    </div>
  );
};
