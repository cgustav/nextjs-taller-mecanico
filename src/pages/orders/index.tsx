import { useState } from "react";
import FormHeader from "../../components/shared/form-header";
import numeral from "numeral";
import Link from "next/link";

function Orders() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedField, setSelectedField] = useState("patente_vehiculo");

  const itemsPerPage = 10; // Número de elementos por página
  const [currentPage, setCurrentPage] = useState(1);

  const data = [
    {
      id: 1,
      fecha_recepcion: "2023-05-01",
      fecha_entrega: "2023-05-10",
      patente_vehiculo: "ABC123",
      concepto: "Cambio de aceite",
      mecanico_a_cargo: "John Doe",
      costo_estimado: 12500,
    },
    // ... más órdenes de trabajo
  ];

  // Filtrar los datos basado en el término de búsqueda
  //   const filteredData = data.filter((item) =>
  //     item.patente_vehiculo.toLowerCase().includes(searchTerm.toLowerCase())
  //   );

  // Calcular el índice inicial y final de los elementos a mostrar
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Filtrar los datos basado en el término de búsqueda y el campo seleccionado
  const filteredData = data.filter((item: any) =>
    item[selectedField].toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Obtener los elementos correspondientes a la página actual
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  //   const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Calcular el número total de páginas
  //   const totalPages = Math.ceil(data.length / itemsPerPage);

  // Calcular el número total de páginas
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
    <div className="px-6">
      <header>
        <FormHeader
          id="header-vehiculos"
          text="Órdenes de trabajo"
          includeRoute={false}
        ></FormHeader>
      </header>

      <h3 className="mt-4 text-center">En construcción...</h3>

      {/* <div className="w-4/6"> */}
      <div className="w-full overflow-x-auto">
        <div className="flex flex-row mb-4">
          <input
            type="text"
            className="border border-gray-300 rounded-l px-4 py-2 w-full"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="border border-l-0 border-gray-300 rounded-r px-4 py-2"
            value={selectedField}
            onChange={(e) => setSelectedField(e.target.value)}
          >
            <option value="patente_vehiculo">Patente Vehículo</option>
            <option value="concepto">Concepto</option>
            <option value="mecanico_a_cargo">Mecánico a Cargo</option>
          </select>
        </div>

        <table className="min-w-full bg-white mt-4">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-200 font-semibold text-left">
                ID
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-200 font-semibold text-left">
                Fecha Recepción
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-200 font-semibold text-left">
                Fecha Entrega
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-200 font-semibold text-left">
                Patente Vehículo
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-200 font-semibold text-left">
                Concepto
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-200 font-semibold text-left">
                Mecánico a cargo
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-200 font-semibold text-left">
                Costo
              </th>

              <th className="px-6 py-3 border-b-2 border-gray-200 font-semibold text-left">
                Acción
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 border-b border-gray-200">
                  {item.id}
                </td>
                <td className="px-6 py-4 border-b border-gray-200">
                  {item.fecha_recepcion}
                </td>
                <td className="px-6 py-4 border-b border-gray-200">
                  {item.fecha_entrega}
                </td>
                <td className="px-6 py-4 border-b border-gray-200">
                  {item.patente_vehiculo}
                </td>
                <td className="px-6 py-4 border-b border-gray-200">
                  {item.concepto}
                </td>
                <td className="px-6 py-4 border-b border-gray-200">
                  {item.mecanico_a_cargo}
                </td>
                <td className="px-6 py-4 border-b border-gray-200">
                  {numeral(item.costo_estimado).format("$0,0")}
                </td>

                <td>
                  <Link
                    href={`/orders/detail/${item.id}`}
                    className="px-6 py-4 border-b border-gray-200 text-blue-500 hover:underline"
                  >
                    Ver Detalle
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-4">
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
  );
}

export default Orders;
