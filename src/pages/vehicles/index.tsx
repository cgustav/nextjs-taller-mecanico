import { useAppSelector, useAppDispatch } from "../../hooks";
import { MODULE_STATUS } from "../../store";
import { Vehicle, selectVehicles } from "../../features/vehicles/vehicleSlice";
// import { Link } from "react-router-dom";
import Link from "next/link";

function Vehicles() {
  const dispatch = useAppDispatch();
  const vehicles = useAppSelector(selectVehicles);
  const status = useAppSelector(selectVehicles);

  //   const { data, loading, error } = useQuery(VEHICLES_QUERY);

  if (status === MODULE_STATUS.LOADING) return <p>Loading...</p>;
  if (status === MODULE_STATUS.FAILED) return <p>Error :(</p>;

  return (
    <div>
      <header>
        <h2>Vehículos</h2>
        <Link
          href="/vehicles/create"
          className="bg-sky-600 text-white px-2 py-1 rounded-sm text-sm shadow-sm"
        >
          Crear Tarea
        </Link>
      </header>

      <ul>
        {!vehicles.length ? (
          <p>Aún sin vehículos</p>
        ) : (
          vehicles.map((vehicle: Vehicle) => (
            <li key={vehicle.id}>
              [{vehicle.licensePlate}] {vehicle.manufacturer} - {vehicle.model}{" "}
              - {} -
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default Vehicles;
