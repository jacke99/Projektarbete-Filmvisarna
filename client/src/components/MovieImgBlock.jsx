import { styles } from "../styles.js";

// eslint-disable-next-line react/prop-types
export default function MovieImgBlock({ movieImg }) {
  return (
    <section className="relative flex items-center justify-center text-center">
      <img
        src={movieImg}
        alt="Img with main characters from Killers of the Flower Moon Movie"
      />
      <div className="translate-50-50 absolute left-1/2 top-1/2">
        <h2>29/9 28:00</h2>
        <h2>Killers of the Flower Moon</h2>
        <p>Se trailer {">"}</p>
      </div>
    </section>
  );
}
