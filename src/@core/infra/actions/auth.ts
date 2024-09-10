'use server';

import { signIn, signOut } from '../auth';
import { redirect } from 'next/navigation';

export async function googleSignIn() {
  return await signIn('google', {
    redirect: true,
    redirectTo: '/dashboard',
  });
}

export async function doSignOut() {
  return await signOut({ redirect: true, redirectTo: '/' });
  await signOut();
  redirect('/');
}
