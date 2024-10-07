import { MagnifyingGlassCircleIcon } from "@heroicons/react/16/solid"

export const SearchBar: React.FC<{searchText: string, setSearchText: (text: string) => void}> = (props) => {

    return <input type="text" value={props.searchText} onChange={(e) => {
        props.setSearchText(e.target.value)
    }} className="fixed top-2 z-10 bg-slate-200 items-center border-slate-500 flex justify-between border-[3px] shadow-xl border-slate-white gap-4 p-2 w-fit mt-4 rounded-full min-w-[60%] px-8" />
}