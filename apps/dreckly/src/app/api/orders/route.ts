import { getOrders } from '@dreckly/data-access';

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return new Response('userId is required', { status: 400 });
  }

  const orders = await getOrders();
  const userOrders = orders
    .filter((order) => order.userId === parseInt(userId))
    .sort(
      (a, b) =>
        new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
    );

  return new Response(JSON.stringify(userOrders), {
    headers: { 'Content-Type': 'application/json' },
  });
};
