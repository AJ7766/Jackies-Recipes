"use client"
import { useProfile } from "@/app/_context/ProfileContext";
import { ProfileComponent } from "../_components/ProfileComponent";
import { useIsResponsive } from "@/app/_hooks/useIsResponsive";
import { useIsAuthorizedProfile } from "@/app/_hooks/useIsAuthorizedProfile";
import { useState } from "react";

export default function Profile({ user_id, serverIsFollowing }: { user_id?: string, serverIsFollowing?: boolean }) {
    const { profile, handleFollowersChange } = useProfile();
    const { isMobile } = useIsResponsive();
    const isAuthenticatedProfile = useIsAuthorizedProfile();
    const [isFollowing, setIsFollowing] = useState(serverIsFollowing);

    const handleFollowing = async (following: boolean) => {
        setIsFollowing(following);
    }

    return (
        <ProfileComponent
            profile={profile}
            isMobile={isMobile}
            user_id={user_id}
            isAuthenticatedProfile={isAuthenticatedProfile}
            handleFollowersChange={handleFollowersChange}
            isFollowing={isFollowing}
            handleFollowing={handleFollowing}
        />
    )
}