import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'home-background': "url('images/background.svg')",
        'form-background': "url('images/formBackground.svg')",
      },
      fontFamily: {
        'metropolis': ['Metropolis-Medium', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
