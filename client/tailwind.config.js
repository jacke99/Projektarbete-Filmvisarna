/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#050816",
        footerGrey: "#363636",
        gold: "#DACA88",
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },
      fontFamily: {
        inconsolata: ["Inconsolata", "monospace"],
      },
      gridTemplateColumns: {
        "auto-fit-lg": "repeat(auto-fit, minmax(30rem, 1fr))",
        "auto-fit-mobile": "repeat(auto-fit, minmax(20rem, 1fr))",
        "auto-fit-sm": "repeat(auto-fit, minmax(25rem, 1fr))",
      },
    },
  },
  plugins: [],
};
