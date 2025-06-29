import { formatDate } from './formatDate';

describe('formatDate', () => {
  it('should format date string correctly', () => {
    const dateString = '2025-01-15T18:30:00Z';
    const result = formatDate(dateString);

    // The exact format depends on locale, but should contain year and month
    expect(result).toContain('2025');
    expect(result).toContain('January');
  });

  it('should handle different date formats', () => {
    const dateString = '2025-06-01T12:34:56Z';
    const result = formatDate(dateString);

    expect(result).toContain('2025');
    expect(result).toContain('June');
  });
});
