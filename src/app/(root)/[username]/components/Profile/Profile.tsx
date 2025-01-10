"use client"
import { useIsResponsive } from "@/app/_hooks/useIsResponsive";
import React, { useState } from "react";
import { ProfilePicture } from "./ui/ProfilePicture";
import { ProfileStats } from "./ui/ProfileStats";
import { FollowButton } from "./ui/FollowButton";
import { SocialMedia } from "./ui/SocialMedia";
import { UserProps } from "@/_types/UserTypes";
import { Bio } from "./ui/Bio";

export const Profile = React.memo(({ serverProfile, ownProfile, user_id, serverIsFollowing }: { serverProfile: UserProps, ownProfile: boolean, user_id: string, serverIsFollowing: boolean }) => {
  const { isMobile, isClient } = useIsResponsive();
  const [isFollowing, setIsFollowing] = useState(serverIsFollowing);
  const [profile, setProfile] = useState<UserProps>(serverProfile);

  const handleFollowersChange = (user_id: string, operation: string) => {
    if (operation === 'follow') {
      setProfile((prev) => ({
        ...prev,
        followers: [...prev.followers || [], user_id]
      })
      )
    } else if (operation === 'unfollow') {
      setProfile((prev) => ({
        ...prev,
        followers: prev.followers?.filter((follower) => follower !== user_id)
      })
      )
    }
  }

  const handleFollowToggle = async () => {
    if (!user_id) return alert('Please login to use this feature');

    if (!isFollowing) {
      const { handleFollow } = await import("../../_services/profileServices");
      await handleFollow(user_id, profile.username);
      handleFollowersChange(user_id, 'follow');
      setIsFollowing(true);

    } else {
      const { handleUnfollow } = await import("../../_services/profileServices");
      await handleUnfollow(user_id, profile.username);
      handleFollowersChange(user_id, 'unfollow');
      setIsFollowing(false);
    }
  };

  return (
    <>
      <div className="m-[20px] flex flex-col md:w-[75%] md:mx-auto md:my-[40px] md:flex-row md:items-center md:gap-[60px]">
        <div className="flex items-center gap-[20px]">
          <ProfilePicture
            src={profile?.userContent?.profilePicture}
            alt="profile-picture"
            size="w-[90px] h-[90px] shrink-0 md:w-[160px] md:h-[160px] md:ml-[60px]"
          />
          {(!isClient || isClient && isMobile) &&
            <ProfileStats
              recipes={profile.recipes?.length || 0}
              followers={profile.followers?.length || 0}
              following={profile.following?.length || 0}
              device='mobile'
            />
          }
        </div>

        <div className="flex flex-col mt-2 md:w-[450px] md:mt-0">
          {!isMobile &&
            <div className="hidden w-full items-center justify-between md:flex">
              <h1 className="text-base md:text-2xl">{profile?.username}</h1>
              {!ownProfile &&
                <FollowButton
                  isFollowing={isFollowing}
                  onClick={handleFollowToggle}
                  device='desktop'
                />
              }
            </div>}

          <p className="text-[13px] font-medium md:text-sm md:mt-4">{profile?.fullName}</p>
          <p className="block text-gray-600 md:hidden">@{profile.username}</p>
          
          {profile.userContent?.bio &&
            <Bio bio={profile.userContent?.bio} />
          }

          <ProfileStats
            recipes={profile.recipes?.length || 0}
            followers={profile.followers?.length || 0}
            following={profile.following?.length || 0}
            device='desktop'
          />

          <div className="profileSocialMediaContainer mt-2">
            {profile?.userContent?.instagram && (
              <SocialMedia url={profile.userContent.instagram} icon="instagram" />
            )}
            {profile?.userContent?.x && (
              <SocialMedia url={profile.userContent.x} icon="x" />
            )}
            {profile?.userContent?.tiktok && (
              <SocialMedia url={profile.userContent.tiktok} icon="tiktok" />
            )}
            {profile?.userContent?.youtube && (
              <SocialMedia url={profile.userContent.youtube} icon="youtube" />
            )}
            {profile?.userContent?.facebook && (
              <SocialMedia url={profile.userContent.facebook} icon="facebook" />
            )}
          </div>

          {(!isClient && !ownProfile || isClient && isMobile && !ownProfile) &&
            <FollowButton
              isFollowing={isFollowing}
              onClick={handleFollowToggle}
              device="mobile"
            />}
        </div>
      </div>

      <div className="divider"></div>
    </>
  );
});
