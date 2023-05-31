import { useAppSelector, useAppDispatch } from "../../hooks";
import { MODULE_STATUS } from "../../store";
import { Vehicle, selectVehicles } from "../../features/vehicles/vehicleSlice";

import Link from "next/link";
import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import FormHeader from "../../components/shared/form-header";

const separatorStyle = {
  width: "3px",
  height: "3px",
  backgroundColor: "gray",
  borderRadius: "50%",
};

function Vehicles() {
  const dispatch = useAppDispatch();
  const vehicles = useAppSelector(selectVehicles);
  // const status = useAppSelector(selectVehicles);

  //   const { data, loading, error } = useQuery(VEHICLES_QUERY);

  // if (status === MODULE_STATUS.LOADING) return <p>Loading...</p>;
  // if (status === MODULE_STATUS.FAILED) return <p>Error :(</p>;

  console.log("Fetching vehicles: ", vehicles);
  console.log("Vehicles Type: ", typeof vehicles);

  return (
    <div>
      <header>
        <h2>Vehículos</h2>
        <Link
          href="/vehicles/create"
          className="bg-sky-600 text-white px-2 py-1 rounded-sm text-sm shadow-sm"
        >
          Crear Vehículo
        </Link>
      </header>

      <FormHeader
        id="header-vehiculos"
        text="Vehículos registrados"
        includeRoute={false}
      ></FormHeader>

      <div className="py-2"></div>

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {vehicles.map((vehicle: Vehicle) => (
          <div className="bg-white rounded-lg shadow-lg p-4">
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
              <p>{"Juan Pérez"}</p>
            </div>

            <div className="flex flex-row items-center text-gray-500 text-sm gap-x-2">
              <p>0 órdenes activa(s)</p>{" "}
              <div style={separatorStyle} className=""></div>
              <p>{"Sin deuda"}</p>
            </div>

            <div className="flex justify-end">
              <button className="text-teal-700 hover:text-teal-900 font-bold py-2 px-4 rounded mr-2">
                Editar
              </button>
              <button className="text-rose-700 hover:text-rose-900 text-white font-bold py-2 px-4 rounded">
                Eliminar
              </button>
            </div>
          </div>
        ))}

        {/* <div className="bg-white rounded-lg shadow-lg p-4">
          <Image
            className="w-full rounded-lg mb-4"
            src="/generic-vehicle.jpeg"
            alt="me"
            width="120"
            height="120"
          />
          <h2 className="text-lg font-bold mb-2">Título 2</h2>
          <p className="mb-4">Contenido de la tarjeta 2</p>
          <div className="flex justify-end">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
              Botón 1
            </button>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Botón 2
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-4">
          <Image
            className="w-full rounded-lg mb-4"
            src="/generic-vehicle.jpeg"
            alt="me"
            width="120"
            height="120"
          />
          <h2 className="text-lg font-bold mb-2">Título 3</h2>
          <p className="mb-4">Contenido de la tarjeta 3</p>
          <div className="flex justify-end">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
              Botón 1
            </button>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Botón 2
            </button>
          </div>
        </div> */}
      </div>

      {/* <ul role="list" className="divide-y divide-gray-100"> */}

      {/* </ul> */}
    </div>
  );
}

export default Vehicles;
