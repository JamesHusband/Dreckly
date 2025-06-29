import { User } from '@dreckly/types';

export const getUsers = async (): Promise<User[]> => {
  return [
    {
      id: 1,
      firstName: 'Joe',
      lastName: 'Johnson',
      email: 'alex.johnson@example.com',
      phoneNumber: '+447911123456',
      address: {
        line1: '12 Elm Street',
        line2: '',
        city: 'London',
        postcode: 'E1 6AN',
      },
      passwordHash: '$2a$10$dummyhashforpassword',
      // favouriteRestaurants: [1, 3],
      orderHistory: ['1001', '1002', '1003', '1004', '1005'],
      createdAt: '2025-06-01T12:34:56Z',
    },
  ];
};
