import { Form, Formik, FormikHelpers } from "formik";
import { movieCreateDTO } from "./movies.model";
import Button from "../utils/Button";
import { Link } from "react-router-dom";
import TextField from "../forms/TextField";
import DateField from "../forms/DateField";
import ImageField from "../forms/ImageField";
import CheckboxField from "../forms/CheckboxField";
import MultipleSelector, {
  multipleSelectorModel,
} from "../forms/MultipleSelector";
import { useState } from "react";
import * as Yup from "yup";
import { genreDTO } from "../genres/genres.model";
import { movieTheaterDTO } from "../movieTheaters/movieTheater.model";
import TypeaheadActor from "../forms/TypeaheadActors";
import { actorMovieDTO } from "../actors/actors.model";
import MarkdownField from "../forms/MarkdownField";

export default function MovieForm(props: movieFormProps) {
  const [selectedGenres, setSelectedGenres] = useState(
    mapToModel(props.selectedGenres)
  );
  const [nonSelectedGenres, setNonSelectedGenres] = useState(
    mapToModel(props.nonSelectedGenres)
  );

  const [selectedMovieTheaters, setSelectedMovieTheaters] = useState(
    mapToModel(props.selectedMovieTheaters)
  );
  const [nonSelectedMovieTheaters, setNonSelectedMovieTheaters] = useState(
    mapToModel(props.nonSelectedMovieTheaters)
  );

  const [selectedActors, setSelectedActors] = useState(props.selectedActors);

  function mapToModel(
    items: { id: number; name: string }[]
  ): multipleSelectorModel[] {
    return items.map((item) => {
      return { key: item.id, value: item.name };
    });
  }

  return (
    <Formik
      initialValues={props.model}
      onSubmit={(values, actions) => {
        values.genresIds = selectedGenres.map((item) => item.key);
        values.movieTheatersIds = selectedMovieTheaters.map((item) => item.key);
        values.actors = selectedActors;
        props.onSubmit(values, actions);
      }}
      validationSchema={Yup.object({
        title: Yup.string()
          .required("This field is required")
          .firstLetterUppercase(),
      })}
    >
      {(formikProps) => (
        <Form>
          <TextField field="title" displayName="Title" />
          <CheckboxField field={"inTheaters"} displayName={"In Theaters"} />
          <TextField field="trailer" displayName="Trailer" />
          <DateField field="releaseDate" displayName="Release date" />
          <ImageField
            field="poster"
            displayName="Poster"
            imageURL={props.model.posterURL}
          />
          <MarkdownField displayName="Summary" field="summary" />
          <MultipleSelector
            displayName="Genres"
            selected={selectedGenres}
            nonSelected={nonSelectedGenres}
            onChange={(selected, nonSelected) => {
              setSelectedGenres(selected);
              setNonSelectedGenres(nonSelected);
            }}
          />
          <MultipleSelector
            displayName="Movie Theaters"
            selected={selectedMovieTheaters}
            nonSelected={nonSelectedMovieTheaters}
            onChange={(selected, nonSelected) => {
              setSelectedMovieTheaters(selected);
              setNonSelectedMovieTheaters(nonSelected);
            }}
          />
          <TypeaheadActor
            displayName="Actors"
            actors={selectedActors}
            onAdd={(actors) => {
              setSelectedActors(actors);
            }}
            onRemove={(actor) => {
              const actors = selectedActors.filter((a) => a !== actor);
              setSelectedActors(actors);
            }}
            listUI={(actor: actorMovieDTO) => (
              <>
                {actor.name} /
                <input
                  placeholder="Character"
                  type="text"
                  value={actor.character}
                  onChange={(e) => {
                    const index = selectedActors.findIndex(
                      (a) => a.id === actor.id
                    );
                    const actors = [...selectedActors];
                    actors[index].character = e.currentTarget.value;
                    setSelectedActors(actors);
                  }}
                />
              </>
            )}
          />
          <Button disabled={formikProps.isSubmitting} type="submit">
            Save Changes
          </Button>
          <Link className="btn btn-secondary" to="/movies">
            Cancel
          </Link>
        </Form>
      )}
    </Formik>
  );
}

interface movieFormProps {
  model: movieCreateDTO;
  onSubmit(values: movieCreateDTO, action: FormikHelpers<movieCreateDTO>): void;
  selectedGenres: genreDTO[];
  nonSelectedGenres: genreDTO[];
  selectedMovieTheaters: movieTheaterDTO[];
  nonSelectedMovieTheaters: movieTheaterDTO[];
  selectedActors: actorMovieDTO[];
}
