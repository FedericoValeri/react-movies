import { urlMovieTheaters } from "../endpoint";
import EditEntity from "../utils/EditEntity";
import { movieTheaterCreateDTO, movieTheaterDTO } from "./movieTheater.model";
import MovieTheaterForm from "./MovieTheaterForm";

export default function EditMovieTheater() {
  return (
    <EditEntity<movieTheaterCreateDTO, movieTheaterDTO>
      url={urlMovieTheaters}
      entityName="Movie Theater"
      indexURL="/movietheaters"
    >
      {(movieTheater, edit) => (
        <MovieTheaterForm
          model={movieTheater}
          onSubmit={async (values) => await edit(values)}
        />
      )}
    </EditEntity>
  );
}
