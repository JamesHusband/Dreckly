import { CartCount } from './CartCount';
import { render } from '@testing-library/react';

describe('CartCount', () => {
  it('should render', () => {
    render(<CartCount />);
  });
});
