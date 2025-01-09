export const FollowButton = ({ isFollowing, onClick }: { isFollowing: boolean, onClick: () => void }) => (
    <button
        type="button"
        className={`h-[30px] text-[14px] rounded-[5px] ${isFollowing ? 'w-[90px] bg-white text-black border-[1.5px] border-black' : 'w-[80px] bg-black text-white'}`}
        onClick={onClick}
    >
        {isFollowing ? 'UNFOLLOW' : 'FOLLOW'}
    </button>
)