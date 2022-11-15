import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { urlMovieTheaters } from "../endpoint";
import DisplayErrors from "../utils/DisplayErrors";
import { movieTheaterCreateDTO } from "./movieTheater.model";
import MovieTheaterForm from "./MovieTheaterForm";

export default function CreateMovieTheater() {
  const history = useHistory();
  const [errors, setErrors] = useState<string[]>([]);

  async function create(movieTheater: movieTheaterCreateDTO) {
    await axios
      .post(urlMovieTheaters, movieTheater)
      .then(() => {
        history.push("/movietheaters");
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
      <h3>Create Movie Theater</h3>
      <DisplayErrors errors={errors} />
      <MovieTheaterForm
        model={{ name: "" }}
        onSubmit={async (values) => await create(values)}
      />
    </>
  );
}
