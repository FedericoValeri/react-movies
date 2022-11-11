import { actorMovieDTO } from "../actors/actors.model";
import { genreDTO } from "../genres/genres.model";
import { movieTheaterDTO } from "../movieTheaters/movieTheater.model";
import MovieForm from "./MovieForm";

export default function EditMovie() {
  const selectedGenres: genreDTO[] = [{ id: 1, name: "Comedy" }];
  const nonSelectedGenres: genreDTO[] = [{ id: 2, name: "Drama" }];
  const selectedMovieTheaters: movieTheaterDTO[] = [
    { id: 1, name: "Giometti" },
  ];
  const nonSelectedMovieTheaters: movieTheaterDTO[] = [
    { id: 2, name: "Uci Cinemas" },
  ];
  const selectedActors: actorMovieDTO[] = [
    {
      id: 1,
      name: "Tom Holland",
      character: "Peter Parker",
      picture:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Tom_Holland_by_Gage_Skidmore.jpg/220px-Tom_Holland_by_Gage_Skidmore.jpg",
    },
  ];

  return (
    <>
      <h3>Edit Movie</h3>
      <MovieForm
        model={{
          title: "Toy Story",
          inTheaters: true,
          trailer: "url",
          releaseDate: new Date("2019-01-01T00:00:00"),
        }}
        onSubmit={(values) => console.log(values)}
        selectedGenres={selectedGenres}
        nonSelectedGenres={nonSelectedGenres}
        selectedMovieTheaters={selectedMovieTheaters}
        nonSelectedMovieTheaters={nonSelectedMovieTheaters}
        selectedActors={selectedActors}
      />
    </>
  );
}
