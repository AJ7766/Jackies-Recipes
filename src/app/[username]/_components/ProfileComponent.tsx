import { UserProps } from "@/_types/UserModel";
import { CldImage } from "next-cloudinary";
import Image from "next/image";
import Link from "next/link";
import React from "react";
const profilePicture = "https://res.cloudinary.com/denumkkcx/image/upload/v1734030055/profile-picture_szc0kx.webp";
const instagram = "/images/social-media/instagram.svg";
const x = "/images/social-media/x.svg";
const tiktok = "/images/social-media/tiktok.svg";
const youtube = "/images/social-media/youtube.svg";
const facebook = "/images/social-media/facebook.svg";

export const ProfileComponent = React.memo(({
  profile,
  isMobile,
  isClient,
  user_id,
  isAuthenticatedProfile,
  handleFollowersChange,
  isFollowing,
  handleFollowing
}: {
  profile: UserProps,
  isClient: boolean,
  isMobile: boolean,
  user_id?: string
  isAuthenticatedProfile: boolean,
  handleFollowersChange: (user_id: string, operation: string) => void;
  isFollowing?: boolean
  handleFollowing: (following: boolean) => void
}
) => {
  return (
    <>
      <div className="m-[20px] flex flex-col md:w-[75%] md:mx-auto md:my-[40px] md:flex-row md:items-center md:gap-[60px]">
        <div className="flex items-center gap-[20px]">
          <CldImage
            className="profilePicture w-[90px] h-[90px] shrink-0 md:w-[160px] md:h-[160px] md:ml-[60px]"
            height={160}
            width={160}
            src={profile?.userContent?.profilePicture || profilePicture}
            fetchPriority="high"
            priority
            sizes="(max-width: 1024px) 100px, 500px"
            alt="profile-picture"
            format="webp"
          />
          {(!isClient || (isClient && isMobile)) &&
            <div className="text-sm mb-2 mt-4 mx-auto flex content-center gap-x-4 md:hidden">
              <h2 className="flex flex-col items-center"><b>{profile.recipes?.length}</b> recipes</h2>
              <h2 className="flex flex-col items-center"><b>{profile.followers?.length || 0}</b> followers</h2>
              <h2 className="flex flex-col items-center"><b>{profile.following?.length || 0}</b> following</h2>
            </div>
          }
        </div>
        <div className="flex flex-col mt-2 md:w-[450px] md:mt-0">
          {(!isClient || (isClient && !isMobile)) &&
            <div className="hidden w-full items-center justify-between md:flex">
              <h1 className="text-base md:text-3xl">{profile?.username}</h1>
              {!isAuthenticatedProfile && <button
                type="button"
                className={`h-[30px] text-[14px] rounded-[5px] ${isFollowing ? 'w-[90px] bg-white text-black border-[1.5px] border-black' : 'w-[80px] bg-black text-white'}`}
                onClick={async () => {
                  if (!user_id || isAuthenticatedProfile)
                    return alert('Please login to use this feature');
                  if (!isFollowing) {
                    const { handleFollow } = await import("../_services/profileServices");
                    await handleFollow(user_id, profile.username);
                    handleFollowersChange(user_id, 'follow');
                    handleFollowing(true);
                  } else {
                    const { handleUnfollow } = await import("../_services/profileServices");
                    await handleUnfollow(user_id, profile.username);
                    handleFollowersChange(user_id, 'unfollow');
                    handleFollowing(false);
                  }
                }}
              >{isFollowing ? 'UNFOLLOW' : 'FOLLOW'}</button>}
            </div>}
          <p className="text-[13px] font-medium md:text-sm md:mt-4">{profile?.fullName}</p>
          <p className="block text-gray-600 md:hidden">@{profile.username}</p>
          {profile.userContent?.bio &&
            <h2 className="text-[13px] mt-1 mb-1 md:text-sm md:mt-0">
              {profile.userContent?.bio.split('\n').map((line, index) => (
                <span key={index}>
                  {line}
                  {profile.userContent?.bio && index < profile.userContent?.bio.split('\n').length - 1 && <br />}
                </span>
              ))}
            </h2>}
          {(!isClient || (isClient && !isMobile)) &&
            <div className="hidden text-sm text-[15px] mb-2 mt-4 content-center gap-x-6 md:flex">
              <h2><b>{profile.recipes?.length}</b> recipes</h2>
              <h2><b>{profile.followers?.length || 0}</b> followers</h2>
              <h2><b>{profile.following?.length || 0}</b> following</h2>
            </div>}
          <div className="profileSocialMediaContainer mt-2">
            {profile?.userContent?.instagram && (
              <Link
                target="_blank"
                href={
                  profile.userContent.instagram.startsWith("http")
                    ? profile.userContent.instagram
                    : `https://${profile.userContent.instagram}`
                }
              >
                <Image src={instagram} alt="instagram" width={22} height={22} />
              </Link>
            )}
            {profile?.userContent?.x && (
              <Link
                target="_blank"
                href={
                  profile.userContent.x.startsWith("http")
                    ? profile.userContent.x
                    : `https://${profile.userContent.x}`
                }
              >
                <Image src={x} alt="x" width={22} height={22} />
              </Link>
            )}
            {profile?.userContent?.tiktok && (
              <Link
                target="_blank"
                href={
                  profile.userContent.tiktok.startsWith("http")
                    ? profile.userContent.tiktok
                    : `https://${profile.userContent.tiktok}`
                }
              >
                <Image src={tiktok} alt="tiktok" width={22} height={22} />
              </Link>
            )}
            {profile?.userContent?.youtube && (
              <Link
                target="_blank"
                href={
                  profile.userContent.youtube.startsWith("http")
                    ? profile.userContent.youtube
                    : `https://${profile.userContent.youtube}`
                }
              >
                <Image src={youtube} alt="youtube" width={28} height={22} />
              </Link>
            )}
            {profile?.userContent?.facebook && (
              <Link
                target="_blank"
                href={
                  profile.userContent.facebook.startsWith("http")
                    ? profile.userContent.facebook
                    : `https://${profile.userContent.facebook}`
                }
              >
                <Image src={facebook} alt="facebook" width={22} height={22} />
              </Link>
            )}
          </div>
          {((!isClient && !isAuthenticatedProfile) || (isClient && isMobile && !isAuthenticatedProfile)) && <button
            type="button"
            className={`mt-2 text-[12px] h-[25px] rounded-[5px] ${isFollowing ? 'w-[75px] bg-white text-black border-[1.5px] border-black' : 'w-[65px] bg-black text-white'} md:hidden`}
            onClick={async () => {
              if (!user_id || isAuthenticatedProfile)
                return alert('Please login to use this feature');
              if (!isFollowing) {
                const { handleFollow } = await import("../_services/profileServices");
                await handleFollow(user_id, profile.username);
                handleFollowersChange(user_id, 'follow');
                handleFollowing(true);
              } else {
                const { handleUnfollow } = await import("../_services/profileServices");
                await handleUnfollow(user_id, profile.username);
                handleFollowersChange(user_id, 'unfollow');
                handleFollowing(false);
              }
            }}>
            {isFollowing ? 'UNFOLLOW' : 'FOLLOW'}</button>}
        </div>
      </div>
      <div className="divider"></div>
    </>
  )
});
