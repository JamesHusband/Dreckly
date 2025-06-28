import { CuisineFilter, CuisineProvider, Hero } from '@dreckly/home';
import { RestaurantList } from '@dreckly/restaurants';

export default async function Index() {
  return (
    <CuisineProvider>
      <Hero />
      <section className="py-12">
        <div className="container mx-auto px-4">
          <CuisineFilter />
          <RestaurantList />
        </div>
      </section>
    </CuisineProvider>
  );
}
