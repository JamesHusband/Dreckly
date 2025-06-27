import { classNames } from './cn.js';

describe('classNames', () => {
  it('should join multiple class names with spaces', () => {
    const result = classNames('bg-red-500', 'text-white', 'p-4');
    expect(result).toBe('bg-red-500 text-white p-4');
  });

  it('should filter out falsy values', () => {
    const result = classNames(
      'bg-red-500',
      null,
      undefined,
      false,
      'text-white'
    );
    expect(result).toBe('bg-red-500 text-white');
  });

  it('should handle empty strings', () => {
    const result = classNames('bg-red-500', '', 'text-white');
    expect(result).toBe('bg-red-500 text-white');
  });

  it('should return empty string for all falsy values', () => {
    const result = classNames(null, undefined, false, '');
    expect(result).toBe('');
  });

  it('should handle single class name', () => {
    const result = classNames('bg-red-500');
    expect(result).toBe('bg-red-500');
  });

  it('should handle no arguments', () => {
    const result = classNames();
    expect(result).toBe('');
  });

  it('should handle mixed truthy and falsy values', () => {
    const result = classNames(
      'bg-red-500',
      null,
      'text-white',
      undefined,
      'p-4',
      false
    );
    expect(result).toBe('bg-red-500 text-white p-4');
  });

  it('should handle conditional classes', () => {
    const isActive = true;
    const isDisabled = false;
    const result = classNames(
      'button',
      isActive && 'active',
      isDisabled && 'disabled'
    );
    expect(result).toBe('button active');
  });
});
