import type { Meta, StoryObj } from '@storybook/react';
import { MinimumOrder } from './MinimumOrder';

const meta: Meta<typeof MinimumOrder> = {
  title: 'Menu/MinimumOrder',
  component: MinimumOrder,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof MinimumOrder>;

export const Default: Story = {
  args: {
    minOrder: 10,
  },
};
