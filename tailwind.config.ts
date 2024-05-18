import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "*/app/**/*.{js,ts,jsx,tsx,mdx}",
    "*/_pages/**/*.{js,ts,jsx,tsx,mdx}",
    "*/processes/**/*.{js,ts,jsx,tsx,mdx}",
    "*/widgets/**/*.{js,ts,jsx,tsx,mdx}",
    "*/features/**/*.{js,ts,jsx,tsx,mdx}",
    "*/shared/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--clr-primary)",
        "primary-hover": "var(--clr-primary-hover)",
        "primary-active": "var(--clr-primary-active)",
        secondary: "var(--clr-secondary)",
        "secondary-hover": "var(--clr-secondary-hover)",
        "secondary-active": "var(--clr-secondary-active)",
        black: "var(--clr-types-black)",
        gray: "var(--clr-types-gray)",
        "bg-primary": "var(--clr-bg-primary)",
        "bg-secondary": "var(--clr-bg-secondary)",
        "border-black": "var(--clr-border-black)",
        "border-white": "var(--clr-border-white)",
      },
      fontSize: {
        xl: "var(--sz-xl)",
        lg: "var(--sz-lg)",
        md: "var(--sz-md)",
        sm: "var(--sz-sm)",
      },
      lineHeight: {
        xl: "var(--lnh-xl)",
        lg: "var(--lnh-lg)",
        md: "var(--lnh-md)",
        sm: "var(--lnh-sm)",
      },
      transitionProperty: {
        default: "var(--transition-default)",
      },
      borderRadius: {
        sm: "var(--r-sm)",
        md: "var(--r-md)",
        lg: "var(--r-lg)",
      },
      padding: {
        sm: "var(--p-sm)",
        md: "var(--p-md)",
        lg: "var(--p-lg)",
        "icon-sm": "var(--p-icon-sm)",
        "icon-md": "var(--p-icon-md)",
        "icon-lg": "var(--p-icon-lg)",
      },
      width: {
        navbar: "var(--w-navbar)",
        "navbar-expanded": "var(--w-navbar-expanded)",
        "login-form": "var(--w-login-form)",
      },
    },
  },
  plugins: [],
};
export default config;
