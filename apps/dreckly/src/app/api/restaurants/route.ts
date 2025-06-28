import { getRestaurants } from '@dreckly/data-access';

export const GET = async (request: Request) => {
  const restaurants = await getRestaurants();
  return new Response(JSON.stringify(restaurants), {
    headers: { 'Content-Type': 'application/json' },
  });
};
