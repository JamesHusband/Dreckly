import { formatPrice } from './formatPrice.js';

describe('formatPrice', () => {
  it('should format whole numbers with two decimal places', () => {
    const result = formatPrice(10);
    expect(result).toBe('£10.00');
  });

  it('should format decimal numbers correctly', () => {
    const result = formatPrice(10.5);
    expect(result).toBe('£10.50');
  });

  it('should format numbers with more than two decimal places', () => {
    const result = formatPrice(10.567);
    expect(result).toBe('£10.57');
  });

  it('should format zero correctly', () => {
    const result = formatPrice(0);
    expect(result).toBe('£0.00');
  });

  it('should format negative numbers', () => {
    const result = formatPrice(-5.99);
    expect(result).toBe('£-5.99');
  });

  it('should format large numbers', () => {
    const result = formatPrice(999999.99);
    expect(result).toBe('£999999.99');
  });

  it('should format small decimal numbers', () => {
    const result = formatPrice(0.01);
    expect(result).toBe('£0.01');
  });

  it('should handle numbers that round up', () => {
    const result = formatPrice(10.999);
    expect(result).toBe('£11.00');
  });

  it('should handle numbers that round down', () => {
    const result = formatPrice(10.001);
    expect(result).toBe('£10.00');
  });
});
