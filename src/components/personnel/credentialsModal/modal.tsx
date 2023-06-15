import React from "react";
import FormInput from "../../shared/form-input";
import { CredentialsModalTools } from "./tools";
import { User, updateUser } from "../../../features/auth/authSlice";
import { useDispatch } from "react-redux";

export interface CredentialsModalProps {
  onClose: any;
  currentUser: User;
}

function CredentialsModal({ onClose, currentUser }: CredentialsModalProps) {
  const dispatch = useDispatch();

  const [credentials, setCredentials] = React.useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  // Estado para almacenar los errores de validación
  // de datos de facturación (Paso 1)
  const [errors, setErrors] = React.useState<any>({});

  const handleChangeInput = (e: any) => {
    console.log("handleChange e.target.name: ", e.target.name);
    const { name, value } = e.target;

    const validationErrors = CredentialsModalTools.validateFormData(
      {
        ...credentials,
        [name]: value,
      },
      currentUser.password
    );

    if (validationErrors[name]) {
      setErrors({
        ...errors,
        [name]: validationErrors[name],
      });
    } else {
      setErrors({
        ...errors,
        [name]: "",
      });
    }

    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const validationErrors = CredentialsModalTools.validateFormData(
      credentials,
      currentUser.password
    );

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      console.log("handleSubmit credentials: ", credentials);
      const newAuthUser = {
        ...currentUser,
        password: credentials.newPassword,
      };

      console.log("New user to update: ", newAuthUser);

      dispatch(updateUser(newAuthUser));
      onClose();
    }
  };

  return (
    <div>
      {/* {showConflictModal && (
        <RedAlert
          message="Ya existe una factura emitida para esta orden"
          onClose={() => handleCloseConflictModal()}
        />
      )} */}
      <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
        <div className="bg-white p-4 rounded shadow">
          {/* Paso 2 */}

          <div className="">
            <div className="flex justify-end">
              <button
                className="self-end top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={onClose}
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <h2 className="text-lg font-bold mb-2 md:mb-4">
              Actualizar contraseña
            </h2>
            <form className="flex flex-col w-full">
              <div className="mb-4 px-2">
                <span className="text-white">
                  Los siguientes datos son opcionales, pero si los ingresas
                  ahora.
                </span>
              </div>
              {/* Contenido del segundo formulario */}
              {/* ... */}

              <FormInput
                id="wv-personnel-current-password"
                label="Contraseña actual"
                inputName="currentPassword"
                maxLength={50}
                noDynamicW={true}
                inputType="password"
                // disabled={true}
                value={credentials.currentPassword}
                error={errors.currentPassword}
                onChange={handleChangeInput}
              ></FormInput>

              <FormInput
                id="wv-personnel-new-password"
                label="Nueva Contraseña"
                inputName="newPassword"
                maxLength={50}
                noDynamicW={true}
                inputType="password"
                // disabled={true}
                value={credentials.newPassword}
                error={errors.newPassword}
                onChange={handleChangeInput}
              ></FormInput>

              <FormInput
                id="wv-personnel-confirm-new-password"
                label="Confirme Nueva Contraseña"
                inputName="confirmNewPassword"
                maxLength={50}
                noDynamicW={true}
                inputType="password"
                // disabled={true}
                value={credentials.confirmNewPassword}
                error={errors.confirmNewPassword}
                onChange={handleChangeInput}
              ></FormInput>

              <div className="flex justify-between w-full px-3 my-4 mt-8">
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
                  type="submit"
                  onClick={handleSubmit}
                >
                  Actualizar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CredentialsModal;
