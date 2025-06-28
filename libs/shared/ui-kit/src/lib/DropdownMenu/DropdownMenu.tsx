import Link from 'next/link';
import { DropdownMenuItem, DropdownMenuProps } from '@dreckly/types';

export const DropdownMenu = ({
  isOpen,
  items,
  onItemClick,
  className = '',
}: DropdownMenuProps) => {
  if (!isOpen) return null;

  const handleItemClick = () => {
    onItemClick?.();
  };

  return (
    <div
      className={`absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border z-50 ${className}`}
    >
      {items.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          onClick={handleItemClick}
          className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
};
