import axios from "axios";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { urlAccounts } from "../endpoint";
import DisplayErrors from "../utils/DisplayErrors";
import { authenticationResponse, userCredentials } from "./auth.models";
import AuthenticationContext from "./AuthenticationContext";
import AuthForm from "./AuthForm";
import { getClaims, saveToken } from "./handleJWT";

export default function Register() {
  const [errors, setErrors] = useState<string[]>([]);
  const { update } = useContext(AuthenticationContext);
  const history = useHistory();

  async function register(credentials: userCredentials) {
    setErrors([]);
    await axios
      .post<authenticationResponse>(`${urlAccounts}/register`, credentials)
      .then((response) => {
        saveToken(response.data);
        // Updating the claims in the application
        update(getClaims());
        history.push("/");
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
      <h3>Register</h3>
      <DisplayErrors errors={errors} />
      <AuthForm
        model={{ email: "", password: "" }}
        onSubmit={async (values) => await register(values)}
      />
    </>
  );
}
