import { useEffect, useState } from "react";
import FormHeader from "../../components/shared/form-header";
import numeral from "numeral";
import Link from "next/link";
import ResponsiveButton from "../../components/shared/responsive-button";
import { useAppSelector, useAppDispatch } from "../../hooks";
import {
  WorkOrderStatus,
  selectOrders,
} from "../../features/orders/orderSlice";
import { useRouter } from "next/router";
import { AuthorizationUtils } from "../../utils/authorization.utils";
import { USER_ROLES } from "../../features/auth/authSlice";
import ProtectedItem from "../../components/shared/protected-item";
import { getUser, getUserRole } from "../../features/auth/tools";
import { selectPersonnel } from "../../features/personnel/personnelSlice";

function Orders() {
  const fetched_personnel = useAppSelector(selectPersonnel);
  const fetched_orders = useAppSelector(selectOrders);
  console.log("Fetch orders: ", fetched_orders);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedField, setSelectedField] = useState("vehicleLicensePlate");

  const itemsPerPage = 10; // Número de elementos por página
  const [currentPage, setCurrentPage] = useState(1);

  // Calcular el índice inicial y final de los elementos a mostrar
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const authenticated = getUser();

  console.log("Authenticated role: ", authenticated.role);
  console.log("Authenticated id: ", authenticated.id);

  const foundPersonnel = fetched_personnel.find(
    (item: any) => item.email == authenticated.email
  );

  // console.log("Found personnel: ", foundPersonnel);

  // console.log(
  //   "Filtered fetched orders by worker id: ",
  //   fetched_orders.filter((item: any) => item.workerId == foundPersonnel.id)
  // );

  const orderItems =
    authenticated &&
    authenticated.role &&
    authenticated.role == USER_ROLES.PERSONNEL
      ? fetched_orders.filter((item: any) => item.workerId == foundPersonnel.id)
      : fetched_orders;

  // Filtrar los datos basado en el término de búsqueda y el campo seleccionado
  const filteredData = orderItems.filter((item: any) =>
    (item[selectedField] || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Obtener los elementos correspondientes a la página actual
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

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

  // Resolver el nombre de la clase CSS para el estado de la orden de trabajo
  const resolveStatusClassName = (status: string) => {
    switch (status) {
      case WorkOrderStatus.IN_PROGRESS:
        return "px-6 py-4 border-b border-gray-200 text-blue-500";
      case WorkOrderStatus.PENDING:
        return "px-6 py-4 border-b border-gray-200 text-yellow-500";
      case WorkOrderStatus.BILLED:
        return "px-6 py-4 border-b border-gray-200 text-green-500";
      case WorkOrderStatus.CANCELLED:
        return "px-6 py-4 border-b border-gray-200 text-red-500";
      default:
        return "px-6 py-4 border-b border-gray-200";
    }
  };

  const router = useRouter();

  useEffect(() => {
    AuthorizationUtils.useRoleGuard(
      [USER_ROLES.ADMIN, USER_ROLES.PERSONNEL],
      router
    );
  }, []);

  return (
    <div className="md:px-40 px-6">
      <header>
        <FormHeader
          id="header-work-orders"
          text="Órdenes de trabajo"
          includeRoute={false}
        ></FormHeader>
      </header>

      {/* <div className="w-4/6"> */}
      <div className="w-full overflow-x-auto">
        <div className="flex w-full justify-between mb-4">
          {/* Create Item Component */}
          <div className="md:mr-0 mr-2">
            <ProtectedItem whiteList={[USER_ROLES.ADMIN]}>
              <Link href={`/orders/create`}>
                <ResponsiveButton
                  textSm="Crear"
                  text="Crear Nueva"
                  theme="success"
                ></ResponsiveButton>
              </Link>
            </ProtectedItem>
          </div>

          {/* Search Items Component */}
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
              <option value="vehicleLicensePlate">Patente Vehículo</option>
              <option value="items">Concepto</option>
              <option value="workerFullName">Mecánico a Cargo</option>
            </select>
          </div>
        </div>

        {currentItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center">
            <div className="text-center text-4xl text-gray-500 font-bold mt-6">
              No hay ordenes encontradas
            </div>
            <div className="text-center text-xl text-gray-600 mt-4">
              {authenticated &&
              authenticated.role &&
              authenticated.role == USER_ROLES.PERSONNEL
                ? "Contáctese con la administración para la asignación de sus órdenes de trabajo."
                : "Ingrese una nuevo orden de trabajo para comenzar."}
            </div>
          </div>
        ) : (
          <table className="min-w-full bg-white mt-4 pl-6 md:pl-0">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b-2 border-gray-200 font-semibold text-left">
                  ID
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-200 font-semibold text-left">
                  Patente Vehículo
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-200 font-semibold text-left">
                  Fecha Entrega
                </th>

                <th className="px-6 py-3 border-b-2 border-gray-200 font-semibold text-left">
                  Concepto
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-200 font-semibold text-left">
                  Mecánico a cargo
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-200 font-semibold text-left">
                  Estado
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
              {currentItems.map((item: any) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 border-b border-gray-200 text-gray-700">
                    {item.id.substring(0, 4)}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200">
                    {item.vehicleLicensePlate}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200">
                    {item.deliveryDate}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200">
                    {(item.items as string).substring(0, 20) || ""}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200">
                    {item.workerFullName}
                  </td>
                  <td className={resolveStatusClassName(item.status)}>
                    {item.status}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 font-semibold text-gray-500">
                    {numeral(item.cost).format("$0,0")}
                  </td>

                  <td>
                    <Link
                      href={`/orders/detail?orderId=${item.id}`}
                      className="px-6 py-4 pb-4 text-blue-500 hover:underline"
                    >
                      <span className="">Ver</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {currentItems.length > 0 && (
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
      )}
    </div>
  );
}

export default Orders;
