'use server';
import { fetchGetLogoutAPI } from "@/app/_actions/api/fetchLogoutAPI";
import { redirect } from "next/navigation";

export const logout = async () => {
  await fetchGetLogoutAPI();
  redirect('/login');
};