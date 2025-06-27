import { getUser } from '@dreckly/data-access';

export async function GET(request: Request) {
  const user = await getUser();
  return new Response(JSON.stringify(user), {
    headers: { 'Content-Type': 'application/json' },
  });
}
