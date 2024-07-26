import Image from "next/image";
import profilePicture from "@/app/images/profile-picture.png"
import instagram from "@/app/images/social-media/instagram.svg";
import x from "@/app/images/social-media/x.svg";
import tiktok from "@/app/images/social-media/tiktok.svg";
import youtube from "@/app/images/social-media/youtube.svg";
import facebook from "@/app/images/social-media/facebook.svg";
import { ProfilePropsOrNull } from "../types/types";

export default function ProfilePage({profile}: {profile:ProfilePropsOrNull}){
console.log("yee: ", profile)
    return(
    <div className="profileWrapper">
        <div className="profileContainer">
        <div className="profileInfo">
            <div className="profilePicutre">
                <Image src={profile?.userContent?.profilePicture || profilePicture} alt="profile-picture" />
            </div>
            <h1>{profile?.fullName}</h1>
            <h2>{profile?.userContent?.bio}</h2>
            <p>@{profile?.username}</p>
            <div className="profileSocialMediaContainer">
                <Image src={instagram} alt="instagram" />
                <Image src={x} alt="x" />
                <Image src={tiktok} alt="tiktok" />
                <Image src={youtube} alt="youtube" />
                <Image src={facebook} alt="facebook" />
            </div>
        </div>
        <div>
        </div>
        </div>
    </div>
    )
}