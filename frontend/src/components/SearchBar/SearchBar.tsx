export const SearchBar: React.FC<{
  searchText: string;
  setSearchText: (text: string) => void;
  setModal: (open: boolean) => void;
  lockApp: () => void; // New prop for locking the app
}> = (props) => {
  return (
    <div className="flex justify-end items-center gap-4 w-full text-black">
      <div className="flex justify-center w-full">
        <input
          type="text"
          value={props.searchText}
          onChange={(e) => {
            props.setSearchText(e.target.value);
          }}
          className="bg-slate-200 bg-opacity-20 backdrop-blur-md items-center border-slate-500 flex justify-between border-[3px] shadow-xl border-slate-white gap-4 p-2 w-full mx-2 lg:mx-8 rounded-full min-w-[60%] px-8"
        />
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          props.setModal(true);
        }}
        className="bg-black text-slate-200 px-4 py-2 h-fit rounded-md text-lg font-bold"
      >
        Upload
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          props.lockApp();
        }}
        className="bg-red-600 text-white px-8 py-2 h-fit rounded-md text-lg font-bold"
      >
        Lock
      </button>
    </div>
  );
};
