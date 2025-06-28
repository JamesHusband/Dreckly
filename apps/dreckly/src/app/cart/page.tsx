'use client';

import { Trash2, MapPin, Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {
  useCart,
  createAddToCartHandler,
  createRemoveFromCartHandler,
  createSetQuantityHandler,
  CartSidebar,
  EmptyCart,
} from '@dreckly/cart';
import { formatPrice } from '@dreckly/utils';
import { ItemCounter, BackButton } from '@dreckly/ui-kit';
import { calculateCart } from '@dreckly/cart';

export default function CartPage() {
  const { cart, isClient } = useCart();

  const cartCalculation =
    cart && cart.currentRestaurant
      ? calculateCart({ cart: cart.cart, restaurant: cart.currentRestaurant })
      : {
          cartItemsList: [],
          subtotal: 0,
          deliveryFee: 0,
          serviceFee: 1.49,
          total: 0,
          hasCartItems: false,
        };

  const {
    cartItemsList,
    subtotal,
    deliveryFee,
    serviceFee,
    total,
    hasCartItems,
  } = cartCalculation;

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

  const { addToCart, removeFromCart, setItemQuantity, currentRestaurant } =
    cart;

  if (!hasCartItems) {
    return <EmptyCart />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <BackButton />

          <h1 className="text-3xl font-bold mb-8">Your Order</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Delivery Address
                  </h3>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">
                        123 High Street, Truro, TR1 2AB
                      </p>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                        <Clock className="h-4 w-4" />
                        <span>Estimated delivery: 25-40 min</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors font-medium"
                    >
                      Change
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold">
                    From {currentRestaurant?.name || 'Restaurant'}
                  </h3>
                  {currentRestaurant && (
                    <Link
                      href={`/restaurant/${currentRestaurant.id}`}
                      className="text-orange-600 hover:text-orange-500 text-sm"
                    >
                      Add more items
                    </Link>
                  )}
                </div>
                <div className="p-4">
                  <div className="space-y-4">
                    {cartItemsList.map(
                      (item: {
                        id: string;
                        name: string;
                        price: number;
                        image?: string;
                        quantity: number;
                      }) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-4 py-4 border-b border-gray-100 last:border-b-0"
                        >
                          <Image
                            src={item.image || '/placeholder.svg'}
                            alt={item.name}
                            width={80}
                            height={80}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-sm text-gray-600">
                              {formatPrice(item.price)} each
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <ItemCounter
                              id={item.id}
                              quantity={item.quantity}
                              onAdd={createAddToCartHandler(
                                addToCart,
                                currentRestaurant
                              )}
                              onRemove={() =>
                                createRemoveFromCartHandler(removeFromCart)(
                                  item.id
                                )
                              }
                            />
                            <div className="w-20 text-right font-medium">
                              {formatPrice(item.price * item.quantity)}
                            </div>
                            <button
                              type="button"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50 p-1 rounded transition-colors"
                              onClick={() =>
                                createSetQuantityHandler(setItemQuantity)(
                                  item.id,
                                  0
                                )
                              }
                              aria-label="Remove all items"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>

            {currentRestaurant && (
              <CartSidebar
                subtotal={subtotal}
                deliveryFee={deliveryFee}
                serviceFee={serviceFee}
                total={total}
                currentRestaurant={currentRestaurant}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
