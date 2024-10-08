export const SearchBar: React.FC<{
  searchText: string;
  setSearchText: (text: string) => void;
  setModal: (open: boolean) => void;
}> = (props) => {
  return (
    <div className="fixed top-2 z-10 w-full flex justify-center items-end gap-4">
      <input
        type="text"
        value={props.searchText}
        onChange={(e) => {
          props.setSearchText(e.target.value);
        }}
        className="bg-slate-200 bg-opacity-20 backdrop-blur-md items-center border-slate-500 flex justify-between border-[3px] shadow-xl border-slate-white gap-4 p-2 w-fit mt-8 rounded-full min-w-[60%] px-8"
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          props.setModal(true);
        }}
        className="bg-black text-slate-200 px-4 py-2 h-fit rounded-md text-lg font-bold"
      >
        Upload
      </button>
    </div>
  );
};
