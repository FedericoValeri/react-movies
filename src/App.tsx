import { useEffect, useState } from "react";
import { landingPageDTO, movieDTO } from "./movies/movies.module";
import MoviesList from "./movies/MoviesList";

function App() {
  const [movies, setMovies] = useState<landingPageDTO>({});
  useEffect(() => {
    const timerId = setTimeout(() => {
      setMovies({
        inTheaters: [
          {
            id: 1,
            title: "Spider-Man: Far From Home",
            poster:
              "https://upload.wikimedia.org/wikipedia/en/b/bd/Spider-Man_Far_From_Home_poster.jpg",
          },
          {
            id: 2,
            title: "Luca",
            poster: "https://m.media-amazon.com/images/I/51mcvFjV-aS._AC_.jpg",
          },
        ],
        upcomingReleases: [
          {
            id: 3,
            title: "Soul",
            poster:
              "https://i.etsystatic.com/18242346/r/il/54bef3/2802148755/il_570xN.2802148755_7wzt.jpg",
          },
        ],
      });
    }, 1000);
    return () => clearTimeout(timerId);
  });

  return (
    <>
      <h3>In Theaters</h3>
      <MoviesList movies={movies.inTheaters} />
      <h3>Upcoming Releases</h3>
      <MoviesList movies={movies.upcomingReleases} />
    </>
  );
}

export default App;
