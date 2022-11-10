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
      />
    </>
  );
}
