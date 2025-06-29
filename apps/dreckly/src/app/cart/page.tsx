'use client';

import { Trash2, MapPin, Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart, CartSidebar, EmptyCart, getCartTotals } from '@dreckly/cart';
import { formatPrice } from '@dreckly/utils';
import { ItemCounter, BackButton } from '@dreckly/ui-kit';

const CartPage = () => {
  const { cart, isClient } = useCart();

  const cartTotals =
    cart && cart.currentRestaurant
      ? getCartTotals({ cart: cart.cart, restaurant: cart.currentRestaurant })
      : {
          cartItems: [],
          subtotal: 0,
          deliveryFee: 0,
          serviceFee: 1.49,
          total: 0,
          hasCartItems: false,
        };

  const { cartItems, hasCartItems } = cartTotals;

  if (!isClient || !cart) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading cart...</p>
        </div>
      </div>
    );
  }

  const { addToCart, removeFromCart, currentRestaurant } = cart;

  if (!hasCartItems) {
    return <EmptyCart />;
  }

  const handleAddToCart = (itemId: string) =>
    addToCart(itemId, currentRestaurant || undefined);
  const handleRemoveFromCart = (itemId: string) => removeFromCart(itemId);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <BackButton />
            <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Order from {currentRestaurant?.name}
                  </h2>
                  <p className="text-gray-600 mt-1">
                    {cartItems.length} item{cartItems.length !== 1 ? 's' : ''}{' '}
                    in your cart
                  </p>
                </div>

                <div className="p-6">
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg"
                      >
                        <Image
                          src={item.image || '/placeholder.svg'}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {item.description}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {formatPrice(item.price)} each
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <ItemCounter
                            id={item.id}
                            onAdd={() => handleAddToCart(item.id)}
                            onRemove={() => handleRemoveFromCart(item.id)}
                            quantity={item.quantity}
                          />
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">
                              {formatPrice(item.price * item.quantity)}
                            </p>
                          </div>
                          <button
                            onClick={() => handleRemoveFromCart(item.id)}
                            className="text-red-500 hover:text-red-700 p-2"
                            aria-label="Remove item"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {currentRestaurant && (
              <CartSidebar
                restaurant={currentRestaurant}
                cart={cart.cart}
                onAddToCart={handleAddToCart}
                onRemoveFromCart={handleRemoveFromCart}
              />
            )}
          </div>

          <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Delivery Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900">Delivery Address</p>
                  <p className="text-sm text-gray-600">
                    123 High Street, Truro, Cornwall TR1 2AB
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900">
                    Estimated Delivery
                  </p>
                  <p className="text-sm text-gray-600">
                    {currentRestaurant?.deliveryTime || '30-45 minutes'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
