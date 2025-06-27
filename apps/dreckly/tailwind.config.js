module.exports = {
  content: [
    './{src,pages,components,app}/**/*.{ts,tsx,js,jsx,html}',
    '!./{src,pages,components,app}/**/*.{stories,spec}.{ts,tsx,js,jsx,html}',
    '../../libs/**/*.{ts,tsx,js,jsx,html}',
    '!../../libs/**/*.{stories,spec}.{ts,tsx,js,jsx,html}'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
