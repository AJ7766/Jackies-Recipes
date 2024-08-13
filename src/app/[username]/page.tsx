"use client"
import { useAuth } from "../context/AuthContext";

export default function UserPage({children}: {children: React.ReactNode}) {

  const {initializing} = useAuth();

  if(initializing){
    return null;
  }
  return (
    <>
      {children}
  </>
  );
}
