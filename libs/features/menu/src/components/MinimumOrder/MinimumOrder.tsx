import { formatPrice } from '@dreckly/utils';

export const MinimumOrder = ({
  minOrder,
}: {
  minOrder: number | undefined;
}) => {
  const orderAmount = minOrder ?? 0;

  return (
    <div className="mb-6">
      <span className="inline-block bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
        Minimum order: {formatPrice(orderAmount)}
      </span>
    </div>
  );
};
