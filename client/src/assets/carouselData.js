import {
  theCreatorPoster,
  smsPoster,
  killersPoster,
  pastLivesPoster,
  aLittleLifePoster,
} from "../assets/index.js";
export const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};

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
    title: "The Creator",
    img: theCreatorPoster,
    alt: "picture from movie The Creator ",
  },
  {
    id: 7,
    title: "The Creator",
    img: theCreatorPoster,
    alt: "picture from movie The Creator ",
  },
  {
    id: 8,
    title: "The Creator",
    img: theCreatorPoster,
    alt: "picture from movie The Creator ",
  },
];
