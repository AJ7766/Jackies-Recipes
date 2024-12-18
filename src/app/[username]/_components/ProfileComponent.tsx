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
        <div className="profileInfo">
          <CldImage
            className="profilePicture"
            height={160}
            width={160}
            src={profile?.userContent?.profilePicture || profilePicture}
            fetchPriority="high"
            priority
            sizes="(max-width: 768px) 130px, 500px"
            alt="profile-picture"
            format="webp"
          />
          <h1>{profile?.fullName}</h1>
          {profile.userContent?.bio &&
            <h2>
              {profile.userContent?.bio.split('\n').map((line, index) => (
                <span key={index}>
                  {line}
                  {profile.userContent?.bio && index < profile.userContent?.bio.split('\n').length - 1 && <br />}
                </span>
              ))}
            </h2>}
          <p className="text-gray-500">@{profile?.username}</p>
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
                <Image src={instagram} alt="instagram" width={24} height={24} />
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
                <Image src={x} alt="x" width={24} height={24} />
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
                <Image src={tiktok} alt="tiktok" width={24} height={24} />
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
                <Image src={youtube} alt="youtube" width={30} height={24} />
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
                <Image src={facebook} alt="facebook" width={24} height={24} />
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="divider"></div>
    </>
  )
});
