'use client';

import { Plus, Minus } from 'lucide-react';
import { formatPrice } from '@dreckly/utils';
import { MenuItem, MenuCartItemProps } from '@dreckly/types';

export const MenuCartItem = ({
  item,
  quantity,
  onAdd,
  onRemove,
}: MenuCartItemProps) => {
  if (quantity === 0) return null;

  return (
    <div className="flex justify-between items-center">
      <div className="flex-1">
        <p className="font-medium text-sm">{item.name}</p>
        <p className="text-xs text-gray-500">{formatPrice(item.price)} each</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="inline-flex items-center justify-center h-6 w-6 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          onClick={() => onRemove(item.id)}
          aria-label="Remove item"
        >
          <Minus className="h-3 w-3" />
        </button>
        <span className="w-6 text-center text-sm">{quantity}</span>
        <button
          type="button"
          className="inline-flex items-center justify-center h-6 w-6 rounded-md bg-orange-500 text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors"
          onClick={() => onAdd(item.id)}
          aria-label="Add item"
        >
          <Plus className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
};
