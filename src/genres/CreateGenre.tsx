import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import Button from "../utils/Button";
import * as Yup from "yup";
import TextField from "../forms/TextField";

export default function CreateGenre() {
  return (
    <>
      <h3>Create Genre</h3>

      <Formik
        initialValues={{
          name: "",
        }}
        onSubmit={(value) => {
          // when the form is posted
          console.log(value);
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .required("This field is required")
            .firstLetterUppercase(),
        })}
      >
        <Form>
          <TextField field="name" displayName="Name" />
          <Button type="submit">Save Changes</Button>
          <Link className="btn btn-secondary" to="/genres">
            Cancel
          </Link>
        </Form>
      </Formik>
    </>
  );
}
