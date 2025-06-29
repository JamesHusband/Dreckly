import { getUsers } from '@dreckly/data-access';

export const GET = async (request: Request) => {
  const users = await getUsers();
  return new Response(JSON.stringify(users), {
    headers: { 'Content-Type': 'application/json' },
  });
};
