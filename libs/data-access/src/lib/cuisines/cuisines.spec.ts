import { getCuisines } from './cuisines';

describe('getCuisines', () => {
  it('should return an array of cuisines', async () => {
    const cuisines = await getCuisines();
    expect(cuisines).toBeDefined();
    expect(cuisines.length).toBeGreaterThan(0);
  });
});
