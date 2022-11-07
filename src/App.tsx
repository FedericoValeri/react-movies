import React from "react";
import Movie from "./movies/Movie";
import { movieDTO } from "./movies/movies.module";

function App() {
  const testMovie: movieDTO = {
    id: 1,
    title: "Spider-Man: Far From Home",
    poster:
      "https://upload.wikimedia.org/wikipedia/en/b/bd/Spider-Man_Far_From_Home_poster.jpg",
  };

  return (
    <>
      <Movie {...testMovie} />
    </>
  );
}

export default App;
