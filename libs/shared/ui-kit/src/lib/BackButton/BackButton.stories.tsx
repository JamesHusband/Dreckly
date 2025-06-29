import type { Meta, StoryObj } from '@storybook/react';
import { BackButton } from './BackButton';

const meta: Meta<typeof BackButton> = {
  title: 'UI Kit/BackButton',
  component: BackButton,
};

export default meta;

type Story = StoryObj<typeof BackButton>;

export const Default: Story = {
  render: () => <BackButton />,
};
