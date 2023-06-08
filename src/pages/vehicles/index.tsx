import { useAppSelector, useAppDispatch } from "../../hooks";
import {
  Vehicle,
  removeVehicle,
  selectVehicles,
} from "../../features/vehicles/vehicleSlice";
import { useState, useEffect } from "react";

import Link from "next/link";
import Image from "next/image";
import { regular, solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import FormHeader from "../../components/shared/form-header";
import ConfirmationAlert from "../../components/shared/confirm-alert";

const separatorStyle = {
  width: "3px",
  height: "3px",
  backgroundColor: "gray",
  borderRadius: "50%",
};

function Vehicles() {
  const dispatch = useAppDispatch();
  const vehicles = useAppSelector(selectVehicles);

  /**
   * Hook para actualizar el estado para mostrar el mensaje de alerta
   * cuando se crea o edita un vehículo.
   */
  const [showDeletionVehicleAlert, setShowDeletionVehicleAlert] =
    useState(false);

  const [targetVehicleId, setTargetVehicleId] = useState<string>("");

  // const status = useAppSelector(selectVehicles);

  //   const { data, loading, error } = useQuery(VEHICLES_QUERY);

  // if (status === MODULE_STATUS.LOADING) return <p>Loading...</p>;
  // if (status === MODULE_STATUS.FAILED) return <p>Error :(</p>;

  const handleVehicleDeletion = (vehicle: Vehicle) => {
    console.log("Deleting vehicle: ", vehicle);
    setTargetVehicleId(vehicle.id);
    setShowDeletionVehicleAlert(true);
  };

  const handleConfirmVehicleDeletion = () => {
    if (targetVehicleId) {
      console.log("Deleting vehicle: ", targetVehicleId);
      dispatch(removeVehicle(targetVehicleId));
      setShowDeletionVehicleAlert(false);
    }
  };

  const handleCancelVehicleDeletion = () => {
    setShowDeletionVehicleAlert(false);
  };

  console.log("Fetching vehicles: ", vehicles);
  console.log("Vehicles Type: ", typeof vehicles);

  return (
    <div className="flex items-center justify-center py-4 md:py-2">
      <div className="px-6">
        {showDeletionVehicleAlert != false && (
          <ConfirmationAlert
            message="Confirma que desea eliminar el vehículo? Esta acción no se puede deshacer."
            icon={regular("circle-check")}
            onCancel={handleCancelVehicleDeletion}
            onConfirm={handleConfirmVehicleDeletion}
            confirmButtonText="Eliminar"
          />
        )}

        <header>
          <FormHeader
            id="header-vehiculos"
            text="Vehículos registrados"
            includeRoute={false}
          ></FormHeader>
        </header>

        <div className="w-full overflow-x-auto">
          <div className="flex justify-between mb-4">
            <div>
              <Link href="/vehicles/create">
                <button
                  className="px-4 py-2 border border-amber-700 rounded text-amber-700"
                  // onClick={handleCreate}
                >
                  Crear Nuevo
                </button>
              </Link>
            </div>
          </div>
          {/* <Link
          href="/vehicles/create"
          className="bg-sky-600 text-white px-2 py-1 rounded-sm text-sm shadow-sm"
        >
          Crear Vehículo
        </Link> */}

          <div className="py-2 mt-6"></div>

          {vehicles.length === 0 && (
            <div className="flex flex-col items-center justify-center">
              <div className="text-4xl text-gray-500 font-bold">
                No hay vehículos registrados
              </div>
              <div className="text-2xl text-gray-500 font-bold">
                Crea un vehículo para comenzar
              </div>
            </div>
          )}

          <div className="min-w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-4">
            {vehicles.map((vehicle: Vehicle) => (
              <div className="bg-white rounded-lg shadow-md p-4">
                <Image
                  className="w-full rounded-lg mb-4"
                  src="/generic-vehicle.jpeg"
                  alt="me"
                  width="120"
                  height="120"
                />

                {/* <h2 className="text-lg font-bold mb-2 text-zinc-700 ">
              {vehicle.licensePlate}
            </h2> */}

                <div className="flex flex-row justify-start text-zinc-700 text-md gap-x-2">
                  <h2 className="text-lg font-bold mb-2 text-zinc-700">
                    {vehicle.licensePlate}
                  </h2>
                  <div className="text-gray-500 text-smleading-5">
                    {vehicle.manufacturer} {vehicle.model}{" "}
                  </div>
                </div>

                {/* <p className="mb-4">Contenido de la tarjeta 1</p> */}
                <div className="flex flex-row items-center text-gray-500 text-md gap-x-1">
                  <p>Color {vehicle.color || "Blanco"}</p>
                  <div style={separatorStyle} className=""></div>
                  <p>{vehicle.modelYear || "2021"}</p>
                </div>
                <div className="flex flex-row items-center text-gray-500 text-md gap-x-1 mb-4">
                  <p>Cliente</p> <div style={separatorStyle} className=""></div>
                  <p>{vehicle.ownerFullName.slice(0, 10)}</p>
                </div>

                <div className="flex flex-row items-center text-gray-500 text-sm gap-x-2">
                  <p>0 órdenes activa(s)</p>{" "}
                  <div style={separatorStyle} className=""></div>
                  <p>{"Sin deuda"}</p>
                </div>

                <div className="flex justify-end">
                  {/* <button
                    className="text-rose-700 hover:text-rose-900 font-bold py-2 px-4 rounded"
                    onClick={() => handleVehicleDeletion(vehicle)}
                  >
                    Ver
                  </button> */}

                  <Link
                    href={{
                      pathname: "/vehicles/create",
                      query: { vehicleId: vehicle.id },
                    }}
                  >
                    <button className="text-teal-700 hover:text-teal-900 font-bold py-2 px-4 rounded mr-2">
                      Editar
                    </button>
                  </Link>
                  <button
                    className="text-rose-700 hover:text-rose-900 font-bold py-2 px-4 rounded"
                    onClick={() => handleVehicleDeletion(vehicle)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* <ul role="list" className="divide-y divide-gray-100"> */}

        {/* </ul> */}
      </div>
    </div>
  );
}

export default Vehicles;
