import { render } from '@testing-library/react';
import Page from '../src/app/page';

global.fetch = jest.fn(() =>
  Promise.resolve({
    text: () => Promise.resolve('Hello, from API!'),
    json: () =>
      Promise.resolve({
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
      }),
    ok: true,
    status: 200,
  } as Response)
);

describe('Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render successfully', async () => {
    const { baseElement } = await render(await Page());
    expect(baseElement).toBeTruthy();
  });
});
