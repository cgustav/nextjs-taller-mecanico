import Link from "next/link";
import FormHeader from "../../components/shared/form-header";
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks";
import {
  MechanicPersonnel,
  selectPersonnel,
} from "../../features/personnel/personnelSlice";
import ResponsiveButton from "../../components/shared/responsive-button";

function Personnel() {
  // Obtner el estado de la lista de personal desde el store
  const fetched_personnel = useAppSelector(selectPersonnel);

  // Control de estado para búsqueda de elementos de la tabla
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedField, setSelectedField] = useState("fullName");

  // Control de estado para paginación
  const itemsPerPage = 10; // Número de elementos por página
  const [currentPage, setCurrentPage] = useState(1);

  // Calcular el índice inicial y final de los elementos a mostrar
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Filtrar los datos basado en el término de búsqueda y el campo seleccionado
  const filteredData = fetched_personnel.filter((item: any) =>
    item[selectedField].toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Obtener los elementos correspondientes a la página actual
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Cambiar a la página anterior
  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  // Cambiar a la página siguiente
  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="md:px-40 px-6">
      <header>
        <FormHeader
          id="header-personnel"
          text="Personal de trabajo"
          includeRoute={false}
        ></FormHeader>
      </header>

      <div className="w-full overflow-x-auto">
        <div className="flex w-full justify-between mb-4">
          {/* Create Item Component */}
          <div className="md:mr-0 mr-2">
            <Link href={`/personnel/create`}>
              <ResponsiveButton
                textSm="Añadir"
                text="Añadir Personal"
                theme="warning"
              ></ResponsiveButton>
            </Link>
          </div>

          {/* Search Items Component */}
          <div className="flex flex-row mb-4">
            <input
              type="text"
              className="border border-gray-300 rounded-l px-4 py-2 w-full"
              placeholder="Buscar..."
              // value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="border border-l-0 border-gray-300 rounded-r px-4 py-2"
              // value={selectedField}
              onChange={(e) => setSelectedField(e.target.value)}
            >
              <option value="fullName">Nombre</option>
              <option value="rut">Rut</option>
              {/* <option value="responsibleMechanic">Mecánico a Cargo</option> */}
            </select>
          </div>
        </div>

        <table className="min-w-full bg-white mt-4 pl-6 md:pl-0">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-200 font-semibold text-left">
                ID
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-200 font-semibold text-left">
                Nombre
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-200 font-semibold text-left">
                Rut
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-200 font-semibold text-left">
                Especialidad
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-200 font-semibold text-left">
                Estado
              </th>
              {/* <th className="px-6 py-3 border-b-2 border-gray-200 font-semibold text-left">
                Costo
              </th> */}

              <th className="px-6 py-3 border-b-2 border-gray-200 font-semibold text-left">
                Acción
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item: any) => (
              <tr key={item.id}>
                <td className="px-6 py-4 border-b border-gray-200 text-gray-700">
                  {/* {"Chuink"} */}
                  {item.id.slice(0, 4)}
                </td>
                <td className="px-6 py-4 border-b border-gray-200">
                  {/* {item.licensePlate} */}
                  {/* {"Chuink"} */}
                  {item.fullName}
                </td>
                <td className="px-6 py-4 border-b border-gray-200">
                  {/* {item.deliveryDate} */}
                  {/* {"Chuink"} */}
                  {item.rut}
                </td>
                <td className="px-6 py-4 border-b border-gray-200">
                  {/* {(item.items[0] as string).substring(0, 20) || ""} */}
                  {/* {"Chuink"} */}
                  {item.specialty}
                </td>

                <td className="px-6 py-4 border-b border-gray-200">
                  {/* {numeral(item.cost).format("$0,0")} */}
                  {/* {"Chuink"} */}
                  {item.isActive ? "Activo" : "Inactivo"}
                </td>
                <td>
                  <Link
                    href={`/personnel/detail?workerId=${item.id}`}
                    className="px-6 py-4 pb-4 text-blue-500 hover:underline"
                  >
                    <span className="">Ver</span>
                  </Link>

                  {/* <Link
                    href={`/orders/detail?orderId=${item.id}`}
                    className="px-6 py-4 pb-4 text-blue-500 hover:underline"
                  >
                    <span className="">Desactivar</span>
                  </Link> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col">
        <div className="flex flex-row justify-center mt-4 md:mt-8 text-gray-500">
          {/* <span className="mr-2">Página</span> */}
          <span className="mr-2">{currentPage}</span>
          <span className="mr-2">de</span>
          <span>{totalPages}</span>
        </div>

        <div className="flex justify-center mt-8 md:mt-4">
          <button
            className="px-4 py-2 border border-gray-300 rounded mr-2"
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          <button
            className="px-4 py-2 border border-gray-300 rounded ml-2"
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}

export default Personnel;
