import { killersPoster, aLittleLifePoster, pastLivesPoster, smsPoster, theCreatorPoster } from "../assets";

export default function Movies() {
  return (
    <div className="px-8">
      <div className="mt-28 text-lg text-gold">
        <h1>Våra Filmer</h1>
      </div>
    <div>
       <div className="max-w-full p-6 flex items-center justify-between md:justify-start lg:justify-start md:px-20 lg:px-96 border-t-2 border-gold">
      <img
        src={killersPoster}
        alt="movie poster from Killers of the flower moon"
        className="w-34 h-48 rounded-lg border-2 border-gold "
      />
      <div className="text-white-100 flex flex-col lg:px-6 md:px-6 pl-6">
        <h2 className="text-base font-extra-bold">The Creator</h2>
        <p className="font-inconsolata text-xs border-b-2">Sifi, drama</p>
        <p className="text-xs flex-col pt-1">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam facere totam tenetur omnis consequuntur vero ipsum, reprehenderit molestiae a quae illum esse quo nulla blanditiis voluptatibus amet eius? Veritatis, culpa.</p>
      </div>
    </div>

      <div className="max-w-full p-6 flex items-center justify-between md:justify-start lg:justify-start md:px-20 lg:px-96 border-t-2 border-gold">
      <img
        src={aLittleLifePoster}
        alt="movie poster from Killers of the flower moon"
        className="w-34 h-48 rounded-lg border-2 border-gold"
      />
      <div className="text-white-100 flex flex-col lg:px-6 md:px-6 pl-6 ">
        <h2 className="text-base font-extra-bold">The Creator</h2>
        <p className="font-inconsolata text-xs border-b-2">Sifi, drama</p>
        <p className="text-xs pt-1">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas accusantium recusandae animi placeat sint, similique corporis ipsa voluptates alias, temporibus, illo impedit perspiciatis facilis debitis minima repellendus dicta enim eius.</p>
      </div>
      </div>
    <div className="max-w-full p-6 flex items-center justify-between md:justify-start lg:justify-start md:px-20 lg:px-96 border-t-2 border-gold">
      <img
        src={pastLivesPoster}
        alt="movie poster from Killers of the flower moon"
        className="w-34 h-48 rounded-lg border-2 border-gold"
      />
      <div className="text-white-100 flex flex-col lg:px-6 md:px-6 pl-6">
        <h2 className="text-base font-extra-bold">The Creator</h2>
        <p className="font-inconsolata text-xs border-b-2">Sifi, drama</p>
        <p className="text-xs pt-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, porro magnam. Suscipit culpa excepturi vel est, beatae placeat delectus, ipsa cupiditate reprehenderit blanditiis a alias magni numquam autem! Iste, iusto.</p>
      </div>
    </div>
    <div className="max-w-full p-6 flex items-center justify-between md:justify-start lg:justify-start md:px-20 lg:px-96 border-t-2 border-gold">
      <img
        src={smsPoster}
        alt="movie poster from Killers of the flower moon"
        className="w-34 h-48 rounded-lg border-2 border-gold"
      />
      <div className="text-white-100 flex flex-col lg:px-6 md:px-6 pl-6">
        <h2 className="text-base font-extra-bold">The Creator</h2>
        <p className="font-inconsolata text-xs border-b-2">Sifi, drama</p>
        <p className="text-xs pt-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure minus ut enim quam necessitatibus nostrum illo commodi quia voluptas beatae hic quos qui esse recusandae possimus, id temporibus vero aut?</p>
      </div>
    </div>
    <div className="max-w-full p-6 flex items-center justify-between md:justify-start lg:justify-start md:px-20 lg:px-96 border-t-2 border-gold">
      <img
        src={theCreatorPoster}
        alt="movie poster from Killers of the flower moon"
        className="w-34 h-48 rounded-lg border-2 border-gold"
      />
      <div className="text-white-100 flex flex-col lg:px-6 md:px-6 pl-6">
        <h2 className="text-base font-extra-bold">The Creator</h2>
        <p className="font-inconsolata text-xs border-b-2">Sifi, drama</p>
        <p className="text-xs pt-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, nostrum blanditiis quae reiciendis quasi ex minus ratione delectus incidunt provident enim quisquam tempora tempore consequuntur magnam voluptates impedit natus iste.</p>
      </div>
    </div>
    </div>
    </div>
  )
}
