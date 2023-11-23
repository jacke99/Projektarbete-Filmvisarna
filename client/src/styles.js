const styles = {
  //wrappers som används för att centrera innehåll. (Endast höger och vänster padding samt max-width)
  wrapper:
    "max-w-[1500px] mx-auto px-3 sm:px-8 md:px-8 lg:px-8 xl:px-10 2xl:px-16",
  navWrapper:
    "max-w-[1800px] mx-auto px-3 sm:px-8 md:px-8 lg:px-8 xl:px-16 2xl:px-16 py-3 sm:py-3 md:py-3 lg:py-4 ",

  //Styles för images & icons
  imgHeader:
    "w-full object-cover object-center-top h-[15rem] sm:h-[18rem] md:h-[25rem] lg:h-[35rem] xl:h-[40rem] 2xl:h-[60vh]",
  imgPoster: "",
  icons: "h-8 sm:h-10 md:h-10 lg:h-10 xl:h-10 2xl:h-10",

  //Padding för element)
  paddingY: "py-8 sm:py-6 md:py-14 lg:py-14 xl:py-16 2xl:py-16", //Padding uppe och nere
  paddingTop: "pt-8 sm:pt-12 md:pt-14 lg:pt-14 xl:pt-16 2xl:pt-16", //Padding uppe
  paddingBottom: "pb-8 sm:pb-6 md:pb-6 lg:pb-8 xl:pb-8 2xl:pb-10", //Padding uppe

  //Navigation text
  navText: "text-gold font-light text-2xl",

  //Hero text
  heroHeader:
    "font-medium text-[25px] sm:text-[30px] md:text-[30px] lg:text-[50px] xl:text-[60px] 2xl:text-[5vh] text-gold [text-shadow:1px_1px_2px_var(--tw-shadow-color)] shadow-black",
  heroSubHeader:
    "text-[20px] sm:text-[30px] md:text-[25px] lg:text-[35px] xl:text-[40px] 2xl:text-[3vh] text-gold [text-shadow:1px_1px_2px_var(--tw-shadow-color)] shadow-black",
  heroSubText:
    "text-[15px] sm:text-[18px] md:text-[20px] lg:text-[25px] xl:text-[28px] 2xl:text-[2.2vh] font-inconsolata text-gold underline underline-offset-4 [text-shadow:1px_1px_2px_var(--tw-shadow-color)] shadow-black",

  //Basic text ----- UNDER CONSTRUCTION -----
  headerText:
    "text-gold font-medium text-[25px] sm:text-[25px] md:text-[25px] lg:text-[30px] xl:text-[30px] 2xl:text-[40px]",
  subHeaderText:
    "text-white font-regular text-[20px] sm:text-[20px] md:text-[25px] lg:text-[27px] 2xl:text-[27px]",
  subText:
    "text-white font-regular font-inconsolata text-[16px] sm:text-[16px] md:text-[16px] lg:text-[20px] lg:text-[20px] 2xl:text-[20px]",
  bodyText:
    "text-white pt-1 font-regular text-[16px] sm:text-[16px] md:text-[16px] lg:text-[18px] xl:text-[18px] 2xl:text-[18px]",

  //ScreeningCard ----- UNDER CONSTRUCTION -----
  // * movieTitle
  // * movieTime&Date
  // * movieGeneralInfo

  //MovieCard ----- BEHÖVS EJ?-----
  movieTitle:
    "text-white-100 font-inconsolata  sm:text-[15px] md:text-[20px] lg:text-[25px]",
  trailerTitle:
    "text-gold text-[25px] sm:text-[25px] md:text-[30px] lg:text-[35px]",
  trailerSubTitle: "text-gold sm:text-[13px] md:text-[18px] lg:text-[20px]",
  movieDescInfo:
    "text-white-100 sm:text-[12px] md:text-[15px] lg:text-[20px] flex flex-col py-2",

  //buttons & Inputs ----- UNDER CONSTRUCTION -----
  regInputs:
    ": bg-white-500 shadow appearance-none border rounded-lg  py-3 px-3 m-2 my-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ",
  inputStyle:
    "w-full border border-gray-300 rounded-md p-1.5 text-sm text-gray-400 my-2 h-8",
  centerAbsolutePos:
    "absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2",
  buttonStyle:
    "hover:bg-white active:bg-gold bg-gold text-black-100 rounded-md px-4 text-sm py-2 md:px-5 md:py-2 md:text-base lg:text-lg lg:h-12",
};

export { styles };
