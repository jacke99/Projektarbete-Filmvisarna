import { killersPoster } from "../assets/index.js";

/* eslint-disable react/prop-types */

export default function MovieCard({ title, img, alt }) {
  return (
    <div className=" m-8 m-auto max-w-xs text-white ">
      <img
        className=" h-96 w-full rounded-lg object-cover"
        src={img}
        alt={alt}
      />
      <h2 className="m-1.5 font-inconsolata text-xl">{title}</h2>
    </div>
  );
}
