import { getUsers } from '@dreckly/data-access';

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const users = await getUsers();
  const user = users.find((u) => u.id.toString() === params.id);

  if (!user) {
    return new Response(JSON.stringify({ error: 'User not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify(user), {
    headers: { 'Content-Type': 'application/json' },
  });
};
