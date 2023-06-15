import {
  Customer,
  addCustomer,
  selectCustomers,
  updateCustomer,
} from "../../features/customers/customerSlice";
import FormHeader from "../../components/shared/form-header";
import InputMask from "react-input-mask";
import { v4 as uuid } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import type { AppState } from "../../store";
import GreenAlert from "../../components/shared/green-alert";
import ErrorLabel from "../../components/shared/error-label";
import { CustomerTools } from "../../features/customers/tools";
import { selectVehicles } from "../../features/vehicles/vehicleSlice";
import {
  WorkOrder,
  WorkOrderStatus,
  addOrder,
  selectOrders,
  updateOrder,
} from "../../features/orders/orderSlice";
import { WorkOrderTools } from "../../features/orders/tools";
import { selectPersonnel } from "../../features/personnel/personnelSlice";
import { AuthorizationUtils } from "../../utils/authorization.utils";
import { USER_ROLES } from "../../features/auth/authSlice";

export interface CreateCustomerFormInputProps {
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
  disabled?: boolean;
}

function CreateFormInput(props: CreateCustomerFormInputProps) {
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

        {error && <ErrorLabel message={error} />}
      </div>
    </div>
  );
}

function CreateFormSelector(props: CreateFormSelectorProps) {
  const { id, label, inputName, options, onChange, value, error, disabled } =
    props;

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
            disabled={disabled}
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

const findOrderById = (collection: WorkOrder[], id: string) => {
  // Implementa la lógica para buscar el vehículo por su ID en el estado
  return collection.find((wo) => wo.id === id) || null;
};

function CreateWorkOrder() {
  const router = useRouter();
  const fetchedOrders = useSelector(selectOrders);
  const fetchedCustomers = useSelector(selectCustomers);
  const fetchedVehicles = useSelector(selectVehicles);
  const fetchedWorkers = useSelector(selectPersonnel);

  console.log("Fetched_customer: ", fetchedCustomers);
  console.log("Fetched_vehicles: ", fetchedVehicles);
  console.log("Fetched_orders: ", fetchedOrders);
  console.log("Fetched_workerss: ", fetchedOrders);

  /**
   * Estado del vehículo
   * (Se inicializa con un objeto vacío para que no se rompa el código al
   * intentar acceder a las propiedades del vehículo en el formulario
   * antes de que se cargue el vehículo desde el estado
   * y se actualice el estado del componente
   * con los datos del vehículo)
   */
  const [workOrder, setWorkOrderState] = useState({
    id: "",
    receiptDate: "",
    deliveryDate: "",
    customerId: "",
    customerFullName: "",
    vehicleId: "",
    vehicleLicensePlate: "",
    workerId: "",
    workerFullName: "",
    items: "",
    status: WorkOrderStatus.IN_PROGRESS,
    cost: 0,
    notes: "",
    createdAt: "",
  });

  /**
   * Hook para actualizar el estado para mostrar el mensaje de alerta
   * cuando se crea o edita un vehículo.
   */
  const [showAlert, setShowAlert] = useState(false);

  // Estado para almacenar los errores de validación
  const [errors, setErrors] = useState<any>({});

  const { workOrderId } = router.query;

  console.log("Query  customerId: ", workOrderId);
  const isEditing = workOrderId !== null && workOrderId !== undefined;
  console.log("Is editing: ", isEditing);

  const dispatch = useDispatch();

  //NOTE: Will only be executed at the time of initial
  //rendering and it will not be executed on component
  //re-rendering.
  useEffect(() => {
    AuthorizationUtils.useRoleGuard([USER_ROLES.ADMIN], router);
    console.log("CreateVehicle useEffect");

    if (workOrderId?.length && isEditing) {
      const foundOrder = findOrderById(fetchedOrders, workOrderId as string);
      console.log("Found order: ", foundOrder);

      if (foundOrder) {
        setWorkOrderState(foundOrder as any);
        console.log("Setting order state: ", foundOrder);
      }
    }

    //TEST ONLY

    // setErrors({
    //   licensePlate: "La placa ya existe",
    // });
  }, [workOrderId, fetchedOrders]);

  const handleOptionChange = (e: any) => {
    console.log("Event: ", e);
    const targetName = e.target.name;
    const selectedValue = e.target.value;

    console.log("handleOptionChange name: ", targetName);
    console.log("handleOptionChange value: ", selectedValue);

    const validationErrors = WorkOrderTools.validateWorkOrderData({
      ...workOrder,
      [targetName]: selectedValue,
    });

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

    setWorkOrderState((prevFormData) => ({
      ...prevFormData,
      [targetName]: selectedValue,
    }));
  };

  const handleChange = (e: any) => {
    console.log("handleChange e.target.name: ", e.target.name);
    let { name, value } = e.target;

    // if (name === "licensePlate") {
    //   value = value.toUpperCase();
    // }

    const validationErrors = WorkOrderTools.validateWorkOrderData({
      ...workOrder,
      [name]: value,
    });

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

    setWorkOrderState({
      ...workOrder,
      [name]: value,
    });
  };

  const handleTaskCreation = () => {
    workOrder.id = uuid();
    workOrder.createdAt = new Date().toISOString();

    workOrder.workerFullName =
      fetchedWorkers.find((worker: any) => worker.id === workOrder.workerId)
        ?.fullName || "";

    workOrder.customerFullName =
      fetchedCustomers.find(
        (customer: any) => customer.id === workOrder.customerId
      )?.fullName || "";

    workOrder.vehicleLicensePlate =
      fetchedVehicles.find((vehicle: any) => vehicle.id === workOrder.vehicleId)
        ?.licensePlate || "";

    console.log("[handleTaskCreation]: ", workOrder);
    dispatch(addOrder(workOrder));
  };

  const handleTaskUpdate = () => {
    console.log("[handleTaskUpdate]: ", workOrder);
    dispatch(updateOrder(workOrder));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("handleSubmit vehicle: ", workOrder);

    // Validar los datos del formulario antes de enviar
    const validationErrors = WorkOrderTools.validateWorkOrderData(workOrder);

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
    router.push("/orders");
  };

  return (
    <div className="px-6">
      {showAlert != false && (
        <GreenAlert
          message={
            isEditing
              ? "Orden actualizada exitosamente"
              : "Orden creada exitosamente"
          }
          onClose={onCloseAlert}
        />
      )}

      <header>
        <FormHeader
          id="header-registro-order"
          text="Registro de orden de trabajo"
          includeRoute={true}
        ></FormHeader>
      </header>

      <div className="w-full mb-6">
        {/* <h2 className="text-teal-900 font-black">Crear Vehículo</h2> */}

        <div>
          <form className="min-w-full">
            <CreateFormSelector
              id="cvf_wo_customer_id"
              label="Cliente"
              inputName="customerId"
              options={fetchedCustomers.map((custom: any) => ({
                value: custom.id,
                name: `(${custom.rut}) ${custom.fullName}`,
              }))}
              onChange={handleOptionChange}
              disabled={isEditing}
              value={workOrder.customerId}
              error={errors.customerId}
            />

            <CreateFormSelector
              id="cvf_wo_vehicle_id"
              label="Vehículo"
              inputName="vehicleId"
              options={fetchedVehicles
                .filter(
                  (vehicle: any) => vehicle.ownerId == workOrder.customerId
                )
                .map((vehicle: any) => ({
                  value: vehicle.id,
                  name: `[${vehicle.licensePlate}] ${vehicle.manufacturer} ${vehicle.model}`,
                }))}
              onChange={handleOptionChange}
              disabled={!workOrder.customerId.length}
              value={workOrder.vehicleId}
              error={errors.vehicleId}
            />

            <CreateFormSelector
              id="cvf_wo_worker_id"
              label="Trabajador responsable"
              inputName="workerId"
              options={fetchedWorkers
                .filter((work: any) => work.isActive)
                .map((worker: any) => ({
                  value: worker.id,
                  name: `(${worker.rut}) ${worker.fullName}`,
                }))}
              onChange={handleOptionChange}
              disabled={!workOrder.customerId.length}
              value={workOrder.workerId}
              error={errors.workerId}
            />

            <CreateFormInput
              id="cvf_wo_receipt_date"
              label="Trabajo a realizar"
              inputName="items"
              placeholder="Cambio de aceite, cambio de neumáticos, etc."
              maxLength={300}
              onChange={handleChange}
              value={workOrder.items}
              error={errors.items}
            />

            <CreateFormInput
              id="cvf_wo_receipt_date"
              label="Fecha de recepción"
              inputName="receiptDate"
              placeholder="01/01/2021"
              maxLength={10}
              onChange={handleChange}
              value={workOrder.receiptDate}
              error={errors.receiptDate}
            />

            <CreateFormInput
              id="cvf_wo_delivery_date"
              label="Fecha de entrega"
              inputName="deliveryDate"
              placeholder="01/01/2023"
              maxLength={10}
              onChange={handleChange}
              value={workOrder.deliveryDate}
              error={errors.deliveryDate}
            />

            <CreateFormInput
              id="cvf_wo_cost"
              label="Costo"
              inputName="cost"
              placeholder="25500"
              maxLength={8}
              onChange={handleChange}
              value={workOrder.cost}
              error={errors.cost}
            />

            <CreateFormInput
              id="cvf_wo_note"
              label="Notas"
              inputName="notes"
              placeholder="Pago por anticipado"
              maxLength={150}
              onChange={handleChange}
              value={workOrder.notes}
              error={errors.notes}
            />

            <div className="flex justify-center md:mt-4 mt-0">
              <button
                type="submit"
                onClick={handleSubmit}
                className="w-full md:w-4/5 bg-zinc-700 px-2 py-4 rounded-md text-sm self-center text-white hover:bg-zinc-900 transition duration-500 ease-in-out font-black"
              >
                {isEditing ? "Editar" : "Crear"} Orden
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateWorkOrder;
