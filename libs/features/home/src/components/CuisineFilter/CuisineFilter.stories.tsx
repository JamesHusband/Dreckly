import type { Meta, StoryObj } from '@storybook/react';
import { CuisineCard } from '@dreckly/ui-kit';
import React from 'react';

const mockCuisines = [
  { name: 'Cornish', icon: 'PieChart' },
  { name: 'Seafood', icon: 'Fish' },
  { name: 'Italian', icon: 'Pizza' },
  { name: 'Desserts', icon: 'Cake' },
];

const meta: Meta<typeof CuisineCard> = {
  title: 'Home/CuisineFilter',
  component: CuisineCard,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof CuisineCard>;

export const Default: Story = {
  render: () => (
    <section className="py-12 bg-gray-50 flex items-center justify-center min-h-[400px]">
      <div>
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
