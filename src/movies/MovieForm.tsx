import { Form, Formik, FormikHelpers, FormikValues } from "formik";
import { movieCreateDTO } from "./movies.model";
import * as Yup from "yup";
import Button from "../utils/Button";
import { Link } from "react-router-dom";
import TextField from "../forms/TextField";
import DateField from "../forms/DateField";
import ImageField from "../forms/ImageField";
import CheckboxField from "../forms/CheckboxField";

export default function MovieForm(props: movieFormProps) {
  return (
    <Formik
      initialValues={props.model}
      onSubmit={props.onSubmit}
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
}
