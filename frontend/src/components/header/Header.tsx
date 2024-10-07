export const Header: React.FC<{setUploadOpen: (value: boolean) => void}> = (props) => {
    const open = () => {
        props.setUploadOpen(true)
    }

    return <header className="bg-slate-200 items-center border-b-slate-600 flex justify-around border-[3px] shadow-xl border-slate-white p-2 w-fit mt-4 rounded-full min-w-[60%] px-4">
        <p className="text-2xl font-bold">Cerberus</p>
        <button onClick={open} className="bg-black text-slate-200 px-4 py-2 rounded-md text-sm">Upload</button>
    </header>
}