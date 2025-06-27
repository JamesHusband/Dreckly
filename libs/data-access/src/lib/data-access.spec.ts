import { getUser } from './data-access';

describe('getUser', () => {
  it('should return user data', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            id: '1',
            name: 'John Doe',
            email: 'john@example.com',
          }),
      } as Response)
    );

    const user = await getUser();

    expect(user).toEqual({
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
    });
  });
});
