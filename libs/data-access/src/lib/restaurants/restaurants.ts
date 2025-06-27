import { Restaurant } from '@dreckly/types';

export async function getRestaurant(id: string): Promise<Restaurant> {
  const res = await fetch(`http://localhost:3000/api/restaurants/${id}`);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json() as Promise<Restaurant>;
}

export async function getRestaurants(): Promise<Restaurant[]> {
  // Mock data - in a real app this would come from a database
  return [
    {
      id: 1,
      name: 'The Cornish Pasty Co.',
      cuisine: 'Traditional Cornish',
      rating: 4.8,
      deliveryTime: '25-40 min',
      deliveryFee: 2.99,
      minimumOrder: 8.0,
      image:
        'https://kzmkxsodp5ri9jc22k4a.lite.vusercontent.net/placeholder.svg?height=200&width=300',
      featured: true,
      address: '12 High Street, Truro, Cornwall TR1 2AB',
      description:
        'Authentic Cornish pasties made with locally sourced ingredients. Family recipe passed down through generations.',
      reviewCount: 100,
      menu: [
        {
          name: 'Traditional Pasties',
          items: [
            {
              id: '1',
              name: 'Classic Cornish Pasty',
              description: 'Traditional beef, potato, swede and onion pasty',
              price: 4.5,
              image:
                'https://kzmkxsodp5ri9jc22k4a.lite.vusercontent.net/placeholder.svg?height=100&width=100',
            },
            {
              id: '2',
              name: 'Cheese & Onion Pasty',
              description:
                'Vegetarian pasty with mature cheddar and caramelized onions',
              price: 4.25,
              image:
                'https://kzmkxsodp5ri9jc22k4a.lite.vusercontent.net/placeholder.svg?height=100&width=100',
            },
            {
              id: '3',
              name: 'Steak & Kidney Pasty',
              description: 'Premium steak and kidney with rich gravy',
              price: 5.25,
              image:
                'https://kzmkxsodp5ri9jc22k4a.lite.vusercontent.net/placeholder.svg?height=100&width=100',
            },
          ],
        },
        {
          name: 'Specialty Pasties',
          items: [
            {
              id: '4',
              name: 'Chicken & Mushroom Pasty',
              description: 'Free-range chicken with wild mushrooms and herbs',
              price: 4.75,
              image:
                'https://kzmkxsodp5ri9jc22k4a.lite.vusercontent.net/placeholder.svg?height=100&width=100',
            },
            {
              id: '5',
              name: 'Fish Pasty',
              description: 'Fresh Cornish fish with parsley sauce',
              price: 5.5,
              image:
                'https://kzmkxsodp5ri9jc22k4a.lite.vusercontent.net/placeholder.svg?height=100&width=100',
            },
          ],
        },
        {
          name: 'Sides & Drinks',
          items: [
            {
              id: '6',
              name: 'Cornish Yarg Cheese',
              description: 'Local artisan cheese portion',
              price: 3.25,
              image:
                'https://kzmkxsodp5ri9jc22k4a.lite.vusercontent.net/placeholder.svg?height=100&width=100',
            },
            {
              id: '7',
              name: 'Cornish Cider',
              description: 'Traditional scrumpy cider 500ml',
              price: 4.5,
              image:
                'https://kzmkxsodp5ri9jc22k4a.lite.vusercontent.net/placeholder.svg?height=100&width=100',
            },
          ],
        },
      ],
    },
    {
      id: 2,
      name: "Fisherman's Catch",
      cuisine: 'Fish & Chips',
      rating: 4.6,
      deliveryTime: '30-45 min',
      deliveryFee: 3.49,
      minimumOrder: 12.0,
      image:
        'https://kzmkxsodp5ri9jc22k4a.lite.vusercontent.net/placeholder.svg?height=200&width=300',
      featured: true,
      address: '12 High Street, Truro, Cornwall TR1 2AB',
      description:
        'Authentic Cornish pasties made with locally sourced ingredients. Family recipe passed down through generations.',
      reviewCount: 100,
      menu: [
        {
          name: 'Fish & Chips',
          items: [
            {
              id: '8',
              name: 'Classic Fish & Chips',
              description: 'Fresh cod in crispy batter with chunky chips',
              price: 8.99,
              image:
                'https://kzmkxsodp5ri9jc22k4a.lite.vusercontent.net/placeholder.svg?height=100&width=100',
            },
            {
              id: '9',
              name: 'Haddock & Chips',
              description: 'Premium haddock with golden chips and mushy peas',
              price: 9.99,
              image:
                'https://kzmkxsodp5ri9jc22k4a.lite.vusercontent.net/placeholder.svg?height=100&width=100',
            },
            {
              id: '10',
              name: 'Plaice & Chips',
              description: 'Fresh plaice with triple-cooked chips',
              price: 7.99,
              image:
                'https://kzmkxsodp5ri9jc22k4a.lite.vusercontent.net/placeholder.svg?height=100&width=100',
            },
          ],
        },
        {
          name: 'Sides',
          items: [
            {
              id: '11',
              name: 'Mushy Peas',
              description: 'Traditional mushy peas',
              price: 1.5,
              image:
                'https://kzmkxsodp5ri9jc22k4a.lite.vusercontent.net/placeholder.svg?height=100&width=100',
            },
            {
              id: '12',
              name: 'Curry Sauce',
              description: 'Spicy curry sauce for dipping',
              price: 1.0,
              image:
                'https://kzmkxsodp5ri9jc22k4a.lite.vusercontent.net/placeholder.svg?height=100&width=100',
            },
          ],
        },
      ],
    },
    {
      id: 3,
      name: 'Kernow Kitchen',
      cuisine: 'Modern British',
      rating: 4.7,
      deliveryTime: '35-50 min',
      deliveryFee: 2.49,
      minimumOrder: 15.0,
      image:
        'https://kzmkxsodp5ri9jc22k4a.lite.vusercontent.net/placeholder.svg?height=200&width=300',
      featured: false,
      address: '12 High Street, Truro, Cornwall TR1 2AB',
      description:
        'Authentic Cornish pasties made with locally sourced ingredients. Family recipe passed down through generations.',
      reviewCount: 100,
      menu: [
        {
          name: 'Starters',
          items: [
            {
              id: '13',
              name: 'Cornish Crab Cakes',
              description: 'Fresh crab cakes with lemon aioli',
              price: 6.5,
              image:
                'https://kzmkxsodp5ri9jc22k4a.lite.vusercontent.net/placeholder.svg?height=100&width=100',
            },
            {
              id: '14',
              name: 'Soup of the Day',
              description: "Chef's daily soup with crusty bread",
              price: 4.5,
              image:
                'https://kzmkxsodp5ri9jc22k4a.lite.vusercontent.net/placeholder.svg?height=100&width=100',
            },
          ],
        },
        {
          name: 'Mains',
          items: [
            {
              id: '15',
              name: 'Cornish Lamb Shank',
              description: 'Slow-cooked lamb with rosemary potatoes',
              price: 16.99,
              image:
                'https://kzmkxsodp5ri9jc22k4a.lite.vusercontent.net/placeholder.svg?height=100&width=100',
            },
            {
              id: '16',
              name: 'Seafood Risotto',
              description: 'Creamy risotto with local seafood',
              price: 14.99,
              image:
                'https://kzmkxsodp5ri9jc22k4a.lite.vusercontent.net/placeholder.svg?height=100&width=100',
            },
          ],
        },
      ],
    },
    {
      id: 4,
      name: 'Seaside Spice',
      cuisine: 'Indian',
      rating: 4.5,
      deliveryTime: '20-35 min',
      deliveryFee: 2.99,
      minimumOrder: 10.0,
      image:
        'https://kzmkxsodp5ri9jc22k4a.lite.vusercontent.net/placeholder.svg?height=200&width=300',
      featured: false,
      address: '12 High Street, Truro, Cornwall TR1 2AB',
      description:
        'Authentic Cornish pasties made with locally sourced ingredients. Family recipe passed down through generations.',
      reviewCount: 100,
      menu: [
        {
          name: 'Curries',
          items: [
            {
              id: '17',
              name: 'Chicken Tikka Masala',
              description: 'Creamy curry with tender chicken',
              price: 11.99,
              image:
                'https://kzmkxsodp5ri9jc22k4a.lite.vusercontent.net/placeholder.svg?height=100&width=100',
            },
            {
              id: '18',
              name: 'Lamb Rogan Josh',
              description: 'Spicy lamb curry with aromatic spices',
              price: 12.99,
              image:
                'https://kzmkxsodp5ri9jc22k4a.lite.vusercontent.net/placeholder.svg?height=100&width=100',
            },
            {
              id: '19',
              name: 'Vegetable Korma',
              description: 'Mild curry with mixed vegetables',
              price: 9.99,
              image:
                'https://kzmkxsodp5ri9jc22k4a.lite.vusercontent.net/placeholder.svg?height=100&width=100',
            },
          ],
        },
        {
          name: 'Breads & Rice',
          items: [
            {
              id: '20',
              name: 'Garlic Naan',
              description: 'Fresh garlic naan bread',
              price: 2.5,
              image:
                'https://kzmkxsodp5ri9jc22k4a.lite.vusercontent.net/placeholder.svg?height=100&width=100',
            },
            {
              id: '21',
              name: 'Pilau Rice',
              description: 'Fragrant basmati rice with spices',
              price: 3.5,
              image:
                'https://kzmkxsodp5ri9jc22k4a.lite.vusercontent.net/placeholder.svg?height=100&width=100',
            },
          ],
        },
      ],
    },
    {
      id: 5,
      name: 'Pizza Porthcurno',
      cuisine: 'Italian',
      rating: 4.4,
      deliveryTime: '25-40 min',
      deliveryFee: 3.99,
      minimumOrder: 12.0,
      image:
        'https://kzmkxsodp5ri9jc22k4a.lite.vusercontent.net/placeholder.svg?height=200&width=300',
      featured: false,
      address: '12 High Street, Truro, Cornwall TR1 2AB',
      description:
        'Authentic Cornish pasties made with locally sourced ingredients. Family recipe passed down through generations.',
      reviewCount: 100,
      menu: [
        {
          name: 'Pizzas',
          items: [
            {
              id: '22',
              name: 'Margherita',
              description: 'Classic tomato, mozzarella and basil',
              price: 10.99,
              image:
                'https://kzmkxsodp5ri9jc22k4a.lite.vusercontent.net/placeholder.svg?height=100&width=100',
            },
            {
              id: '23',
              name: 'Pepperoni',
              description: 'Spicy pepperoni with mozzarella',
              price: 12.99,
              image:
                'https://kzmkxsodp5ri9jc22k4a.lite.vusercontent.net/placeholder.svg?height=100&width=100',
            },
            {
              id: '24',
              name: 'Quattro Stagioni',
              description:
                'Four seasons with artichoke, ham, mushrooms, olives',
              price: 14.99,
              image:
                'https://kzmkxsodp5ri9jc22k4a.lite.vusercontent.net/placeholder.svg?height=100&width=100',
            },
          ],
        },
        {
          name: 'Pasta',
          items: [
            {
              id: '25',
              name: 'Spaghetti Carbonara',
              description: 'Creamy pasta with pancetta and egg',
              price: 9.99,
              image:
                'https://kzmkxsodp5ri9jc22k4a.lite.vusercontent.net/placeholder.svg?height=100&width=100',
            },
            {
              id: '26',
              name: 'Penne Arrabbiata',
              description: 'Spicy tomato sauce with chilli',
              price: 8.99,
              image:
                'https://kzmkxsodp5ri9jc22k4a.lite.vusercontent.net/placeholder.svg?height=100&width=100',
            },
          ],
        },
      ],
    },
    {
      id: 6,
      name: 'The Cornish Creamery',
      cuisine: 'Desserts',
      rating: 4.9,
      deliveryTime: '15-30 min',
      deliveryFee: 1.99,
      minimumOrder: 5.0,
      image:
        'https://kzmkxsodp5ri9jc22k4a.lite.vusercontent.net/placeholder.svg?height=200&width=300',
      featured: false,
      address: '12 High Street, Truro, Cornwall TR1 2AB',
      description:
        'Authentic Cornish pasties made with locally sourced ingredients. Family recipe passed down through generations.',
      reviewCount: 100,
      menu: [
        {
          name: 'Ice Cream',
          items: [
            {
              id: '27',
              name: 'Cornish Vanilla',
              description: 'Rich vanilla ice cream with clotted cream',
              price: 3.5,
              image:
                'https://kzmkxsodp5ri9jc22k4a.lite.vusercontent.net/placeholder.svg?height=100&width=100',
            },
            {
              id: '28',
              name: 'Strawberry Ripple',
              description: 'Fresh strawberry ice cream with ripple',
              price: 3.75,
              image:
                'https://kzmkxsodp5ri9jc22k4a.lite.vusercontent.net/placeholder.svg?height=100&width=100',
            },
            {
              id: '29',
              name: 'Chocolate Fudge',
              description: 'Decadent chocolate with fudge pieces',
              price: 4.0,
              image:
                'https://kzmkxsodp5ri9jc22k4a.lite.vusercontent.net/placeholder.svg?height=100&width=100',
            },
          ],
        },
        {
          name: 'Cakes & Pastries',
          items: [
            {
              id: '30',
              name: 'Cornish Saffron Cake',
              description: 'Traditional saffron cake with currants',
              price: 4.5,
              image:
                'https://kzmkxsodp5ri9jc22k4a.lite.vusercontent.net/placeholder.svg?height=100&width=100',
            },
            {
              id: '31',
              name: 'Cream Tea',
              description: 'Scones with clotted cream and jam',
              price: 5.99,
              image:
                'https://kzmkxsodp5ri9jc22k4a.lite.vusercontent.net/placeholder.svg?height=100&width=100',
            },
          ],
        },
      ],
    },
  ];
}
