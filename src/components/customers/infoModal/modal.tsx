import React from "react";
import { useAppSelector } from "../../../hooks";
import {
  Customer,
  selectCustomers,
} from "../../../features/customers/customerSlice";
import { Vehicle } from "../../../features/vehicles/vehicleSlice";

export interface CustomerInfoModalProps {
  onCloseModal: any;
  clientData: Customer;
  vehicles: Vehicle[];
}

const CustomerInfoModal = ({
  onCloseModal,
  clientData,
  vehicles,
}: CustomerInfoModalProps) => {
  // const customers = useAppSelector(selectCustomers);

  // console.log("Fetching customers: ", customers);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50  bg-gray-500 bg-opacity-50">
      <div className="bg-white rounded-lg p-4 w-80">
        <h2 className="text-lg font-bold mb-4">Información del cliente</h2>
        <p>
          <span className="font-semibold">Nombre:</span> {clientData.fullName}
        </p>
        <p>
          <span className="font-semibold">Correo:</span> {clientData.email}
        </p>
        <p>
          <span className="font-semibold">Teléfono:</span> {clientData.phone}
        </p>
        <p>
          <span className="font-semibold">Ciudad:</span> {clientData.city}
        </p>
        <h3 className="text-lg font-bold mt-4 mb-2">Vehículos asociados</h3>
        {vehicles.length > 0 ? (
          <ul className="divide-y divide-gray-300">
            {vehicles.map((vehicle, index) => (
              <li key={index}>
                {" - "}
                <span className="font-semibold">
                  {vehicle.licensePlate}
                </span>{" "}
                <span className="text-gray-700">{vehicle.manufacturer}</span>{" "}
                <span className="text-gray-700">{vehicle.model}</span>{" "}
                <span className="text-gray-700">({vehicle.modelYear})</span>{" "}
              </li>
            ))}
          </ul>
        ) : (
          <p>Sin vehículos asociados.</p>
        )}
        <button
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-4 py-2 mt-4 rounded"
          onClick={() => onCloseModal()}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default CustomerInfoModal;
