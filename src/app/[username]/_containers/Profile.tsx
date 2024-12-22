"use client"
import { useProfile } from "@/app/_context/ProfileContext";
import { ProfileComponent } from "../_components/ProfileComponent";
import { useIsMobile } from "@/app/_hooks/useIsMobile";

export default function Profile() {
    const { profile } = useProfile();
    const { isMobile, isClient } = useIsMobile();

    return (
        <ProfileComponent
            profile={profile}
            isMobile={isMobile}
            isClient={isClient}
        />
    )
}