import { footerIconFB, footerIconGH, footerIconIG, footerIconIN } from "../assets";

export default function Footer() {
  return (
    <footer className="px-3 bottom-0 w-full bg-[#363636] text-white">
      <div className="flex justify-between pt-4">
        <div className="flex justify-start font-semibold tracking-widest">
          <h6 className="pl-1 md:text-xl lg:text-2xl">Filmvisarna</h6>
        </div>
        <div className="flex gap-4 md:gap-6 lg:gap-8 mt-1 lg:mb-4 lg:mr-2">
          <img src={footerIconFB} alt="FB_icon" className="h-3 w-3 lg:h-6 lg:w-6 md:h-4 md:w-4" />
          <img src={footerIconGH} alt="GH_icon" className="h-3 w-3 lg:h-6 lg:w-6 md:h-4 md:w-4" />
          <img src={footerIconIG} alt="IG_icon" className="h-3 w-3 lg:h-6 lg:w-6 md:h-4 md:w-4" />
          <img src={footerIconIN} alt="TW_icon" className="h-3 w-3 lg:h-6 lg:w-6 md:h-4 md:w-4" />
        </div>
      </div>
      <div className="flex w-full justify-end text-xs  mr-3.5 mb-0 mt-3 lg:absolute lg:right-1">
        <span>© 2023 Copyright:</span>
        <a className="ml-1 mb-1 font-semibold tracking-widest text-white" href="/">
          Filmvisarna
        </a>
      </div>
      <div className="flex justify-around border-t-2 p-3 md:text-xl text-xs gap-1 border-gray-400 lg:justify-start lg:gap-10">
        <p className="">
          <a href="#!" className="">
            Om oss
          </a>
        </p>
        <p className="">
          <a href="#!" className="">
            Kontakta oss
          </a>
        </p>
        <p className="">
          <a href="#!" className="">
            Villkor
          </a>
        </p>
        <p>
          <a href="#!" className="">
            Nyhetsbrev
          </a>
        </p>
      </div>
    </footer>
  );
}
