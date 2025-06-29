import type { Meta, StoryObj } from '@storybook/react';
import { CuisineCard } from '@dreckly/ui-kit';
import React from 'react';
import { PieChart, Fish, Pizza, Cake } from 'lucide-react';
import type { Cuisine } from '@dreckly/types';

type MockCuisine = Omit<Cuisine, 'icon'> & {
  icon: 'PieChart' | 'Fish' | 'Pizza' | 'Cake';
  iconComponent: React.ElementType;
};

const mockCuisines: MockCuisine[] = [
  { name: 'Cornish', icon: 'PieChart', iconComponent: PieChart },
  { name: 'Seafood', icon: 'Fish', iconComponent: Fish },
  { name: 'Italian', icon: 'Pizza', iconComponent: Pizza },
  { name: 'Desserts', icon: 'Cake', iconComponent: Cake },
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
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold text-center mb-8">
          What are you craving?
        </h2>
        <div className="grid grid-cols-4 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {mockCuisines.map((cuisine) => (
            <CuisineCard
              key={cuisine.name}
              name={cuisine.name}
              icon={cuisine.icon}
              iconComponent={cuisine.iconComponent}
              onClick={() => undefined}
              isSelected={false}
            />
          ))}
        </div>
      </div>
    </section>
  ),
};
