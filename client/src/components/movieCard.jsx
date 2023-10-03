/* eslint-disable react/prop-types */

export default function MovieCard({ title, img, alt }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <img
        className="sm: h-[222px] w-[150px] rounded-lg object-cover object-center md:h-[252px] md:w-[170px] lg:h-[296px] lg:w-[200px]"
        src={img}
        alt={alt}
      />

      <h2
        className="lg:text-l
       text-s w-[150px] font-inconsolata text-white lg:w-[200px] "
      >
        {title}
      </h2>
    </div>
  );
}

{
  /* <div className=" flex flex-col items-center justify-center gap-3">
  <img
    className=" h-[296px] w-[200px] rounded-lg object-cover object-center"
    src={img}
    alt={alt}
  />

  <h2 className="text-l w-[200px] font-inconsolata text-white">{title}</h2>
</div>; */
}
