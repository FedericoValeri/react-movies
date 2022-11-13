import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { urlGenres } from "../endpoint";
import DisplayErrors from "../utils/DisplayErrors";
import Loading from "../utils/Loading";
import GenreForm from "./GenreForm";
import { genreCreateDTO } from "./genres.model";

export default function EditGenre() {
  const { id }: any = useParams();
  const [genre, setGenre] = useState<genreCreateDTO>();
  const [errors, setErrors] = useState<string[]>([]);
  const history = useHistory();
  useEffect(() => {
    axios
      .get(`${urlGenres}/${id}`)
      .then((response: AxiosResponse<genreCreateDTO>) => {
        setGenre(response.data);
      });
  }, [id]);

  async function edit(genreToEdit: genreCreateDTO) {
    await axios
      .put(`${urlGenres}/${id}`, genreToEdit)
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
      <h3>Edit Genre</h3>
      <DisplayErrors errors={errors} />
      {genre ? (
        <GenreForm
          model={genre}
          onSubmit={async (value) => {
            // when the form is posted
            await edit(value);
          }}
        />
      ) : (
        <Loading />
      )}
    </>
  );
}
