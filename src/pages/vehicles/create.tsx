import { useAppSelector, useAppDispatch } from "../../hooks";
import { MODULE_STATUS } from "../../store";
import {
  addVehicle,
  updateVehicle,
} from "../../features/vehicles/vehicleSlice";
import FormHeader from "../../components/shared/form-header";
import InputMask from "react-input-mask";
import { v4 as uuid } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import type { AppState } from "../../store";
import GreenAlert from "../../components/shared/green-alert";
import ErrorLabel from "../../components/shared/error-label";
import { VehicleTools } from "../../features/vehicles/tools";

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
  disabled?: boolean;
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

function CreateFormInput(props: CreateVehicleFormInputProps) {
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
    disabled,
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
              disabled={disabled}
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
            disabled={disabled}
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

const findVehicleById = (state: AppState, id: string) => {
  // Implementa la lógica para buscar el vehículo por su ID en el estado
  return state.vehicles.find((vehicle: any) => vehicle.id === id) || null;
};

function CreateVehicle() {
  const router = useRouter();
  const baseVehicles = useSelector((state: any) => state.vehicles);
  const baseCustomers = useSelector((state: any) => state.customers.customers);

  console.log("Base Customers: ", baseCustomers);

  /**
   * Estado del vehículo
   * (Se inicializa con un objeto vacío para que no se rompa el código al
   * intentar acceder a las propiedades del vehículo en el formulario
   * antes de que se cargue el vehículo desde el estado
   * y se actualice el estado del componente
   * con los datos del vehículo)
   */
  const [vehicle, setVehicleState] = useState({
    id: "",
    licensePlate: "",
    color: "",
    model: "",
    manufacturer: "",
    modelYear: "",
    vehicleClass: "",
    passengers: "",
    traction: "",
    notes: "",
    fuelType: "",
    createdAt: "",
    ownerId: "",
    ownerFullName: "",
  });

  /**
   * Hook para actualizar el estado para mostrar el mensaje de alerta
   * cuando se crea o edita un vehículo.
   */
  const [showAlert, setShowAlert] = useState(false);

  // Estado para almacenar los errores de validación
  const [errors, setErrors] = useState<any>({});

  const { vehicleId } = router.query;

  console.log("Query  vehicleId: ", vehicleId);
  const isEditing = vehicleId !== null && vehicleId !== undefined;
  console.log("Is editing: ", isEditing);

  const dispatch = useDispatch();
  // const status = useAppSelector(selectVehicles);

  const fuelTypes = [
    {
      name: "Gasolina",
      value: "gasolina",
    },
    {
      name: "Diesel",
      value: "diesel",
    },
    {
      name: "Híbrido",
      value: "hibrido",
    },
    {
      name: "Eléctrico",
      value: "electrico",
    },
    {
      name: "Otro",
      value: "otro",
    },
  ];

  const tractionTypes = [
    {
      name: "Delantera",
      value: "delantera",
    },
    {
      name: "Trasera",
      value: "trasera",
    },
    {
      name: "4x4",
      value: "4x4",
    },
    {
      name: "6x6",
      value: "6x6",
    },
    {
      name: "Otro",
      value: "Otro",
    },
  ];

  const vehicleClasses = [
    {
      name: "Automóvil",
      value: "automovil",
    },
    {
      name: "Camioneta",
      value: "camioneta",
    },
    {
      name: "Camión",
      value: "camion",
    },
    {
      name: "Motocicleta",
      value: "motocicleta",
    },
    {
      name: "Cuatrimoto",
      value: "Cuatrimoto",
    },
  ];

  const passengersOptions = [
    {
      name: "1",
      value: "1",
    },
    {
      name: "2",
      value: "2",
    },
    {
      name: "3",
      value: "3",
    },
    {
      name: "4",
      value: "4",
    },
    {
      name: "5",
      value: "5",
    },
    {
      name: "6 o más",
      value: "6omas",
    },
  ];

  const modelYearRange = 70;
  const modelYearStart = new Date().getFullYear() + 1 - modelYearRange;
  const modelYears = Array.from(
    { length: modelYearRange },
    (_, idx) => `${modelYearStart + idx}`
  )
    .sort()
    .reverse();

  //NOTE: Will only be executed at the time of initial
  //rendering and it will not be executed on component
  //re-rendering.
  useEffect(() => {
    console.log("CreateVehicle useEffect");

    if (vehicleId?.length && isEditing) {
      const foundVehicle = findVehicleById(baseVehicles, vehicleId as string);
      console.log("Found vehicle: ", foundVehicle);

      if (foundVehicle) {
        setVehicleState(foundVehicle);
        console.log("Setting vehicle state: ", foundVehicle);
      }
    }
  }, [vehicleId, baseVehicles]);

  console.log("Current vehicle state: ", vehicle);

  const handleOptionChange = (e: any) => {
    console.log("Event: ", e);
    const targetName = e.target.name;
    const selectedValue = e.target.value;

    console.log("handleOptionChange name: ", targetName);
    console.log("handleOptionChange value: ", selectedValue);

    const validationErrors = VehicleTools.validateVehicleData(
      {
        ...vehicle,
        [targetName]: selectedValue,
      },
      baseVehicles,
      isEditing
    );

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

    setVehicleState((prevFormData) => ({
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

    const validationErrors = VehicleTools.validateVehicleData(
      {
        ...vehicle,
        [name]: value,
      },
      baseVehicles,
      isEditing
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

    setVehicleState({
      ...vehicle,
      [name]: value,
    });
  };

  const handleTaskCreation = () => {
    vehicle.id = uuid();
    vehicle.createdAt = new Date().toISOString();
    vehicle.ownerFullName = (baseCustomers as any[]).find(
      (custom) => custom.id === vehicle.ownerId
    )?.fullName;

    console.log("[handleTaskCreation]: ", vehicle);
    dispatch(addVehicle(vehicle));
  };

  const handleTaskUpdate = () => {
    console.log("[handleTaskUpdate]: ", vehicle);
    dispatch(updateVehicle(vehicle));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("handleSubmit vehicle: ", vehicle);

    // Validar los datos del formulario antes de enviar
    const validationErrors = VehicleTools.validateVehicleData(
      vehicle,
      baseVehicles,
      isEditing
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
    router.push("/");
  };

  return (
    <div className="px-6">
      {showAlert != false && (
        <GreenAlert
          message={
            isEditing
              ? "Vehículo actualizado exitosamente"
              : "Vehículo creado exitosamente"
          }
          onClose={onCloseAlert}
        />
      )}

      <header>
        <FormHeader
          id="header-registro-vehiculo"
          text="Registro de Vehículo"
          includeRoute={true}
        ></FormHeader>
      </header>

      <div className="w-full mb-6">
        {/* <h2 className="text-teal-900 font-black">Crear Vehículo</h2> */}

        <div>
          <form className="min-w-full">
            <CreateFormInput
              id="cvf_licence_plate"
              label="Patente"
              inputName="licensePlate"
              placeholder="Ej: JJXS19"
              disabled={isEditing}
              maxLength={6}
              onChange={handleChange}
              value={vehicle.licensePlate}
              error={errors.licensePlate}
            />

            <CreateFormInput
              id="cvf_manufacturer"
              label="Fabricante"
              inputName="manufacturer"
              placeholder="Ej: Ford"
              maxLength={80}
              onChange={handleChange}
              value={vehicle.manufacturer}
              error={errors.manufacturer}
            />

            <CreateFormInput
              id="cvf_model"
              label="Modelo"
              inputName="model"
              placeholder="Ej: Focus"
              maxLength={120}
              onChange={handleChange}
              value={vehicle.model}
              error={errors.model}
            />

            <CreateFormInput
              id="cvf_color"
              label="Color"
              inputName="color"
              placeholder="Ej: Rojo"
              maxLength={50}
              onChange={handleChange}
              value={vehicle.color}
              error={errors.color}
            />

            {/* <CreateFormInput
          id="cvf_model_year"
          label="Año Fabricación"
          inputName="modelYear"
          placeholder="Ej: 2019"
          maxLength={4}
          onChange={handleChange}
          value={vehicle.modelYear}
        /> */}

            <CreateFormSelector
              id="cvf_model_year"
              label="Año Fabricación"
              inputName="modelYear"
              // onChange={handleChange}
              options={modelYears.map((year) => ({ value: year, name: year }))}
              value={vehicle.modelYear}
              error={errors.modelYear}
              onChange={handleOptionChange}
            />

            {/* <CreateFormInput
          id="cvf_vehicle_class"
          label="Tipo de vehículo"
          inputName="vehicleClass"
          placeholder="Ej: 2019"
          maxLength={4}
          onChange={handleChange}
          value={vehicle.vehicleClass}
        /> */}

            <CreateFormSelector
              id="cvf_vehicle_class"
              label="Tipo de vehículo"
              inputName="vehicleClass"
              options={vehicleClasses}
              value={vehicle.vehicleClass}
              error={errors.vehicleClass}
              onChange={handleOptionChange}
            />

            {/* <CreateFormInput
            id="cvf_passengers"
            label="Cantidad Pasajeros"
            inputName="passengers"
            placeholder="Ej: 4"
            maxLength={2}
            onChange={handleChange}
            value={vehicle.passengers}
          /> */}

            <CreateFormSelector
              id="cvf_passengers"
              label="Cantidad Pasajeros"
              inputName="passengers"
              options={passengersOptions.map((pass) => ({
                value: pass.value,
                name: pass.name,
              }))}
              value={vehicle.passengers}
              onChange={handleOptionChange}
              error={errors.passengers}
            />

            {/* <CreateFormInput
          id="cvf_traction"
          label="Tracción"
          inputName="traction"
          placeholder="Ej: 2x2"
          maxLength={4}
          onChange={handleChange}
          value={vehicle.traction}
        /> */}

            <CreateFormSelector
              id="cvf_traction"
              label="Tracción"
              inputName="traction"
              onChange={handleOptionChange}
              options={tractionTypes}
              value={vehicle.traction}
              error={errors.traction}
            />

            <CreateFormSelector
              id="cvf_fuel_type"
              label="Tipo de Combustible"
              inputName="fuelType"
              onChange={handleOptionChange}
              options={fuelTypes}
              value={vehicle.fuelType}
              error={errors.fuelType}
            />

            <CreateFormSelector
              id="cvf_vehicle_owner"
              label="Propietario del Vehículo"
              inputName="ownerId"
              options={baseCustomers.map((custom: any) => ({
                value: custom.id,
                name: `${custom.fullName} (${custom.rut})`,
              }))}
              value={vehicle.ownerId}
              error={errors.ownerId}
              onChange={handleOptionChange}
            />

            <CreateFormInput
              id="cvf_notes"
              label="Notas"
              inputName="notes"
              placeholder="Ej: Vidrios polarizados, etc."
              maxLength={500}
              onChange={handleChange}
              value={vehicle.notes}
              error={errors.notes}
            />

            <div className="flex justify-center">
              <button
                type="submit"
                onClick={handleSubmit}
                className="w-full md:w-4/5 bg-zinc-700 px-2 py-4 rounded-md text-sm self-center text-white hover:bg-zinc-900 transition duration-500 ease-in-out font-black"
              >
                {isEditing ? "Editar" : "Crear"} Vehículo
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateVehicle;
