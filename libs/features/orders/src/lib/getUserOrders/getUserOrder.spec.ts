import { getUserOrders } from './getUserOrders';

jest.mock('@dreckly/data-access', () => ({
  getOrders: () => [
    {
      id: '1',
      userId: 1,
      restaurantId: 1,
      orderDate: '2021-01-01',
      total: 100,
      status: 'pending',
      items: [],
    },
  ],
}));

describe('getUserOrders', () => {
  it('should return the user orders', async () => {
    const orders = await getUserOrders(1);
    expect(orders).toEqual([
      {
        id: '1',
        userId: 1,
        restaurantId: 1,
        orderDate: '2021-01-01',
        total: 100,
        status: 'pending',
        items: [],
      },
    ]);
  });
});
