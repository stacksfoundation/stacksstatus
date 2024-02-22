import type { Config } from 'tailwindcss';

const config: Config = {
  theme: {
    fontFamily: {
      sans: ['Arial'],
    },
  },
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './app/*.{js,ts,jsx,tsx,mdx}'],
};
export default config;
