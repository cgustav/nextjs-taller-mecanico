// utils/auth.js

import { EmailUtils } from "../../utils/email.utils";
import { selectUser } from "./authSlice";
import { useSelector } from "react-redux";

/**
 * Comprueba si el usuario está autenticado
 *
 * @returns {string} el rol del usuario autenticado, null en caso contrario
 */
export const getUserRole = () => {
  // Obtener el usuario desde el estado global
  //   const user = useSelector(selectUser);
  const globalState = localStorage.getItem("persist:nextjs");

  //   const globalState = localStorage.getItem("chuink");

  console.log("Global state: ", globalState);

  if (!globalState) return null;

  const user = JSON.parse(JSON.parse(globalState).auth).authenticated;

  console.log("Get user role", user);

  if (user) {
    return user.role; // Supongamos que el rol del usuario está almacenado en la propiedad "role"
  }

  return null; // Si no hay usuario, retornar null o algún valor que indique que el rol no está definido
};

// export const getUser = () => {
// Obtener el usuario desde el estado global
//   const user = useSelector(selectUser);
// const globalState = localStorage.getItem("persist:nextjs");

export class AuthTools {
  public static validateSignInData = (data: any): any => {
    let validationErrors: any = {};

    if (!data.username) {
      validationErrors.username = "El username es obligatorio";
    } else {
      if (!EmailUtils.validate(data.username)) {
        validationErrors.username = "El username no es un email válido";
      }
    }

    if (!data.password) {
      validationErrors.password = "La contraseña es obligatoria";
    }

    return validationErrors;
  };
}
