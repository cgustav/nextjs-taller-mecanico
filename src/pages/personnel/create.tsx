import { useAppSelector, useAppDispatch } from "../../hooks";

import FormHeader from "../../components/shared/form-header";
import InputMask from "react-input-mask";
import { v4 as uuid } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import type { AppState } from "../../store";
import GreenAlert from "../../components/shared/green-alert";
import ErrorLabel from "../../components/shared/error-label";
import {
  addPersonnel,
  updatePersonnel,
} from "../../features/personnel/personnelSlice";
import { PersonnelTools } from "../../features/personnel/tools";
import {
  MechanicPersonnel,
  selectPersonnel,
} from "../../features/personnel/personnelSlice";
import {
  USER_ROLES,
  User,
  selectRegistered,
  signup,
  updateUser,
} from "../../features/auth/authSlice";
import { base } from "@faker-js/faker";
import { AuthorizationUtils } from "../../utils/authorization.utils";

export interface CreateVehicleFormInputProps {
  id: string;
  label: string;
  inputName: string;
  inputType?: "text" | "number" | "date" | "email" | "password" | "tel" | "url";
  placeholder?: string;
  inputMask?: string;
  onChange?: any;
  value?: any;
  maxLength?: number;
  error?: string;
}

export interface FormSelectorElement {
  name: string;
  value: string;
}

export interface CreateFormSelectorProps {
  id: string;
  label: string;
  inputName: string;
  options: FormSelectorElement[];
  value: string;
  onChange?: any;
  error?: string;
}

function FormInput(props: CreateVehicleFormInputProps) {
  const {
    id,
    label,
    inputName,
    inputType,
    placeholder,
    inputMask,
    onChange,
    value,
    maxLength,
    error,
  } = props;
  const standardInputClassName =
    "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white";

  return (
    <div className="flex flex-wrap -mx-3 mb-6 items-center justify-center">
      <div className="w-full md:w-4/5 px-3 mb-6 md:mb-0">
        <label
          htmlFor={id}
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        >
          {label ?? "N/A"}
        </label>

        {inputMask ? (
          <InputMask mask={inputMask} onChange={onChange} value={value}>
            <input
              type={inputType ?? "text"}
              id={id}
              name={inputName}
              placeholder={placeholder ?? ""}
              className={standardInputClassName}
            />
          </InputMask>
        ) : (
          <input
            type={inputType ?? "text"}
            id={id}
            name={inputName}
            placeholder={placeholder ?? ""}
            className={standardInputClassName}
            onChange={onChange}
            value={value}
            maxLength={maxLength}
          />
        )}

        {error && <ErrorLabel message={error} />}
      </div>
    </div>
  );
}

function FormSelector(props: CreateFormSelectorProps) {
  const { id, label, inputName, options, onChange, value, error } = props;

  return (
    <div className="flex flex-wrap -mx-3 mb-6 items-center justify-center">
      <div className="w-full md:w-4/5 px-3 mb-6 md:mb-0">
        <label
          htmlFor={id}
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        >
          {label}
        </label>
        {/* TODO: Change to relative if it breaks */}
        <div className="">
          <select
            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id={id}
            name={inputName}
            onChange={onChange}
            value={value}
          >
            <option value="" disabled>
              Seleccione opción
            </option>
            {options.map((option) => {
              return (
                <option key={option.value} value={option.value}>
                  {option.name}
                </option>
              );
            })}
          </select>
        </div>

        {error && <ErrorLabel message={error} />}
      </div>
    </div>
  );
}

const findPersonnelById = (collection: any[], id: string) => {
  // Implementa la lógica para buscar el vehículo por su ID en el estado
  return collection.find((person: any) => person.id === id) || null;
};

const findElementByEmail = (collection: any[], email: string) => {
  // Implementa la lógica para buscar el vehículo por su ID en el estado
  return collection.find((person: any) => person.email === email) || null;
};

