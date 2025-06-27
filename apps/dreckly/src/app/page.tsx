import { getUser } from '@dreckly/data-access';
import { CuisineFilter, Hero } from '@dreckly/home';

export default async function Index() {
  const user = await getUser();

  return (
    <div>
      <Hero />
      <CuisineFilter />
      <p>{user.name}</p>
    </div>
  );
}
