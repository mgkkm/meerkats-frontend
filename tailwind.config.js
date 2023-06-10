module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        mkBg: '#f6f6f6',
        mkOrange: '#f96400',
        mkDarkOrange: '#e35c02',
        mkBlack: '#000',
        mkDarkGray: '#333',
        mkGray: '#707070',
        mkLightGray: '#D9D9D9',
        mkKakao: '#ffe80f',
        mkNaver: '#19c900',
      },
      container: {
        center: 'true',
      },
    },
    screens: {
      xl: '1280px',
      lg: '1024px',
      md: '768px',
      sm: '640px',
      xs: '360px',
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light'],
  },
};
