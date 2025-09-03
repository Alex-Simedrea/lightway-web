import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/(app)/analytics/page.tsx',
    './app/(app)/lights/page.tsx'
  ],
  theme: {
    extend: {
      fontFamily: {
        onest: ['var(--font-onest)'],
      },
    },
  },
  plugins: [],
};

export default config;
