import { getCuisines } from '@dreckly/data-access';

export const GET = async (request: Request) => {
  const cuisines = await getCuisines();
  return new Response(JSON.stringify(cuisines), {
    headers: { 'Content-Type': 'application/json' },
  });
};
