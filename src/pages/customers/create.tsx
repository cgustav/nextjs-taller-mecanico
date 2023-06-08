import { useAppSelector, useAppDispatch } from "../../hooks";
import { MODULE_STATUS } from "../../store";
import {
  Customer,
  addCustomer,
  updateCustomer,
} from "../../features/customers/customerSlice";
import FormHeader from "../../components/shared/form-header";
import InputMask from "react-input-mask";
import { v4 as uuid } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import type { AppState } from "../../store";
import GreenAlert from "../../components/shared/green-alert";
import ErrorLabel from "../../components/shared/error-label";

export interface CreateCustomerFormInputProps {
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

function CreateFormInput(props: CreateCustomerFormInputProps) {
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

  // const handleChange = (e) => {
  //   console.log("handleChange e.target.name: ", e.target.name);
  //   const { name, value } = e.target;

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

function CreateFormSelector(props: CreateFormSelectorProps) {
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
          {/* <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M10 12a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 2a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
            </svg>
          </div> */}
        </div>

        {error && <ErrorLabel message={error} />}
      </div>
    </div>
  );
}

const findCustomerById = (state: AppState, id: string) => {
  // Implementa la lógica para buscar el vehículo por su ID en el estado
  return state.customers.find((customer: any) => customer.id === id) || null;
};

function CreateCustomer() {
  const router = useRouter();
  const baseCustomers = useSelector((state: any) => state.customers);

  /**
   * Estado del vehículo
   * (Se inicializa con un objeto vacío para que no se rompa el código al
   * intentar acceder a las propiedades del vehículo en el formulario
   * antes de que se cargue el vehículo desde el estado
   * y se actualice el estado del componente
   * con los datos del vehículo)
   */
  const [customer, setCustomerState] = useState({
    id: "",
    rut: "",
    fullName: "",
    address: "",
    city: "",
    phone: "",
    email: "",
    createdAt: "",
    vehicles: []
  });

  /**
   * Hook para actualizar el estado para mostrar el mensaje de alerta
   * cuando se crea o edita un vehículo.
   */
  const [showAlert, setShowAlert] = useState(false);

  // Estado para almacenar los errores de validación
  const [errors, setErrors] = useState<any>({});

  const { customerId } = router.query;

  console.log("Query  customerId: ", customerId);
  const isEditing = customerId !== null && customerId !== undefined;
  console.log("Is editing: ", isEditing);

  const dispatch = useDispatch();

  //NOTE: Will only be executed at the time of initial
  //rendering and it will not be executed on component
  //re-rendering.
  useEffect(() => {
    console.log("CreateVehicle useEffect");

    if (customerId?.length && isEditing) {
      const foundCustomer = findCustomerById(baseCustomers, customerId as string);
      console.log("Found customer: ", foundCustomer);

      if (foundCustomer) {
        setCustomerState(foundCustomer);
        console.log("Setting customer state: ", foundCustomer);
      }
    }

    //TEST ONLY

    // setErrors({
    //   licensePlate: "La placa ya existe",
    // });
  }, [customerId, baseCustomers]);

  const validateFormData = (data: Customer) => {
    // Objeto para almacenar los errores de validación
    let validationErrors: any = {};

    if (!data.rut) {
      validationErrors.rut = "El rut es requerido";
    }

    if (!data.fullName) {
      validationErrors.fullName = "El nombre es requerida";
    }

    if (!data.address) {
      validationErrors.address = "La dirección es requerida";
    }

    if (!data.city) {
      validationErrors.city = "La ciudad es requerida";
    }

    if (!data.phone) {
      validationErrors.phone = "El número de teléfono es requerido";
    }

    if (!data.email) {
      validationErrors.email = "El correo es requerido";
    }

    return validationErrors;
  };

  const handleOptionChange = (e: any) => {
    console.log("Event: ", e);
    const targetName = e.target.name;
    const selectedValue = e.target.value;

    console.log("handleOptionChange name: ", targetName);
    console.log("handleOptionChange value: ", selectedValue);

    const validationErrors = validateFormData({
      ...customer,
      [targetName]: selectedValue,
    });

    if (validationErrors[targetName]) {
      setErrors({
        ...errors,
        [targetName]: validationErrors[targetName],
      });
    } else {
      setErrors({
        ...errors,
        [targetName]: "",
      });
    }

    setCustomerState((prevFormData) => ({
      ...prevFormData,
      [targetName]: selectedValue,
    }));
  };

  const handleChange = (e: any) => {
    console.log("handleChange e.target.name: ", e.target.name);
    let { name, value } = e.target;

    if (name === "licensePlate") {
      value = value.toUpperCase();
    }

    const validationErrors = validateFormData({
      ...customer,
      [name]: value,
    });

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

    setCustomerState({
      ...customer,
      [name]: value,
    });
  };

  const handleTaskCreation = () => {
    customer.id = uuid();
    customer.createdAt = new Date().toISOString();

    console.log("[handleTaskCreation]: ", customer);
    dispatch(addCustomer(customer));
  };

  const handleTaskUpdate = () => {
    console.log("[handleTaskUpdate]: ", customer);
    dispatch(updateCustomer(customer));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("handleSubmit vehicle: ", customer);

    // Validar los datos del formulario antes de enviar
    const validationErrors = validateFormData(customer);

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
    router.push("/customers");
  };

  return (
    <div className="px-6">
      {showAlert != false && (
        <GreenAlert
          message={
            isEditing
              ? "Cliente actualizado exitosamente"
              : "Cliente creado exitosamente"
          }
          onClose={onCloseAlert}
        />
      )}

      <header>
        <FormHeader
          id="header-registro-cliente"
          text="Registro de cliente"
          includeRoute={true}
        ></FormHeader>
      </header>

      <div className="w-full mb-6">
        {/* <h2 className="text-teal-900 font-black">Crear Vehículo</h2> */}

        <div>
          <form className="min-w-full">
            <CreateFormInput
              id="name"
              label="Nombre completo"
              inputName="fullName"
              placeholder="Ej: John Doe"
              maxLength={70}
              onChange={handleChange}
              value={customer.fullName}
              error={errors.fullName}
            />

            <CreateFormInput
              id="rut"
              label="RUT"
              inputName="rut"
              placeholder="Ej: 11.111.111-1"
              maxLength={12}
              onChange={handleChange}
              value={customer.rut}
              error={errors.rut}
            />

            <CreateFormInput
              id="email"
              label="Correo"
              inputName="email"
              placeholder="Ej: john.doe@example.com"
              maxLength={60}
              onChange={handleChange}
              value={customer.email}
              error={errors.email}
            />

            <CreateFormInput
              id="address"
              label="Dirección"
              inputName="address"
              placeholder="Ej: Calle 3BS #3231"
              maxLength={50}
              onChange={handleChange}
              value={customer.address}
              error={errors.address}
            />

            <CreateFormInput
              id="city"
              label="Ciudad"
              inputName="city"
              placeholder="Ej: La Serena"
              maxLength={50}
              onChange={handleChange}
              value={customer.city}
              error={errors.city}
            />

            <CreateFormInput
              id="phone"
              label="Teléfono"
              inputName="phone"
              placeholder="Ej: +56 9 12345678"
              maxLength={30}
              onChange={handleChange}
              value={customer.phone}
              error={errors.phone}
            />

            <div className="flex justify-center">
              <button
                type="submit"
                onClick={handleSubmit}
                className="w-full md:w-4/5 bg-zinc-700 px-2 py-4 rounded-md text-sm self-center text-white hover:bg-zinc-900 transition duration-500 ease-in-out font-black"
              >
                {isEditing ? "Editar" : "Crear"} Cliente
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateCustomer;
