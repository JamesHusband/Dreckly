'use client';

import { MenuHeader } from '../MenuHeader';
import { MenuCategory } from '../MenuCategory';
import { MinimumOrder } from '../MinimumOrder';
import { MenuCartSidebar } from '../MenuCartSidebar';
import { BackButton, ConfirmationModal } from '@dreckly/ui-kit';
import { CartLoading } from '@dreckly/cart';
import { Restaurant, RestaurantMenuProps } from '@dreckly/types';
import { useCartActions, useCart } from '@dreckly/cart';

export const Menu = ({ restaurant }: RestaurantMenuProps) => {
  const {
    addToCart,
    removeFromCart,
    isOpen,
    hideConfirmation,
    confirmAction,
    handleConfirmAddToCart,
  } = useCartActions();
  const { cart } = useCart();

  const handleAddToCart = (itemId: string) => {
    addToCart(itemId, restaurant);
  };

  const handleRemoveFromCart = (itemId: string) => {
    removeFromCart(itemId);
  };

  const handleConfirm = () => {
    const pendingAction = confirmAction();
    if (pendingAction) {
      handleConfirmAddToCart(pendingAction.itemId, pendingAction.restaurant);
      hideConfirmation();
    }
  };

  if (!cart) {
    return <CartLoading />;
  }

  return (
    <>
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-4">
          <BackButton />
        </div>

        <MenuHeader {...restaurant} />

        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <MinimumOrder minOrder={restaurant.minimumOrder} />

              {(restaurant.menu ?? []).map((category, menuIndex) => (
                <MenuCategory
                  key={category.name}
                  category={category}
                  cart={cart.cart}
                  onAddToCart={handleAddToCart}
                  onRemoveFromCart={handleRemoveFromCart}
                  isLast={menuIndex === (restaurant.menu?.length ?? 0) - 1}
                  restaurantName={restaurant.name}
                />
              ))}
            </div>

            <MenuCartSidebar
              restaurant={restaurant}
              cart={cart.cart}
              onAddToCart={handleAddToCart}
              onRemoveFromCart={handleRemoveFromCart}
            />
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isOpen}
        onConfirm={handleConfirm}
        onCancel={hideConfirmation}
        title="Start New Order?"
        message="You have items from another restaurant in your cart. Starting a new order will clear your current cart. Are you sure you want to continue?"
        confirmText="Start New Order"
        cancelText="Keep Current Order"
      />
    </>
  );
};
