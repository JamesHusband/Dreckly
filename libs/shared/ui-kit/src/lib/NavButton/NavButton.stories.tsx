import type { Meta, StoryObj } from '@storybook/react';
import { NavButton } from './NavButton';
import { Home } from 'lucide-react';

const meta: Meta<typeof NavButton> = {
  title: 'UI Kit/NavButton',
  component: NavButton,
};

export default meta;

type Story = StoryObj<typeof NavButton>;

export const AsLink: Story = {
  args: {
    href: '/home',
    icon: <Home className="h-5 w-5" />,
    text: 'Home',
  },
};

export const AsButton: Story = {
  args: {
    onClick: () => {
      console.log('Clicked');
    },
    icon: <Home className="h-5 w-5" />,
    text: 'Click Me',
  },
};
