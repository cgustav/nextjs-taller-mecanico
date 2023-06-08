import FormHeader from "../../components/shared/form-header";
import ResponsiveButton from "../../components/shared/responsive-button";
import Link from "next/link";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks";
import {
  Customer,
  removeCustomer,
  selectCustomers,
} from "../../features/customers/customerSlice";
import ConfirmationAlert from "../../components/shared/confirm-alert";
import { regular, solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import CustomerInfoModal from "../../components/customers/infoModal/modal";
import { Vehicle, selectVehicles } from "../../features/vehicles/vehicleSlice";

function Customers() {
  const dispatch = useAppDispatch();
  const customers = useAppSelector(selectCustomers);
  const vehicles = useAppSelector(selectVehicles);

  console.log("Fetching customers: ", customers);

  const [searchTerm, setSearchTerm] = useState("");
  // const [selectedField, setSelectedField] = useState("fullName");

  const [targetCustomerId, setTargetCustomerId] = useState<string>("");
  const [targetCustomer, setTargetCustomer] = useState<any>({});

  const [showDeletionCustomerAlert, setShowDeletionCustomerAlert] =
    useState(false);

  const [showInfoModal, setShowInfoModal] = useState(false);

  const handleShowCustomerDetails = (customer: Customer) => {
    console.log("Showing customer details: ", customer);
    setTargetCustomer(customer);
    setShowInfoModal(true);
  };

  const handleHideCustomerDetails = () => {
    setShowInfoModal(false);
  };

  const handleCustomerDeletion = () => {
    dispatch(removeCustomer(targetCustomerId));
    // Remove associated vehicles
    setShowDeletionCustomerAlert(false);
  };

  const handleShowDeletionCustomerAlert = (customer: Customer) => {
    console.log("Deleting customer: ", customer);
    setTargetCustomerId(customer.id);
    setShowDeletionCustomerAlert(true);
  };

  const shouldBeFiltered = (customer: Customer) => {
    // const nameMatches = customer.fullName.match(new RegExp(searchTerm, 'ig'));
    const nameMatches = new RegExp(searchTerm, "ig").test(customer.fullName);
    // const rutMatches = customer.rut.match(new RegExp(searchTerm, 'ig'));
    const rutMatches = new RegExp(searchTerm, "ig").test(customer.rut);
    // const emailMatches = customer.email.match(new RegExp(searchTerm, 'ig'));
    const emailMatches = new RegExp(searchTerm, "ig").test(customer.email);
    return nameMatches || rutMatches || emailMatches;
  };

  return (
    <div className="md:px-40 px-6">
      {showInfoModal && (
        <CustomerInfoModal
          onCloseModal={handleHideCustomerDetails}
          clientData={targetCustomer}
          vehicles={(vehicles as Vehicle[]).filter(
            (vehicle) => vehicle.ownerId == targetCustomer.id
          )}
        />
      )}
      {showDeletionCustomerAlert != false && (
        <ConfirmationAlert
          message="Confirma eliminación? Esta acción no se puede deshacer. Todos los vehículos asociados a este cliente serán desactivados."
          icon={regular("circle-check")}
          onCancel={() => setShowDeletionCustomerAlert(false)}
          onConfirm={handleCustomerDeletion}
          confirmButtonText="Eliminar"
        />
      )}
      <header>
        <FormHeader
          id="header-vehiculos"
          text="Clientes"
          includeRoute={false}
        ></FormHeader>
      </header>

      <div className="flex w-full justify-between mb-4">
        {/* Create Item Component */}
        <div className="md:mr-0 mr-2">
          <Link href={`/customers/create`}>
            <ResponsiveButton
              textSm="Crear"
              text="Crear Nuevo"
              theme="success"
            ></ResponsiveButton>
          </Link>
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
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {customers.map((customer: Customer) => {
            if (!shouldBeFiltered(customer)) return;
            return (
              <div className="divide-y divide-gray-100 rounded-md border border-gray-200">
                <div className="flex items-center gap-x-6 p-4">
                  <img
                    className="h-16 w-16 rounded-full"
                    src="https://i.pravatar.cc/300"
                    alt=""
                  />
                  <div>
                    <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                      {customer.fullName}
                    </h3>
                    <p className="text-sm font-semibold leading-6 text-indigo-600">
                      {customer.email}
                    </p>
                  </div>
                </div>

                <div className="w-full grid grid-cols-3 divide-x divide-gray-100 text-center">
                  <button
                    type="button"
                    className="text-gray-900 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    onClick={() => handleShowCustomerDetails(customer)}
                  >
                    Ver
                  </button>

                  <Link
                    href={{
                      pathname: "/customers/create",
                      query: { customerId: customer.id },
                    }}
                  >
                    <button
                      type="button"
                      className="text-gray-900 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      Editar
                    </button>
                  </Link>

                  <button
                    type="button"
                    className="text-gray-900 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    onClick={() => handleShowDeletionCustomerAlert(customer)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Customers;
