import GenericList from "../utils/GenericList";
import Movie from "./Movie";
import { movieDTO } from "./movies.module";
import css from "./MoviesList.module.css";

export default function MoviesList(props: moviesListProps) {
  return (
    <GenericList list={props.movies}>
      <div className={css.div}>
        {props.movies?.map((movie) => (
          <Movie {...movie} key={movie.id} />
        ))}
      </div>
    </GenericList>
  );
}

interface moviesListProps {
  movies?: movieDTO[];
}
