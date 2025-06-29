import { getUserOrders } from '@dreckly/data-access';

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return new Response('userId is required', { status: 400 });
  }

  const orders = await getUserOrders(parseInt(userId));

  return new Response(JSON.stringify(orders), {
    headers: { 'Content-Type': 'application/json' },
  });
};
