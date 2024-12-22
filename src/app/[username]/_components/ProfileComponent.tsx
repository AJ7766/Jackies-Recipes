import { UserPopulatedRecipePopulatedProps } from "@/_models/UserModel";
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

export const ProfileComponent = React.memo(({ profile }: { profile: UserPopulatedRecipePopulatedProps }
) => {
  return (
    <>
      <div className="profileContainer">
        <div className="flex gap-[30px] items-center md:gap-[60px]">
          <CldImage
            className="profilePicture w-[100px] h-[100px] shrink-0 ml-[30px] md:w-[160px] md:h-[160px] md:ml-[60px]"
            height={160}
            width={160}
            src={profile?.userContent?.profilePicture || profilePicture}
            fetchPriority="high"
            priority
            sizes="(max-width: 1024px) 100px, 500px"
            alt="profile-picture"
            format="webp"
          />
          <div className="flex flex-col md:w-[450px]">
            <div className="w-full flex items-center justify-between">
              <h1 className="text-base md:text-3xl">{profile?.username}</h1>
              <button type="button" className="follow">FOLLOW</button>
            </div>
            <p className="fullName md:mt-4">{profile?.fullName}</p>
            {profile.userContent?.bio &&
              <h2 className="md:mb-1 md:mt-1">
                {profile.userContent?.bio.split('\n').map((line, index) => (
                  <span key={index}>
                    {line}
                    {profile.userContent?.bio && index < profile.userContent?.bio.split('\n').length - 1 && <br />}
                  </span>
                ))}
              </h2>}
              <div className="flex content-center gap-x-6 text-[15px] mb-2 mt-4">
              <h2><b>{profile.recipes.length}</b> recipes</h2>
              <h2><b>302</b> followers</h2>
              <h2><b>102</b> following</h2>
            </div>
            <div className="profileSocialMediaContainer">
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
          </div>
        </div>
      </div>
      <div className="divider"></div>
    </>
  )
});
