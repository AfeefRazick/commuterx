/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./*.{html,jsx}",
    "./src/*.{html,jsx}",
    "./src/**/**/*.{html,jsx}",
    "./src/**/**/**/*.{html,jsx}",
  ],
  theme: {
    screens: {
      sm: "600px",

      md: "768px",

      lg: "1024px",

      xl: "1280px",

      "2xl": "1536px",
    },
    extend: {
      colors: {
        accent: "#e11d48",
      },
      fontFamily: {
        quicksand: ["Quicksand", "sans-serif"],
        searchBar: ["Poppins", "sans-serif"],
        manrope: ["Manrope", "sans-serif"],
        lato: ["Lato", "sans-serif"],
        bebas: ["Bebas Neue", "sans-serif"],
      },
      width: {
        searchBar: "94%",
        searchBarSmall: "80%",
        searchBarMedium: "450px",
        searchBarLarge: "500px",
      },
      height: {
        searchBar: "50px",
      },

      zIndex: {
        searchBar: "5000",
        loadingScreen: "6000",
      },
    },
  },
  plugins: [],
};
