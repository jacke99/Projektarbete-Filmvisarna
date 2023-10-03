import { killersPoster, pastLivesPoster, smsPoster } from "../assets";
export default function BookMovieHero() {
  return (
    <>
      <div className="flex max-w-full items-center justify-between p-4 md:justify-start md:px-20 lg:justify-start lg:px-96">
        <img
          src={pastLivesPoster}
          alt="movie poster from Killers of the flower moon"
          className="w-34 h-48 rounded-lg"
        />
        <div className="flex flex-col text-white-100 md:px-6 lg:px-6">
          <p className="text-xs">Idag 25/9</p>
          <h2 className="font-extra-bold text-base">The Creator</h2>
          <p className="font-inconsolata text-xs">Sifi, drama</p>
          <p className="text-xs">1 tim 33min | 11 år</p>
        </div>
        <button className="rounded-md bg-gold p-1 px-4 text-black-100 md:ml-auto lg:ml-auto">
          Boka
        </button>
      </div>

      <div className="flex max-w-full items-center justify-between p-4 md:justify-start md:px-20 lg:justify-start lg:px-96">
        <img
          src={killersPoster}
          alt="movie poster from Killers of the flower moon"
          className="w-34 h-48 rounded-lg"
        />
        <div className="flex flex-col text-white-100 md:px-6 lg:px-6">
          <p className="text-xs">Idag 25/9</p>
          <h2 className="font-extra-bold text-base">The Creator</h2>
          <p className="font-inconsolata text-xs">Sifi, drama</p>
          <p className="text-xs">1 tim 33min | 11 år</p>
        </div>
        <button className="rounded-md bg-gold p-1 px-4 text-black-100 md:ml-auto lg:ml-auto">
          Boka
        </button>
      </div>

      <div className="flex max-w-full items-center justify-between p-4 md:justify-start md:px-20 lg:justify-start lg:px-96">
        <img
          src={smsPoster}
          alt="movie poster from Killers of the flower moon"
          className="w-34 h-48 rounded-lg"
        />
        <div className="flex flex-col text-white-100 md:px-6 lg:px-6">
          <p className="text-xs">Idag 25/9</p>
          <h2 className="font-extra-bold text-base">The Creator</h2>
          <p className="font-inconsolata text-xs">Sifi, drama</p>
          <p className="text-xs">1 tim 33min | 11 år</p>
        </div>
        <button className="rounded-md bg-gold p-1 px-4 text-black-100 md:ml-auto lg:ml-auto">
          Boka
        </button>
      </div>
    </>
  );
}
