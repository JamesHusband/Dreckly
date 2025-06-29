import type { Meta, StoryObj } from '@storybook/react';

const MockCartCount = ({
  count = 3,
  isVisible = true,
  isLoading = false,
  className = '',
}) => (
  <span
    className={`absolute -top-2 -right-2 h-5 w-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center ${
      isLoading || !isVisible ? 'hidden' : ''
    } ${className}`}
  >
    {count}
  </span>
);

const meta: Meta<typeof MockCartCount> = {
  title: 'Cart/CartCount',
  component: MockCartCount,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div
        style={{
          position: 'relative',
          width: 64,
          height: 64,
          background: '#f3f4f6',
          borderRadius: 8,
        }}
      >
        <Story />
      </div>
    ),
  ],
  argTypes: {
    count: { control: 'number' },
    isVisible: { control: 'boolean' },
    isLoading: { control: 'boolean' },
    className: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof MockCartCount>;

export const Default: Story = {
  args: {
    count: 3,
    isVisible: true,
    isLoading: false,
    className: '',
  },
};
