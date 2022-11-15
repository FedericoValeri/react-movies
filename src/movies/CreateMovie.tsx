import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { urlMovies } from "../endpoint";
import { genreDTO } from "../genres/genres.model";
import { movieTheaterDTO } from "../movieTheaters/movieTheater.model";
import DisplayErrors from "../utils/DisplayErrors";
import { convertMovieToFormData } from "../utils/formDataUtils";
import Loading from "../utils/Loading";
import MovieForm from "./MovieForm";
import { movieCreateDTO, moviesPostGetDTO } from "./movies.model";

export default function CreateMovie() {
  const [nonSelectedGenres, setNonSelectedGenres] = useState<genreDTO[]>([]);
  const [nonSelectedMovieTheaters, setNonSelectedMovieTheaters] = useState<
    movieTheaterDTO[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<string[]>([]);
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`${urlMovies}/postget`)
      .then((response: AxiosResponse<moviesPostGetDTO>) => {
        setNonSelectedGenres(response.data.genres);
        setNonSelectedMovieTheaters(response.data.movieTheaters);
        setLoading(false);
      });
  }, []);

  async function create(movie: movieCreateDTO) {
    const formData = convertMovieToFormData(movie);
    await axios({
      method: "post",
      url: urlMovies,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        history.push(`/movie/${response.data}`);
      })
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          setErrors(error.response.data);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
      });
  }

  return (
    <>
      <h3>Create Movie</h3>
      <DisplayErrors errors={errors} />
      {loading ? (
        <Loading />
      ) : (
        <MovieForm
          model={{ title: "", inTheaters: false, trailer: "" }}
          onSubmit={async (values) => await create(values)}
          selectedGenres={[]}
          nonSelectedGenres={nonSelectedGenres}
          selectedMovieTheaters={[]}
          nonSelectedMovieTheaters={nonSelectedMovieTheaters}
          selectedActors={[]}
        />
      )}
    </>
  );
}
