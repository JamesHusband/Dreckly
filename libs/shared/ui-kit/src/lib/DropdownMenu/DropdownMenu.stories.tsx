import type { Meta, StoryObj } from '@storybook/react';
import { DropdownMenu } from './DropdownMenu';
import type { DropdownMenuItem } from '@dreckly/types';

const items: DropdownMenuItem[] = [
  { label: 'Profile', href: '/profile' },
  { label: 'Settings', href: '/settings' },
  { label: 'Logout', href: '/logout' },
];

const meta: Meta<typeof DropdownMenu> = {
  title: 'UI Kit/DropdownMenu',
  component: DropdownMenu,
  decorators: [
    (Story) => (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f3f4f6',
        }}
      >
        <div style={{ position: 'relative', width: 320, height: 200 }}>
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof DropdownMenu>;

export const Open: Story = {
  args: {
    isOpen: true,
    items,
    onItemClick: () => {
      console.log('Item clicked');
    },
  },
};
