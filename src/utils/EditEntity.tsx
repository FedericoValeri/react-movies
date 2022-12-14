import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { ReactElement } from "react-markdown/lib/react-markdown";
import { useHistory, useParams } from "react-router-dom";
import DisplayErrors from "./DisplayErrors";
import Loading from "./Loading";

export default function EditEntity<TCreation, TRead>(
  props: editEntityProps<TCreation, TRead>
) {
  const { id }: any = useParams();
  const [entity, setEntity] = useState<TCreation>();
  const [errors, setErrors] = useState<string[]>([]);
  const history = useHistory();
  useEffect(() => {
    axios.get(`${props.url}/${id}`).then((response: AxiosResponse<TRead>) => {
      setEntity(props.transform(response.data));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function axiosPutRequest(entityToEdit: TCreation, formData?: FormData) {
    await axios({
      method: "put",
      url: `${props.url}/${id}`,
      data: formData ? formData : entityToEdit,
      headers: formData ? { "Content-Type": "multipart/form-data" } : undefined,
    })
      .then(() => {
        history.push(props.indexURL);
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

  async function edit(entityToEdit: TCreation) {
    if (props.transformFormData) {
      const formData = props.transformFormData(entityToEdit);
      await axiosPutRequest(entityToEdit, formData);
    } else {
      await axiosPutRequest(entityToEdit);
    }
  }

  return (
    <>
      <h3>Edit {props.entityName}</h3>
      <DisplayErrors errors={errors} />
      {entity ? props.children(entity, edit) : <Loading />}
    </>
  );
}

interface editEntityProps<TCreation, TRead> {
  url: string;
  entityName: string;
  indexURL: string;
  transform(entity: TRead): TCreation;
  transformFormData?(model: TCreation): FormData;
  children(entity: TCreation, edit: (entity: TCreation) => void): ReactElement;
}

EditEntity.defaultProps = {
  transform: (entity: any) => entity,
};
