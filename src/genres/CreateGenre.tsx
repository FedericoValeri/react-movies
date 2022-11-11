import axios from "axios";
import { useHistory } from "react-router-dom";
import { urlGenres } from "../endpoint";
import GenreForm from "./GenreForm";
import { genreCreateDTO } from "./genres.model";

export default function CreateGenre() {
  const history = useHistory();
  async function create(genre: genreCreateDTO) {
    try {
      await axios.post(urlGenres, genre);
      history.push("/genres");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <h3>Create Genre</h3>
      <GenreForm
        model={{ name: "" }}
        onSubmit={async (value) => {
          await create(value);
        }}
      />
    </>
  );
}
