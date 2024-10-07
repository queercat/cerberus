import { FC } from "react"
import "./File.css"
import { ArrowDownCircleIcon } from "@heroicons/react/16/solid"

export const File: FC<{title: string, uuid: string}> = (props) => {
    return (
        <div className="file bg-slate-200 relative smooth-border border-2 border-slate-300 hover:border-slate-950 p-4 shadow-md min-h-32 rounded-md flex justify-center items-center h-fit">
            <p className="font-bold">{props.title}</p>
            <div className="download-icon">
                <ArrowDownCircleIcon width={32} className="squirk" />
            </div>
        </div>
    )
}