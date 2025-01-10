type ProfileStatsProps = {
    recipes: number;
    followers: number;
    following: number;
    device: 'mobile' | 'desktop';
};

export const ProfileStats = ({ recipes, followers, following, device }: ProfileStatsProps) => (
    <div className={`${device === 'mobile' ? 'md:hidden flex' : 'md:flex hidden'}
    flex text-sm text-[15px] mb-2 mt-4 content-center gap-x-6 md:flex`}>
        <h2 className={`${device === 'mobile' && 'flex flex-col items-center'}`}><b>{recipes}</b> recipes</h2>
        <h2 className={`${device === 'mobile' && 'flex flex-col items-center'}`}><b>{followers}</b> followers</h2>
        <h2 className={`${device === 'mobile' && 'flex flex-col items-center'}`}><b>{following}</b> following</h2>
    </div>
)