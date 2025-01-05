'use server';

import { fetchLoginAPI } from '@/app/_services/api/fetchLoginAPI';
import { redirect } from 'next/navigation';

export async function handleLogin(formData: FormData) {
  const username = formData.get('username');
  const password = formData.get('password');
  if (typeof username !== "string" || typeof password !== "string") {
    return;
  }
  const { message, success, fetchedUser } = await fetchLoginAPI(username, password);
  console.log(message)
  if (!success) {
    return { error: message };
  }

  redirect(`/${fetchedUser.username}`);
}