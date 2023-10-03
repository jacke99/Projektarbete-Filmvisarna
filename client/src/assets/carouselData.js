import {
  theCreatorPoster,
  smsPoster,
  killersPoster,
  pastLivesPoster,
  aLittleLifePoster,
  openheimerPoster,
  prinsessanMononokePoster,
  dumbMoneyPoster,
} from "../assets/index.js";

//Måste finnas för React-Multi-Carousel
export const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: Infinity, min: 1280 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 1280, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 640 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 2,
  },
};

//Data som används för att mappa ut items(movieCards) till React-Multi-Carousel
export const movieData = [
  {
    id: 1,
    title: "A little life",
    img: aLittleLifePoster,
    alt: "picture from movie A little life ",
  },
  {
    id: 2,
    title: "Killers of the Flower Moon",
    img: killersPoster,
    alt: "picture from movie Killers of the Flower Moon ",
  },
  {
    id: 3,
    title: "Passed lives",
    img: pastLivesPoster,
    alt: "picture from movie Passed Lives ",
  },
  {
    id: 4,
    title: "SMS",
    img: smsPoster,
    alt: "picture from movie SMS ",
  },
  {
    id: 5,
    title: "The Creator",
    img: theCreatorPoster,
    alt: "picture from movie The Creator ",
  },
  {
    id: 6,
    title: "Dumb Money",
    img: dumbMoneyPoster,
    alt: "picture from movie Dumb Money",
  },
  {
    id: 7,
    title: "Openheimer",
    img: openheimerPoster,
    alt: "picture from movie Openheimer",
  },
  {
    id: 8,
    title: "Prinsessan Mononoke",
    img: prinsessanMononokePoster,
    alt: "picture from movie Prinsessan Mononoke",
  },
];
