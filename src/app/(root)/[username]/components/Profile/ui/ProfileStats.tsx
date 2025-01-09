export const ProfileStats = ({ recipes, followers, following }: { recipes: number, followers: number, following: number }) => (
    <div className="text-sm text-[15px] mb-2 mt-4 content-center gap-x-6 md:flex">
        <h2><b>{recipes}</b> recipes</h2>
        <h2><b>{followers}</b> followers</h2>
        <h2><b>{following}</b> following</h2>
    </div>
)  