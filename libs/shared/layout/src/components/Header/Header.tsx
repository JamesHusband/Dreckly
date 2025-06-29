'use client';

import { Logo, NavButton, DropdownMenu } from '@dreckly/ui-kit';
import { Menu, ShoppingCart, User } from 'lucide-react';
import { useState } from 'react';
import { CartCount } from '@dreckly/ui-kit';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const userMenuItems = [
    { href: '/user', label: 'My Account' },
    { href: '/login', label: 'Sign In' },
    { href: '/register', label: 'Create Account' },
  ];

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Logo />
          <nav className="flex items-center space-x-4">
            <div className="relative">
              <NavButton href="/cart">
                <ShoppingCart />
                <CartCount />
              </NavButton>
            </div>

            <div className="relative">
              <NavButton onClick={toggleMenu} icon={<User />} text="Account" />
              <DropdownMenu
                isOpen={isMenuOpen}
                items={userMenuItems}
                onItemClick={() => setIsMenuOpen(false)}
              />
            </div>

            <div className="md:hidden">
              <NavButton icon={<Menu />} showText={false} />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};
