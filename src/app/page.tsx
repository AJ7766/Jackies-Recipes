"use client"
import LoginForm from "./_components/LoginForm";
import { useEffect, useState } from "react";
import ProfilePage from "./_components/Profile";
import { ProfileProps } from "./types/types";
import NavBar from "./[username]/_components/NavBar";
import Masonary from "./_components/Masonary";
import Categories from "./_components/Category";
import { useAuth } from "./context/AuthContext";

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  return (
    <>
    {!isAuthenticated ? 
      <LoginForm />
  : 
  <>
  <NavBar />
  <ProfilePage username={user?.username} fullName={user?.fullName} />
  <Categories />
  <Masonary />
  </>
  }
</> 
  );
}
