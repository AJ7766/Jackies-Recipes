import { UserPopulatedRecipePopulatedProps } from "@/_models/UserModel";
import Image from "next/image";
import Link from "next/link";
import React from "react";
const profilePicture = "/images/profile-picture.png";
const instagram = "/images/social-media/instagram.svg";
const x = "/images/social-media/x.svg";
const tiktok = "/images/social-media/tiktok.svg";
const youtube = "/images/social-media/youtube.svg";
const facebook = "/images/social-media/facebook.svg";

export const ProfileComponent  = ({
  profile = null,
}: {
  profile: UserPopulatedRecipePopulatedProps | null;
}) => {
  const bioText = profile?.userContent?.bio || "";
  const formattedBio = bioText.replace(/\n/g, "<br>");
  return (
    <>
      <div className="profileContainer">
        <div className="profileInfo">
          <Image
            className="profilePicture"
            height={160}
            width={160}
            priority
            src={profile?.userContent?.profilePicture || profilePicture}
            alt="profile-picture"
          />
          <h1>{profile?.fullName}</h1>
          <h2 dangerouslySetInnerHTML={{ __html: formattedBio }}></h2>
          <p>@{profile?.username}</p>
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
                <Image src={youtube} alt="youtube" width={24} height={24} />
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
};
