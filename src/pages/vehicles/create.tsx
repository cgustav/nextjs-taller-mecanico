import { useAppSelector, useAppDispatch } from "../../hooks";
import { MODULE_STATUS } from "../../store";
import { Vehicle, selectVehicles } from "../../features/vehicles/vehicleSlice";
import type { NextPage } from "next";
import InputMask from "react-input-mask";

import { useState, useEffect } from "react";

// Render the form to create a new vehicle

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
}

function CreateFormTextInput(props: CreateVehicleFormInputProps) {
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
  } = props;
  const standardInputClassName =
    "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white";

  // const handleChange = (e) => {
  //   console.log("handleChange e.target.name: ", e.target.name);
  //   const { name, value } = e.target;

  return (
    <div className="flex flex-wrap -mx-3 mb-6">
      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
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
        {/* <p className="text-red-500 text-xs italic">
              Please fill out this field.
            </p> */}
      </div>
    </div>
  );
}

function CreateVehicle() {
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
  });

  useEffect(() => {
    console.log("CreateVehicle useEffect");
  }, []);

  // const handleLicensePlateChange = (e: any) => {
  //   console.log("handleChange e.target.name: ", e.target.name);
  //   const { name, value } = e.target;

  //   //Uppercase #cvf_licence_plate input content on change
  //   const licensePlateInput = document.getElementById("cvf_licence_plate");
  //   if (licensePlateInput) {
  //     licensePlateInput.value = value.toUpperCase();
  //   }

  // };

  const handleChange = (e: any) => {
    console.log("handleChange e.target.name: ", e.target.name);
    let { name, value } = e.target;

    if (name === "licensePlate") {
      value = value.toUpperCase();

      //   console.log("value sub5 ", value[5]);

      //   if (value.trim().length == 5 && !value[5]) {
      //     value += "-";
      //   } else if (value.trim().length == 2 && !value[2]) {
      //     value += "-";
      //   }
    }

    console.log("handleChange licensePlate value: ", value);

    setVehicleState({
      ...vehicle,
      [name]: value,
    });
  };

  return (
    <div>
      <h2>Crear Vehículo</h2>
      <form className="w-full max-w-lg">
        <CreateFormTextInput
          id="cvf_licence_plate"
          label="Patente"
          inputName="licensePlate"
          placeholder="Ej: JJ-XS-19"
          maxLength={8}
          onChange={handleChange}
          value={vehicle.licensePlate}
        />

        {/* <label htmlFor="cvf_manufacturer">Fabricante</label>
        <input type="text" id="cvf_manufacturer" name="manufacturer" /> */}

        <CreateFormTextInput
          id="cvf_manufacturer"
          label="Fabricante"
          inputName="manufacturer"
          placeholder="Ej: Ford"
          maxLength={80}
          onChange={handleChange}
          value={vehicle.manufacturer}
        />

        {/* <label htmlFor="cvf_model">Modelo</label>
        <input type="text" id="cvf_model" name="model" /> */}

        <CreateFormTextInput
          id="cvf_model"
          label="Modelo"
          inputName="model"
          placeholder="Ej: Focus"
          maxLength={120}
          onChange={handleChange}
          value={vehicle.model}
        />

        {/* <label htmlFor="cvf_color">Color</label>
        <input type="text" id="cvf_color" name="color" /> */}

        <CreateFormTextInput
          id="cvf_color"
          label="Color"
          inputName="color"
          placeholder="Ej: Rojo"
          maxLength={50}
          onChange={handleChange}
          value={vehicle.color}
        />

        {/* <label htmlFor="cvf_model_year">Año Fabricación</label>
        <input type="text" id="cvf_model_year" name="modelYear" /> */}

        <CreateFormTextInput
          id="cvf_model_year"
          label="Año Fabricación"
          inputName="modelYear"
          placeholder="Ej: 2019"
          maxLength={4}
          onChange={handleChange}
          value={vehicle.modelYear}
        />

        {/* <label htmlFor="cvf_vehicle_class">Tipo de vehículo</label>
        <input type="text" id="cvf_vehicle_class" name="vehicleClass" /> */}

        <CreateFormTextInput
          id="cvf_vehicle_class"
          label="Año Fabricación"
          inputName="vehicleClass"
          placeholder="Ej: 2019"
          maxLength={4}
          onChange={handleChange}
          value={vehicle.vehicleClass}
        />

        {/* <label htmlFor="cvf_passengers">Cantidad Pasajeros</label>
        <input type="text" id="cvf_passengers" name="passengers" /> */}

        <CreateFormTextInput
          id="cvf_passengers"
          label="Cantidad Pasajeros"
          inputName="passengers"
          placeholder="Ej: 4"
          maxLength={4}
          onChange={handleChange}
          value={vehicle.passengers}
        />

        {/* <label htmlFor="cvf_traction">Tracción</label>
        <input type="text" id="cvf_traction" name="traction" /> */}

        <CreateFormTextInput
          id="cvf_traction"
          label="Tracción"
          inputName="traction"
          placeholder="Ej: 2x2"
          maxLength={4}
          onChange={handleChange}
          value={vehicle.traction}
        />

        <div className="inline-block relative w-64 -mx-3 mb-6">
          <select className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-3 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
            <option>
              Really long option that will likely overlap the chevron
            </option>
            <option>Option 2</option>
            <option>Option 3</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>

        {/* <label htmlFor="cvf_notes">Notas</label>
        <input type="text" id="cvf_notes" name="notes" /> */}

        <CreateFormTextInput
          id="cvf_notes"
          label="Notas"
          inputName="notes"
          placeholder="Ej: Vidrios polarizados, etc."
          maxLength={500}
          onChange={handleChange}
          value={vehicle.notes}
        />

        <button type="submit">Create Vehicle</button>
      </form>
    </div>
  );
}

export default CreateVehicle;
