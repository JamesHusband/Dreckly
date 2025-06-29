import { formatAddress } from './formatAddress';
import { Address } from '@dreckly/types';

describe('formatAddress', () => {
  it('should format address with all fields', () => {
    const address: Address = {
      line1: '12 Elm Street',
      line2: 'Apartment 4B',
      city: 'London',
      postcode: 'E1 6AN',
    };

    const result = formatAddress(address);
    expect(result).toBe('12 Elm Street, Apartment 4B, London, E1 6AN');
  });

  it('should format address without line2', () => {
    const address: Address = {
      line1: '12 Elm Street',
      line2: '',
      city: 'London',
      postcode: 'E1 6AN',
    };

    const result = formatAddress(address);
    expect(result).toBe('12 Elm Street, London, E1 6AN');
  });

  it('should handle empty line2', () => {
    const address: Address = {
      line1: '12 Elm Street',
      line2: '',
      city: 'London',
      postcode: 'E1 6AN',
    };

    const result = formatAddress(address);
    expect(result).toBe('12 Elm Street, London, E1 6AN');
  });
});
