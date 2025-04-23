import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export async function requireAuth() {
  const session = await auth();
  if (!session) redirect('/signin');
  return session;
}

export async function requireAdmin() {
  const session = await auth();
  if (!session || session.user.role !== 'ADMIN') {
    redirect('/dashboard');
  }
  return session;
}

export async function requireManager() {
  const session = await auth();
  if (!session || session.user.role !== 'CLUB_MANAGER' || session.user.role !== 'ADMIN') {
    redirect('/dashboard');
  }
  return session;
}
