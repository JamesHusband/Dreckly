import type { Meta, StoryObj } from '@storybook/react';
import { Logo } from './Logo';

const meta: Meta<typeof Logo> = {
  title: 'UI Kit/Logo',
  component: Logo,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    textColor: { control: { type: 'select' }, options: ['grey', 'white'] },
  },
};

export default meta;

type Story = StoryObj<typeof Logo>;

export const Default: Story = {
  args: {
    textColor: 'grey',
  },
};
