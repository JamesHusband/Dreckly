import { ReactNode } from 'react';
import Link from 'next/link';
import { NavButtonProps } from '@dreckly/types';

export const NavButton = ({
  href,
  onClick,
  children,
  icon,
  showText = true,
  text,
}: NavButtonProps) => {
  const content = (
    <>
      {icon && <span className="h-5 w-5">{icon}</span>}
      {showText && text && (
        <span className="hidden sm:inline ml-2">{text}</span>
      )}
      {children}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="flex items-center p-2 hover:bg-gray-100 rounded-md transition-colors"
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className="flex items-center p-2 hover:bg-gray-100 rounded-md transition-colors"
    >
      {content}
    </button>
  );
};
