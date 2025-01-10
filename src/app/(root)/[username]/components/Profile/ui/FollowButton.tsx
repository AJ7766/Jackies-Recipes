type FollowButtonProps = {
    isFollowing: boolean;
    onClick: () => void;
    device: 'mobile' | 'desktop';
};

export const FollowButton = ({ isFollowing, onClick, device }: FollowButtonProps) => (
    <button
        type="button"
        className={`${device === 'mobile' ? 'md:hidden block' : 'md:block hidden'} md:h-7 h-6 md:text-sm text-xs rounded-[5px] ${isFollowing ? 'md:w-[90px] w-20 bg-white text-black border-[1.5px] border-black' : 'w-[80px] bg-black text-white'}`}
        onClick={onClick}
    >
        {isFollowing ? 'UNFOLLOW' : 'FOLLOW'}
    </button>
);
