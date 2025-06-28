import Link from 'next/link';
import { formatPrice } from '@dreckly/utils';
import { calculateCart } from '@dreckly/cart';
import { MenuCartItem } from '../MenuCartItem';
import { Restaurant, Cart, CartSidebarProps } from '@dreckly/types';

export const MenuCartSidebar = ({
  restaurant,
  cart,
  onAddToCart,
  onRemoveFromCart,
}: CartSidebarProps) => {
  const { subtotal, hasCartItems } = calculateCart({ cart, restaurant });

  return (
    <div className="lg:col-span-1">
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm sticky top-24">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Your Order</h3>
          <p className="text-sm text-gray-600">From {restaurant.name}</p>
        </div>
        <div className="p-4">
          {!hasCartItems ? (
            <p className="text-gray-500 text-center py-8">Your cart is empty</p>
          ) : (
            <>
              <div className="space-y-3 mb-4">
                {(restaurant.menu ?? []).map((category) =>
                  category.items.map((item) => (
                    <MenuCartItem
                      key={item.id}
                      item={item}
                      quantity={cart[item.id] || 0}
                      onAdd={onAddToCart}
                      onRemove={onRemoveFromCart}
                    />
                  ))
                )}
              </div>

              <hr className="my-4 border-gray-200" />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>{formatPrice(restaurant.deliveryFee)}</span>
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>{formatPrice(subtotal + restaurant.deliveryFee)}</span>
                </div>
              </div>

              <Link href="/cart">
                <button
                  type="button"
                  className={`w-full mt-4 py-3 px-4 rounded-md font-medium transition-colors ${
                    subtotal < (restaurant.minimumOrder ?? 0)
                      ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                      : 'bg-orange-500 hover:bg-orange-600 text-white'
                  }`}
                  disabled={subtotal < (restaurant.minimumOrder ?? 0)}
                >
                  {subtotal < (restaurant.minimumOrder ?? 0)
                    ? `Minimum order ${formatPrice(restaurant.minimumOrder)}`
                    : 'Proceed to Checkout'}
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
