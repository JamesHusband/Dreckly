'use client';

import Image from 'next/image';
import { Plus, Minus } from 'lucide-react';
import { formatPrice } from '@dreckly/utils';
import { MenuCategory as MenuCategoryType, Cart } from '@dreckly/types';
import { IconButton } from '@dreckly/ui-kit';

interface MenuCategoryProps {
  category: MenuCategoryType;
  cart: Cart;
  onAddToCart: (itemId: string) => void;
  onRemoveFromCart: (itemId: string) => void;
  isLast?: boolean;
}

export function MenuCategory({
  category,
  cart,
  onAddToCart,
  onRemoveFromCart,
  isLast = false,
}: MenuCategoryProps) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">{category.name}</h2>
      <div className="space-y-4">
        {category.items.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
          >
            <div className="p-4">
              <div className="flex gap-4">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-lg">
                      {formatPrice(item.price)}
                    </span>
                    <div className="flex items-center gap-2">
                      {cart[item.id] > 0 && (
                        <>
                          <IconButton
                            icon={<Minus className="h-4 w-4" />}
                            variant="outline"
                            size="md"
                            onClick={() => onRemoveFromCart(item.id)}
                            aria-label="Remove item"
                          />
                          <span className="w-8 text-center font-medium">
                            {cart[item.id]}
                          </span>
                        </>
                      )}
                      <IconButton
                        icon={<Plus className="h-4 w-4" />}
                        variant="primary"
                        size="md"
                        onClick={() => onAddToCart(item.id)}
                        aria-label="Add item"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {!isLast && <hr className="my-8 border-gray-200" />}
    </div>
  );
}
