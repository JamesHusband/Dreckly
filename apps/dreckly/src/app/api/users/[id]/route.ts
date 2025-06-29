import { getUsers } from '@dreckly/data-access';

export const GET = async (
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params;
  const users = await getUsers();
  const user = users.find((u) => u.id.toString() === id);

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
