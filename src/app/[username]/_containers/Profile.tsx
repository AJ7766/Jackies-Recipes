"use client"
import { useProfile } from "@/app/_context/ProfileContext";
import { ProfileComponent } from "../_components/ProfileComponent";
import { useEffect } from "react";

export default function Profile() {
    const { profile } = useProfile();
/*
    const changeURL = () => {
        window.history.replaceState({}, '', '/fake-url');
      };

    useEffect(() => {
        changeURL();
      }, []);
      */
    return <ProfileComponent profile={profile} />
}