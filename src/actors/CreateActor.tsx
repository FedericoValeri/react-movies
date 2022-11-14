import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { urlActors } from "../endpoint";
import DisplayErrors from "../utils/DisplayErrors";
import { convertActorToFormData } from "../utils/formDataUtils";
import ActorForm from "./ActorForm";
import { actorCreateDTO } from "./actors.model";

export default function CreateActor() {
  const [errors, setErrors] = useState<string[]>([]);
  const history = useHistory();

  async function create(actor: actorCreateDTO) {
    const formData = convertActorToFormData(actor);
    await axios({
      method: "post",
      url: urlActors,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(() => {
        history.push("/actors");
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
      <h3>Create Actor</h3>
      <DisplayErrors errors={errors} />
      <ActorForm
        model={{ name: "", dateOfBirth: undefined }}
        onSubmit={async (values) => await create(values)}
      ></ActorForm>
    </>
  );
}
