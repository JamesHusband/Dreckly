import { Address } from '@dreckly/types';

export const formatAddress = (address: Address): string => {
  const parts = [address.line1];
  if (address.line2) parts.push(address.line2);
  parts.push(address.city, address.postcode);
  return parts.join(', ');
};
