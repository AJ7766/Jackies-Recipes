"use client"
import { useProfile } from "@/app/_context/ProfileContext";
import { ProfileComponent } from "../_components/ProfileComponent";
import { useIsResponsive } from "@/app/_hooks/useIsResponsive";

export default function Profile() {
    const { profile } = useProfile();
    const { isMobile, isClient } = useIsResponsive();

    return (
        <ProfileComponent
            profile={profile}
            isMobile={isMobile}
            isClient={isClient}
        />
    )
}