import { getUser } from '@dreckly/data-access';
import { CuisineFilter, Hero } from '@dreckly/home';
import { RestaurantList } from '@dreckly/restaurants';

export default async function Index() {
  const user = await getUser();

  return (
    <div>
      <Hero />
      <section className="py-12">
        <div className="container mx-auto px-4">
          <CuisineFilter />
          <RestaurantList />
        </div>
      </section>
      <p>{user.name}</p>
    </div>
  );
}
