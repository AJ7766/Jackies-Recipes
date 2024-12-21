export const SearchRecipe = ({
    searchRecipe,
    handleSearchChange
}: {
    searchRecipe: string,
    handleSearchChange: (query: string) => void
}) => {
    return (
        <div className="w-[75%] ml-auto mr-auto">
            <input
                className=" w-[15ch] text-[16px] pt-[4px] pb-[4px] pl-[4px] focus:w-[25ch] focus:outline-none focus:border-none active:outline-none active:border-none placeholder:text-black"
                type="text"
                value={searchRecipe}
                placeholder="Search recipes..."
                onChange={(e) => handleSearchChange(e.target.value)}
            />
        </div >
    );
};
