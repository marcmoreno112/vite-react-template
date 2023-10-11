import {
  ScaleButton,
  ScaleNotification,
  ScaleTextField,
} from "@telekom/scale-components-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { loginUser } from "../infrastructure/serviceBds";

const RegisterSchema = Yup.object().shape({
  username: Yup.string().email().required(),
  password: Yup.string().required(),
});

export default function LoginScreen() {
  const [reqFailed, setReqFailed] = useState(false);
  const { handleSubmit, handleChange, errors } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values, { resetForm }) => {
      console.log(values);
      try {
        await loginUser(values);
        resetForm();
        alert("Form data sent successfully");
        location.reload();
      } catch (error) {
        console.error("Error sending form data", error);
        setReqFailed(true);
      }
    },
    validationSchema: RegisterSchema,
  });

  return (
    <div className="login-screen">
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <h1>Acceder</h1>

          <p>Correo electrónico</p>
          <ScaleTextField
            className="form-input"
            label="Escriba su correo electrónico"
            id="text-field"
            name="username"
            type="email"
            onScale-change={handleChange}
          ></ScaleTextField>

          <p>Contraseña</p>
          <ScaleTextField
            className="form-input"
            label="Escriba su contraseña"
            id="text-field"
            name="password"
            type="password"
            onScale-change={handleChange}
          ></ScaleTextField>

          <div className="gap-div" />
          <ScaleButton className="button" type="submit">
            Acceder
          </ScaleButton>
        </form>
      </div>
      <div className="scale-notifications">
        {errors.email && (
          <>
            <ScaleNotification
              heading="El correo no es válido"
              variant="danger"
              opened
              className="scale-danger-notification"
            ></ScaleNotification>
            <br />
          </>
        )}
        {errors.password && (
          <>
            <ScaleNotification
              heading="Rellena todos los campos"
              variant="danger"
              opened
              className="scale-danger-notification"
            ></ScaleNotification>
            <br />
          </>
        )}
        {reqFailed && (
          <>
            <ScaleNotification
              heading="No se ha podido iniciar sesión"
              variant="danger"
              opened
              className="scale-danger-notification"
            ></ScaleNotification>
            <br />
          </>
        )}
      </div>
    </div>
  );
}
