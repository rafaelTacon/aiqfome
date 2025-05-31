module.exports = {
  content: ['./src/**/*.{ts,tsx}', './app/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand-purple': '#7B1FA2',
        'brand-teal': '#00A296',
        'background-default': '#F2FAFA',
        'background-container97': '#F5F6F9',
        'background-container95': '#EEF0F5',
        'success': '#02A117',
        'neutrals-0': '#FFFFFF',
        'neutrals-50': '#F5F6F9',
        'neutrals-100': '#EEF0F5',
        'neutrals-500': '#6D6F73',
        'neutrals-700': '#393A3C',
        'neutrals-900': '#202326',
        // 'purple-700': '#580F78',
      },
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
