"use client"
import { useProfile } from "@/app/_context/ProfileContext";
import { ProfileComponent } from "../_components/ProfileComponent";
import { useIsResponsive } from "@/app/_hooks/useIsResponsive";
import mongoose from "mongoose";
import { useIsAuthorizedProfile } from "@/app/_hooks/useIsAuthorizedProfile";

export default function Profile({ user_id }: { user_id?: mongoose.Types.ObjectId }) {
    const { profile } = useProfile();
    const { isMobile, isClient } = useIsResponsive();
    const isAuthenticatedProfile = useIsAuthorizedProfile();

    return (
        <ProfileComponent
            profile={profile}
            isMobile={isMobile}
            isClient={isClient}
            user_id={user_id}
            isAuthenticatedProfile={isAuthenticatedProfile}
        />
    )
}