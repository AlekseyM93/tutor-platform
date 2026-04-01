import { auth } from '@/modules/auth/server/auth.config';

export async function getSession() {
  if (process.env.NEXT_PAGES_EXPORT_BUILD === 'true') {
    return null;
  }
  return auth();
}
