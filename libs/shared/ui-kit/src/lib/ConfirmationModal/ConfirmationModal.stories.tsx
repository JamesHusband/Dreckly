import type { Meta, StoryObj } from '@storybook/react';
import { ConfirmationModal } from './ConfirmationModal';

const meta: Meta<typeof ConfirmationModal> = {
  title: 'UI Kit/ConfirmationModal',
  component: ConfirmationModal,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    isOpen: { control: 'boolean', description: 'Whether the modal is open' },
    title: { control: 'text', description: 'Modal title' },
    message: { control: 'text', description: 'Modal message content' },
    confirmText: { control: 'text', description: 'Text for confirm button' },
    cancelText: { control: 'text', description: 'Text for cancel button' },
    onConfirm: {
      action: 'confirmed',
      description: 'Function called when confirm is clicked',
    },
    onCancel: {
      action: 'cancelled',
      description: 'Function called when cancel is clicked',
    },
  },
};

export default meta;

type Story = StoryObj<typeof ConfirmationModal>;

export const Default: Story = {
  args: {
    isOpen: true,
    title: 'Confirm Action',
    message: 'Are you sure you want to proceed with this action?',
    confirmText: 'Confirm',
    cancelText: 'Cancel',
  },
};
