import Image from "next/image";
import profilePicture from "@/app/images/profile-picture.png"
import instagram from "@/app/images/social-media/instagram.svg";
import x from "@/app/images/social-media/x.svg";
import tiktok from "@/app/images/social-media/tiktok.svg";
import youtube from "@/app/images/social-media/youtube.svg";
import facebook from "@/app/images/social-media/facebook.svg";
import { ProfilePropsOrNull } from "../types/types";
import Link from "next/link";

export default function ProfilePage({profile, loading}: {profile:ProfilePropsOrNull, loading:boolean}){

    const bioText = profile?.userContent?.bio || '';
    const formattedBio = bioText.replace(/\n/g, '<br>');
    if(loading){
        return null;
    }
    return(
    <div className="profileContainer">
        <div className="profileInfo">
                <Image  className="profilePicture" height={160} width={160} priority src={profile?.userContent?.profilePicture || profilePicture} alt="profile-picture" />
            <h1>{profile?.fullName}</h1>
            <h2 dangerouslySetInnerHTML={{ __html: formattedBio }}></h2>
            <p>@{profile?.username}</p>
            <div className="profileSocialMediaContainer">
            {profile?.userContent?.instagram && (
                <Link 
                    target="_blank" 
                    href={profile.userContent.instagram.startsWith('http') ? profile.userContent.instagram : `https://${profile.userContent.instagram}`}
                >
                    <Image src={instagram} alt="instagram" />
                </Link>
            )}
            {profile?.userContent?.x && (
                <Link 
                    target="_blank" 
                    href={profile.userContent.x.startsWith('http') ? profile.userContent.x : `https://${profile.userContent.x}`}
                >
                    <Image src={x} alt="x" />
                </Link>
            )}
            {profile?.userContent?.tiktok && (
                <Link 
                    target="_blank" 
                    href={profile.userContent.tiktok.startsWith('http') ? profile.userContent.tiktok : `https://${profile.userContent.tiktok}`}
                >
                    <Image src={tiktok} alt="tiktok" />
                </Link>
            )}
            {profile?.userContent?.youtube && (
                <Link 
                    target="_blank" 
                    href={profile.userContent.youtube.startsWith('http') ? profile.userContent.youtube : `https://${profile.userContent.youtube}`}
                >
                    <Image src={youtube} alt="youtube" />
                </Link>
            )}
            {profile?.userContent?.facebook && (
                <Link 
                    target="_blank" 
                    href={profile.userContent.facebook.startsWith('http') ? profile.userContent.facebook : `https://${profile.userContent.facebook}`}
                >
                    <Image src={facebook} alt="facebook" />
                </Link>
            )}

    </div>
        </div>
        <div>
        </div>
    </div>
    )
}