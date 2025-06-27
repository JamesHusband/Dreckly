'use client';

import { Plus, Minus } from 'lucide-react';
import { formatPrice } from '@dreckly/utils';
import { MenuItem } from '@dreckly/types';
import { IconButton } from '@dreckly/ui-kit';

interface MenuCartItemProps {
  item: MenuItem;
  quantity: number;
  onAdd: (itemId: string) => void;
  onRemove: (itemId: string) => void;
}

export function MenuCartItem({
  item,
  quantity,
  onAdd,
  onRemove,
}: MenuCartItemProps) {
  if (quantity === 0) return null;

  return (
    <div className="flex justify-between items-center">
      <div className="flex-1">
        <p className="font-medium text-sm">{item.name}</p>
        <p className="text-xs text-gray-500">{formatPrice(item.price)} each</p>
      </div>
      <div className="flex items-center gap-2">
        <IconButton
          icon={<Minus className="h-3 w-3" />}
          variant="outline"
          size="sm"
          onClick={() => onRemove(item.id)}
          aria-label="Remove item"
        />
        <span className="w-6 text-center text-sm">{quantity}</span>
        <IconButton
          icon={<Plus className="h-3 w-3" />}
          variant="primary"
          size="sm"
          onClick={() => onAdd(item.id)}
          aria-label="Add item"
        />
      </div>
    </div>
  );
}
