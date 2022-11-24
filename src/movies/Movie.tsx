import { movieDTO } from "./movies.model";
import css from "./movie.module.css";
import { Link } from "react-router-dom";

export default function Movie(props: movieDTO) {
  const buildLink = () => `/movie/${props.id}`;

  return (
    <div className={css.div}>
      <Link to={buildLink()}>
        <img src={props.poster} alt="Poster" />
      </Link>
      <p>
        <Link to={buildLink()}>{props.title}</Link>
      </p>
    </div>
  );
}
