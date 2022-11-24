import { movieDTO } from "./movies.model";
import css from "./movie.module.css";
import { Link } from "react-router-dom";
import Button from "../utils/Button";
import customConfirm from "../utils/customConfirm";
import axios from "axios";
import { urlMovies } from "../endpoint";
import { useContext } from "react";
import AlertContext from "../utils/AlertContext";

export default function Movie(props: movieDTO) {
  const buildLink = () => `/movie/${props.id}`;
  const customAlert = useContext(AlertContext);
  function deleteMovie() {
    axios.delete(`${urlMovies}/${props.id}`).then(() => {
      customAlert();
    });
  }
  return (
    <div className={css.div}>
      <Link to={buildLink()}>
        <img src={props.poster} alt="Poster" />
      </Link>
      <p>
        <Link to={buildLink()}>{props.title}</Link>
      </p>
      <div>
        <Link
          to={`/movies/edit/${props.id}`}
          style={{ marginRight: "1rem" }}
          className="btn btn-info"
        >
          Edit
        </Link>
        <Button
          onClick={() => customConfirm(() => deleteMovie())}
          className="btn btn-danger"
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
