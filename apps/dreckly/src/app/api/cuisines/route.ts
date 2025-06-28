import { getCuisines } from '@dreckly/data-access';

export async function GET(request: Request) {
  const cuisines = await getCuisines();
  return new Response(JSON.stringify(cuisines), {
    headers: { 'Content-Type': 'application/json' },
  });
}
