import Movie from "./Movie";
import { movieDTO } from "./movies.module";
import css from "./MoviesList.module.css";

export default function MoviesList(props: moviesListProps) {
  return (
    <div className={css.div}>
      {props.movies.map((movie) => (
        <Movie {...movie} key={movie.id} />
      ))}
    </div>
  );
}

interface moviesListProps {
  movies: movieDTO[];
}
