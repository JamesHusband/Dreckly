import { getRestaurants } from './restaurants';

describe('getRestaurants', () => {
  it('should return an array of restaurants', async () => {
    const restaurants = await getRestaurants();
    expect(restaurants).toBeDefined();
    expect(restaurants.length).toBeGreaterThan(0);
  });
});
