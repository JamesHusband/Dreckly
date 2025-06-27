import { User } from '@dreckly/types';

export async function getUser(): Promise<User> {
  // Use relative URL for internal API calls
  const response = await fetch('/api/hello', {
    // Add cache: 'no-store' to prevent static generation issues
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch user: ${response.status}`);
  }

  return await response.json();
}
