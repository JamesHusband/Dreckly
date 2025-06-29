import { getOrders } from './getOrders';

jest.mock('@dreckly/data-access', () => ({
  getOrders: () => [
    {
      id: '1',
      userId: 1,
      restaurantId: 1,
      orderDate: '2021-01-01',
      items: [],
      total: 100,
      status: 'pending',
    },
  ],
}));

describe('getOrders', () => {
  it('should return the orders', async () => {
    const orders = await getOrders();
    expect(orders).toEqual([
      {
        id: '1',
        userId: 1,
        restaurantId: 1,
        orderDate: '2021-01-01',
        items: [],
        total: 100,
        status: 'pending',
      },
    ]);
  });
});
