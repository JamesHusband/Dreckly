import { getRestaurant } from '@dreckly/data-access';
import { Menu } from '@dreckly/menu';

export default async function RestaurantPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const restaurant = await getRestaurant(id);

  if (!restaurant) {
    return <div>Restaurant not found</div>;
  }
  return <Menu restaurant={restaurant} />;
}
