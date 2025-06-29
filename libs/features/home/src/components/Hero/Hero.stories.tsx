import type { Meta, StoryObj } from '@storybook/react';
import { Hero } from './Hero';
import { CuisineCard } from '@dreckly/ui-kit';

const meta: Meta<typeof Hero> = {
  title: 'Home/Hero',
  component: Hero,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof Hero>;

export const Default: Story = {
  render: () => (
    <section className="py-12 bg-gray-50 flex items-center justify-center min-h-[400px]">
      <div className="w-full flex flex-col items-center">
        <h2 className="text-2xl font-bold text-center mb-8">
          What are you craving?
        </h2>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
          {mockCuisines.map((cuisine) => (
            <CuisineCard
              key={cuisine.name}
              {...cuisine}
              iconComponent={() => <span />}
              onClick={() => undefined}
              isSelected={false}
            />
          ))}
        </div>
      </div>
    </section>
  ),
};
