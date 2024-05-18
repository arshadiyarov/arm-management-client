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
        primary: "rgb(var(--clr-primary))",
        "primary-hover": "rgb(var(--clr-primary-hover))",
        "primary-active": "rgb(var(--clr-primary-active))",
        secondary: "rgb(var(--clr-secondary))",
        "secondary-hover": "rgb(var(--clr-secondary-hover))",
        "secondary-active": "rgb(var(--clr-secondary-active))",
        black: "rgb(var(--clr-type-black))",
        gray: "rgb(var(--clr-type-gray))",
        red: "rgb(var(--clr-type-red))",
        "bg-primary": "rgb(var(--clr-bg-primary))",
        "bg-secondary": "rgb(var(--clr-bg-secondary))",
        "border-black": "rgb(var(--clr-border-black))",
        "border-white": "rgb(var(--clr-border-white))",
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
