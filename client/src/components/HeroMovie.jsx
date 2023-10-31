import { styles } from "../styles";

// eslint-disable-next-line react/prop-types
export default function MovieImgBlock({ movieImg}) {
 const path = `/img${movieImg}`
console.log(path)
  return (
    <section
      className={`relative mt-2 flex items-center justify-center bg-primary text-center`}
    >
      <img
        className="w-full object-cover object-center lg:h-[550px]"
        src={movieImg}
        alt="Img with main characters from Killers of the Flower Moon Movie"
      />
      <div className="translate-50-50 absolute left-1/2 top-1/2">
        <h2 className={`${styles.headerText}`}>29/9 28:00</h2>
        <h2 className={`${styles.subHeaderText}`}>
          Killers of the Flower Moon
        </h2>
        <p className="underline-offset-3 font-inconsolata text-gold underline  underline-offset-4 sm:text-[12px] md:text-[20px] lg:text-[25px]">
          Mer info {">"}
        </p>
      </div>
    </section>
  );
}
