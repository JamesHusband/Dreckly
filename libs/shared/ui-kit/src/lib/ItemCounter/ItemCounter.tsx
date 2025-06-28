'use client';

import { Minus, Plus } from 'lucide-react';
import { useCart } from '@dreckly/cart';
import { IconButton } from '../IconButton';
import { ItemCounterProps } from '@dreckly/types';

export const ItemCounter = ({
  id,
  onAdd,
  onRemove,
  quantity,
}: ItemCounterProps) => {
  const { cart } = useCart();

  if (!cart) {
    if (onAdd && onRemove) {
      const itemQuantity = quantity ?? 0;

      return (
        <div className="flex items-center gap-2">
          {itemQuantity > 0 && (
            <>
              <IconButton
                icon={<Minus className="h-4 w-4" />}
                variant="outline"
                size="md"
                onClick={() => onRemove(id)}
                aria-label="Remove item"
              />
              <span className="w-8 text-center font-medium">
                {itemQuantity}
              </span>
            </>
          )}
          <IconButton
            icon={<Plus className="h-4 w-4" />}
            variant="primary"
            size="md"
            onClick={() => onAdd(id)}
            aria-label="Add item"
          />
        </div>
      );
    }

    return (
      <div className="flex items-center gap-2">
        <IconButton
          icon={<Plus className="h-4 w-4" />}
          variant="primary"
          size="md"
          disabled
          aria-label="Add item (loading)"
        />
      </div>
    );
  }

  const { getItemQuantity, addToCart, removeFromCart } = cart;

  const itemQuantity = quantity ?? getItemQuantity(id);

  const handleAdd = onAdd ?? addToCart;
  const handleRemove = onRemove ?? removeFromCart;

  return (
    <div className="flex items-center gap-2">
      {itemQuantity > 0 && (
        <>
          <IconButton
            icon={<Minus className="h-4 w-4" />}
            variant="outline"
            size="md"
            onClick={() => handleRemove(id)}
            aria-label="Remove item"
          />
          <span className="w-8 text-center font-medium">{itemQuantity}</span>
        </>
      )}
      <IconButton
        icon={<Plus className="h-4 w-4" />}
        variant="primary"
        size="md"
        onClick={() => handleAdd(id)}
        aria-label="Add item"
      />
    </div>
  );
};
