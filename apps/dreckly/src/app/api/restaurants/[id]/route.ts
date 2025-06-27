import { getRestaurants } from '@dreckly/data-access';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const restaurantsData = await getRestaurants();
  const restaurant = restaurantsData.find((r) => r.id.toString() === id);

  if (!restaurant) {
    return new Response(JSON.stringify({ error: 'Restaurant not found' }), {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  return new Response(JSON.stringify(restaurant), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
