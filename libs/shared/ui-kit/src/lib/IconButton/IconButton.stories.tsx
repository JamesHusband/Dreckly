import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from './IconButton';
import { ShoppingCart } from 'lucide-react';

const meta: Meta<typeof IconButton> = {
  title: 'UI Kit/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    icon: { control: false },
    variant: { control: { type: 'select' }, options: ['primary', 'outline'] },
    size: { control: { type: 'select' }, options: ['sm', 'md', 'lg'] },
    onClick: { action: 'clicked' },
    'aria-label': { control: 'text' },
    disabled: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  args: {
    icon: <ShoppingCart className="h-4 w-4" />,
    variant: 'primary',
    size: 'md',
    'aria-label': 'Cart',
    disabled: false,
  },
};
