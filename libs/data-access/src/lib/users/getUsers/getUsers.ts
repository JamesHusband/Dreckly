import { User } from '@dreckly/types';

export const getUsers = async (): Promise<User[]> => {
  return [
    {
      id: 1,
      firstName: 'Joe',
      lastName: 'Johnson',
      email: 'joe.johnson@example.com',
      phoneNumber: '+447911123456',
      address: {
        line1: '15 Lemon Street',
        line2: '',
        city: 'Truro',
        postcode: 'TR1 2LQ',
      },
      passwordHash: '$2a$10$dummyhashforpassword',
      // TODO: favouriteRestaurants:
      orderHistory: ['1001', '1002', '1003', '1004', '1005'],
      createdAt: '2025-06-01T12:34:56Z',
    },
  ];
};
