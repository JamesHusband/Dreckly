export const formatPrice = (value: number | undefined | null) => {
  const numValue = value ?? 0;
  return `£${numValue.toFixed(2)}`;
};
