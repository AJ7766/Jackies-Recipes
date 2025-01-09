'use server';
import { deleteSession } from "@/_utils/session";
import { redirect } from "next/navigation";

export const logout = async () => {
    await deleteSession();
    redirect('/login');
};