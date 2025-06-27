import { DropdownMenu } from './DropdownMenu';
import { render } from '@testing-library/react';

describe('DropdownMenu', () => {
  it('should render', () => {
    render(<DropdownMenu isOpen={true} items={[]} />);
  });
});
