import { getUserOrders } from './getUserOrders';

// Mock fetch globally
global.fetch = jest.fn();

describe('getUserOrders', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return the user orders', async () => {
    const mockOrders = [
      {
        id: '1001',
        userId: 1,
        restaurantId: 1,
        restaurantName: 'The Cornish Pasty Co.',
        items: [
          {
            id: '1',
            name: 'Traditional Pasty',
            price: 4.5,
            quantity: 2,
            total: 9.0,
          },
        ],
        subtotal: 9.0,
        deliveryFee: 2.99,
        total: 11.99,
        status: 'delivered',
        orderDate: '2025-01-15T18:30:00Z',
        estimatedDeliveryTime: '2025-01-15T19:15:00Z',
        actualDeliveryTime: '2025-01-15T19:12:00Z',
        deliveryAddress: {
          line1: '15 Lemon Street',
          line2: '',
          city: 'Truro',
          postcode: 'TR1 2LQ',
        },
      },
    ];

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockOrders,
    });

    const orders = await getUserOrders(1);

    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:3000/api/orders?userId=1'
    );
    expect(orders).toEqual(mockOrders);
  });

  it('should throw error when response is not ok', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    await expect(getUserOrders(1)).rejects.toThrow(
      'Failed to fetch user orders'
    );
  });
});
