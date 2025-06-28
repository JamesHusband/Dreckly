import Image from 'next/image';
import { MenuItemProps } from '@dreckly/types';
import { ItemCounter } from '@dreckly/ui-kit';
import { formatPrice } from '@dreckly/utils';

export const MenuItem = ({ name, items, menuIndex, menu }: MenuItemProps) => {
  return (
    <div key={name} className="mb-8">
      <h2 className="text-2xl font-bold mb-4">{name}</h2>
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
          >
            <div className="p-4">
              <div className="flex gap-4">
                <Image
                  src={item.image || '/placeholder.svg'}
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
                    <ItemCounter id={item.id} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {menuIndex < (menu?.length ?? 0) - 1 && (
        <hr className="my-8 border-gray-200" />
      )}
    </div>
  );
};
