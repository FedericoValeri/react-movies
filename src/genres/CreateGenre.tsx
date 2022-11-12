import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { urlGenres } from "../endpoint";
import DisplayErrors from "../utils/DisplayErrors";
import GenreForm from "./GenreForm";
import { genreCreateDTO } from "./genres.model";

export default function CreateGenre() {
  const history = useHistory();
  const [errors, setErrors] = useState<string[]>([]);
  async function create(genre: genreCreateDTO) {
    await axios
      .post(urlGenres, genre)
      .then(() => {
        history.push("/genres");
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
      <h3>Create Genre</h3>
      <DisplayErrors errors={errors} />
      <GenreForm
        model={{ name: "" }}
        onSubmit={async (value) => {
          await create(value);
        }}
      />
    </>
  );
}
