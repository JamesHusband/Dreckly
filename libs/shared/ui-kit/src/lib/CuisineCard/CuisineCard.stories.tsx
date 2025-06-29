import type { Meta, StoryObj } from '@storybook/react';
import { CuisineCard } from './CuisineCard';
import { PieChart } from 'lucide-react';

const meta: Meta<typeof CuisineCard> = {
  title: 'UI Kit/CuisineCard',
  component: CuisineCard,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    name: { control: 'text' },
    iconComponent: { control: false },
    isSelected: { control: 'boolean' },
    onClick: { action: 'clicked' },
  },
};

export default meta;

type Story = StoryObj<typeof CuisineCard>;

export const Default: Story = {
  args: {
    name: 'Cornish',
    iconComponent: PieChart,
    isSelected: false,
  },
};
