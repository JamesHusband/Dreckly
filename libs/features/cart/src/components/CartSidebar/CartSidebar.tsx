import { formatPrice } from '@dreckly/utils';
import { Clock } from 'lucide-react';
import { CartSidebarProps } from '@dreckly/types';
import { getCartTotals } from '../../utils/calculateCart';

export const CartSidebar = ({ restaurant, cart }: CartSidebarProps) => {
  const { subtotal, deliveryFee, serviceFee, total } = getCartTotals({
    cart,
    restaurant,
  });

  return (
    <div className="lg:col-span-1">
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm sticky top-24">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Order Summary</h3>
        </div>
        <div className="p-4">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery fee</span>
              <span>{formatPrice(deliveryFee)}</span>
            </div>
            <div className="flex justify-between">
              <span>Service fee</span>
              <span>{formatPrice(serviceFee)}</span>
            </div>
            <hr className="border-gray-200" />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <button
              type="button"
              className={`w-full bg-orange-500 hover:bg-orange-600 text-white text-lg py-6 rounded-md font-medium transition-colors ${
                subtotal < (restaurant?.minimumOrder || 0)
                  ? 'opacity-60 cursor-not-allowed'
                  : ''
              }`}
              disabled={subtotal < (restaurant?.minimumOrder || 0)}
            >
              {subtotal < (restaurant?.minimumOrder || 0)
                ? `Minimum order ${formatPrice(restaurant?.minimumOrder || 0)}`
                : 'Proceed to Checkout'}
            </button>
            <p className="text-xs text-gray-500 text-center">
              By placing your order, you agree to our Terms of Service and
              Privacy Policy
            </p>
          </div>

          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <div className="flex items-center gap-2 text-green-700">
              <Clock className="h-4 w-4" />
              <span className="text-sm font-medium">
                Estimated delivery: 25-40 minutes
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
