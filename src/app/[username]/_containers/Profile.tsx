"use client"
import { useProfile } from "@/app/_context/ProfileContext";
import { ProfileComponent } from "../_components/ProfileComponent";

export default function Profile() {
    const { profile } = useProfile();
    
    return <ProfileComponent profile={profile} />
}