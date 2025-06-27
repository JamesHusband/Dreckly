import { User } from '@dreckly/types';

export async function getUser(): Promise<User> {
  return {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
  };
}

export * from './cuisines';
export * from './restaurants';
