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
        "auto-fit-mobile": "repeat(auto-fill, minmax(max(15rem, 20rem), 1fr))",
        "auto-fit-sm": "repeat(auto-fill, minmax(max(15rem, 20rem), 1fr))",
        "auto-fit-lg": "repeat(auto-fill, minmax(max(25rem, 28rem), 1fr))",
      },
      objectPosition: {
        "center-top": "center top",
        "center-top-20": "center top 20%",
      },
    },
  },
  plugins: [],
};
