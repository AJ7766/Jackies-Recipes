import Image from "next/image";
import profilePicture from "@/app/images/profile-picture.png"
import instagram from "@/app/images/social-media/instagram.svg";
import x from "@/app/images/social-media/x.svg";
import tiktok from "@/app/images/social-media/tiktok.svg";
import youtube from "@/app/images/social-media/youtube.svg";
import facebook from "@/app/images/social-media/facebook.svg";
import { ProfilePropsOrNull } from "../types/types";
import Link from "next/link";

export default function ProfilePage({profile}: {profile:ProfilePropsOrNull}){

    return(
    <div className="profileWrapper">
        <div className="profileContainer">
        <div className="profileInfo">
            <div className="profilePicutre">
            <div className="ProfilePictureCanvas">
                <Image height={160} width={160} src={profile?.userContent?.profilePicture || profilePicture} alt="profile-picture" />
            </div>
            </div>
            <h1>{profile?.fullName}</h1>
            <h2>{profile?.userContent?.bio}</h2>
            <p>@{profile?.username}</p>
            <div className="profileSocialMediaContainer">
                {profile?.userContent?.instagram && (
                    <Link target="_blank" href={profile.userContent.instagram}>
                        <Image src={instagram} alt="instagram" />
                    </Link>
                )}
                {profile?.userContent?.x && (
                    <Link target="_blank" href={profile.userContent.x}>
                        <Image src={x} alt="x" />
                    </Link>
                )}
                {profile?.userContent?.tiktok && (
                    <Link target="_blank" href={profile.userContent.tiktok}>
                        <Image src={tiktok} alt="tiktok" />
                    </Link>
                )}
                {profile?.userContent?.youtube && (
                    <Link target="_blank" href={profile.userContent.youtube}>
                        <Image src={youtube} alt="youtube" />
                    </Link>
                )}
                {profile?.userContent?.facebook && (
                    <Link target="_blank" href={profile.userContent.facebook}>
                        <Image src={facebook} alt="facebook" />
                    </Link>
                )}
    </div>
        </div>
        <div>
        </div>
        </div>
    </div>
    )
}