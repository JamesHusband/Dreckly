/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../libs/shared/ui-kit/src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../libs/features/cart/src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../libs/features/restaurants/src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../libs/features/home/src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../libs/features/menu/src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../libs/shared/layout/src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../apps/dreckly/src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}; 