function CreatePersonnel() {
  const router = useRouter();
  //   const basePersonnel = useSelector((state: any) => state.personnel);
  // Obtner el estado de la lista de personal desde el store
  const basePersonnel = useAppSelector(selectPersonnel);
  const baseAuthUsers = useAppSelector(selectRegistered);

  /**
   * Estado para confirmación de nuevo usuario
   * de personal de trabajo.
   */
  const [credentials, setCredentials] = useState({
    password: "",
    confirmPassword: "",
  });

  /**
   * Estado del vehículo
   * (Se inicializa con un objeto vacío para que no se rompa el código al
   * intentar acceder a las propiedades del vehículo en el formulario
   * antes de que se cargue el vehículo desde el estado
   * y se actualice el estado del componente
   * con los datos del vehículo)
   */
  const [personnel, setPersonnelState] = useState({
    id: "",
    rut: "",
    fullName: "",
    email: "",
    birthdate: "",
    specialty: "",
    address: "",
    phone: "",
    isActive: true,
    createdAt: "",
  });

  const [authUser, setAuthUserState] = useState<User>({
    id: "",
    email: "",
    password: "",
    name: "",
    role: "",
    token: "",
    isEnabled: false,
    createdAt: "",
    updatedAt: "",
  });

  /**
   * Hook para actualizar el estado para mostrar el mensaje de alerta
   * cuando se crea o edita un vehículo.
   */
  const [showAlert, setShowAlert] = useState(false);

  // Estado para almacenar los errores de validación
  const [errors, setErrors] = useState<any>({});

  const { workerId } = router.query;

  const isEditing = workerId !== null && workerId !== undefined;
  console.log("Is editing: ", isEditing);

  const dispatch = useDispatch();

  //NOTE: Will only be executed at the time of initial
  //rendering and it will not be executed on component
  //re-rendering.
  useEffect(() => {
    console.log("CreatePersonnel useEffect");

    AuthorizationUtils.useRoleGuard([USER_ROLES.ADMIN], router);

    if (workerId?.length && isEditing) {
      const foundPersonnel = findPersonnelById(
        basePersonnel,
        workerId as string
      );

      console.log("Found personnel: ", foundPersonnel);

      if (foundPersonnel) {
        const foundAuthUser = findElementByEmail(
          baseAuthUsers,
          foundPersonnel.email as string
        );

        console.log("Found auth user: ", foundAuthUser);

        setPersonnelState(foundPersonnel);
        setAuthUserState(foundAuthUser);

        // console.log("Setting vehicle state: ", foundPersonnel);
      }
    }
  }, [workerId, basePersonnel, baseAuthUsers]);

  //   console.log("Current personnel state: ", personnel);

  const handleChange = (e: any) => {
    console.log("handleChange e.target.name: ", e.target.name);
    let { name, value } = e.target;

    if (name === "rut") {
      value = value.toUpperCase();
    }

    const personnelErrors = PersonnelTools.validatePersonnelData({
      ...personnel,
      [name]: value,
    });

    const credentialsErrors = !isEditing
      ? PersonnelTools.validateCredentials({
          ...credentials,
          [name]: value,
        })
      : {};

    let extraErrors = {};
    if (!isEditing) {
      if (name === "email") {
        findElementByEmail(baseAuthUsers, value as string)
          ? (extraErrors = { email: "El correo ya se encuentra registrado" })
          : (extraErrors = {});
      }
    } else {
      if (name === "email") {
        if (authUser.email !== personnel.email) {
          findElementByEmail(baseAuthUsers, value as string)
            ? (extraErrors = { email: "El correo ya se encuentra registrado" })
            : (extraErrors = {});
        }
      }
    }

    const validationErrors = Object.assign(
      {},
      personnelErrors,
      credentialsErrors,
      extraErrors
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

    if (name === "password" || name === "confirmPassword") {
      setCredentials({
        ...credentials,
        [name]: value,
      });
    } else {
      setPersonnelState({
        ...personnel,
        [name]: value,
      });
    }
  };

  const handleTaskCreation = () => {
    personnel.id = uuid();
    personnel.createdAt = new Date().toISOString();

    console.log("[handleTaskCreation]: ", personnel);
    dispatch(addPersonnel(personnel));

    const user = {
      id: uuid(),
      email: personnel.email,
      password: credentials.password,
      name: personnel.fullName,
      role: USER_ROLES.PERSONNEL,
      token: "",
      isEnabled: true,
      createdAt: new Date().toISOString(),
    };

    dispatch(signup(user));
  };

  const handleTaskUpdate = () => {
    console.log("[handleTaskUpdate]: ", personnel);

    dispatch(updatePersonnel(personnel));

    // TODO - DEACTIVATE THIS IF HANDLE AUTHENTICATION MODULE VIA API

    const user = {
      ...authUser,
      email: personnel.email,
      name: personnel.fullName,
      updatedAt: new Date().toISOString(),
    };

    dispatch(updateUser(user));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("handleSubmit vehicle: ", personnel);

    // Validar los datos del formulario antes de enviar
    // const validationErrors = PersonnelTools.validatePersonnelData(personnel);

    const personnelErrors = PersonnelTools.validatePersonnelData(personnel);
    const credentialsErrors = !isEditing
      ? PersonnelTools.validateCredentials(credentials)
      : {};

    let extraErrors = {};

    if (!isEditing) {
      findElementByEmail(baseAuthUsers, personnel.email as string)
        ? (extraErrors = { email: "El correo ya se encuentra registrado" })
        : (extraErrors = {});
    } else {
      if (authUser.email !== personnel.email) {
        findElementByEmail(baseAuthUsers, personnel.email as string)
          ? (extraErrors = { email: "El correo ya se encuentra registrado" })
          : (extraErrors = {});
      }
    }

    const validationErrors = Object.assign(
      {},
      personnelErrors,
      credentialsErrors,
      extraErrors
    );

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);

      console.log(
        "Prevent submit because of validation errors: ",
        validationErrors
      );
      return;
    }

    if (isEditing) {
      handleTaskUpdate();
      setShowAlert(true);
    } else {
      handleTaskCreation();
      setShowAlert(true);
    }
  };

  const onCloseAlert = () => {
    setShowAlert(false);
    //Navegar hacia el home
    router.push("/personnel");
  };

  //NOTE: Temporal
  let checked = false;
  const [isChecked, setIsChecked] = useState(checked);

  const handleSwitchChange = () => {
    setIsChecked(!isChecked);
    // onChange(!isChecked);
  };

  return (
    <div className="px-6">
      {showAlert != false && (
        <GreenAlert
          message={
            isEditing
              ? "Personal actualizado exitosamente"
              : "Personal creado exitosamente"
          }
          onClose={onCloseAlert}
        />
      )}

      <header>
        <FormHeader
          id="header-registro-personal"
          text="Registro de Personal"
          includeRoute={true}
        ></FormHeader>
      </header>

      <div className="w-full mb-6">
        {/* <h2 className="text-teal-900 font-black">Crear Vehículo</h2> */}

        <div>
          <form className="min-w-full">
            <FormInput
              id="cvf_person_rut"
              label="Rut"
              inputName="rut"
              placeholder="11.111.111-1"
              maxLength={12}
              onChange={handleChange}
              value={personnel.rut}
              error={errors.rut}
            />
            <FormInput
              id="cvf_person_full_name"
              label="Nombre Completo"
              inputName="fullName"
              placeholder="Juán Huerta"
              maxLength={150}
              onChange={handleChange}
              value={personnel.fullName}
              error={errors.fullName}
            />
            <FormInput
              id="cvf_person_birthdate"
              label="Fecha de Nacimiento"
              inputName="birthdate"
              placeholder="01/01/1990"
              maxLength={10}
              onChange={handleChange}
              value={personnel.birthdate}
              error={errors.birthdate}
            />
            <FormInput
              id="cvf_person_specialty"
              label="Especialidad"
              inputName="specialty"
              placeholder="Maquinaria pesada"
              maxLength={150}
              onChange={handleChange}
              value={personnel.specialty}
              error={errors.specialty}
            />
            <FormInput
              id="cvf_person_email"
              label="Correo Electrónico"
              inputName="email"
              inputType="email"
              placeholder="j.huerta@gmail.com"
              maxLength={180}
              onChange={handleChange}
              value={personnel.email}
              error={errors.email}
            />

            {!isEditing && (
              <FormInput
                id="cvf_person_password"
                label="Contraseña"
                inputName="password"
                inputType="password"
                placeholder="*******"
                maxLength={30}
                onChange={handleChange}
                value={credentials.password}
                error={errors.password}
              />
            )}

            {!isEditing && (
              <FormInput
                id="cvf_person_confirm_password"
                label="Repetir Contraseña"
                inputName="confirmPassword"
                inputType="password"
                placeholder="*******"
                maxLength={30}
                onChange={handleChange}
                value={credentials.confirmPassword}
                error={errors.confirmPassword}
              />
            )}

            <FormInput
              id="cvf_person_phone"
              label="Teléfono"
              inputName="phone"
              placeholder="+569 12345678"
              maxLength={14}
              onChange={handleChange}
              value={personnel.phone}
              error={errors.phone}
            />
            <FormInput
              id="cvf_person_address"
              label="Dirección"
              inputName="address"
              placeholder="Av. Siempre Viva 123"
              maxLength={180}
              onChange={handleChange}
              value={personnel.address}
              error={errors.address}
            />

            <div className="flex justify-center">
              <button
                type="submit"
                onClick={handleSubmit}
                className="w-full md:w-4/5 bg-zinc-700 px-2 py-4 rounded-md text-sm self-center text-white hover:bg-zinc-900 transition duration-500 ease-in-out font-black"
              >
                {isEditing ? "Editar" : "Crear"} Personal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreatePersonnel;
