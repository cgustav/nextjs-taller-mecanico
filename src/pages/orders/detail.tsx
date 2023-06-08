import React, { useState, useEffect } from "react";
import numeral from "numeral";
import {
  WorkOrder,
  WorkOrderStatus,
  getOrderById,
  removeOrder,
  selectOrders,
  updateOrder,
} from "../../features/orders/orderSlice";
import FormHeader from "../../components/shared/form-header";
import ResponsiveButton from "../../components/shared/responsive-button";
import CreateBillingModal from "../../components/billings/createBillingModal/modal";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { useRouter } from "next/router";
import ConfirmationAlert from "../../components/shared/confirm-alert";
import { regular } from "@fortawesome/fontawesome-svg-core/import.macro";
import { DateUtils } from "../../utils/date.utils";
import {
  Customer,
  selectCustomers,
} from "../../features/customers/customerSlice";
import Link from "next/link";
import { Billing, selectBillings } from "../../features/billing/billingSlice";

const debugMode = true;

export interface OrderDetailsInterface {
  order: any;
}

export interface SummaryRowProps {
  label: string;
  value: any;
  withDivider?: boolean;
}

const SummaryRow = ({ label, value, withDivider = true }: SummaryRowProps) => {
  return (
    // <div>
    <div className="flex flex-row justify-between gap-x-20 md:gap-x-40">
      <div className="font-bold mt-3">{label}</div>
      <div className="mt-3">{value}</div>
    </div>
    //   <hr className="my-4" />
    // </div>
  );
};

const OrderDetails = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const fetched_orders = useAppSelector(selectOrders) as WorkOrder[];
  const fetched_customers = useAppSelector(selectCustomers) as Customer[];
  const fetched_billings = useAppSelector(selectBillings) as Billing[];

  // Control de estado para actualización
  // de la orden de trabajo.
  const [order, setOrder] = useState<Partial<WorkOrder>>({});

  // Control de estado para mostrar/ocultar
  // la ventana emergente de creación de factura.
  const [showVentanaEmergente, setShowVentanaEmergente] = useState(false);

  const openVentanaEmergente = () => {
    setShowVentanaEmergente(true);
  };

  const closeVentanaEmergente = () => {
    console.log("closeVentanaEmergente");
    setShowVentanaEmergente(false);
  };

  // Control de estado para mostrar/ocultar
  // la ventana emergente de actualización de orden
  // (confirmación)
  const [showOrderUpdateModal, setShowOrderUpdateModal] = useState(false);

  const openOrderUpdateModal = () => {
    setShowOrderUpdateModal(true);
  };

  const closeOrderUpdateModal = () => {
    setShowOrderUpdateModal(false);
  };

  // Lectura del parámetro de ruta orderId
  // para obtener la orden de trabajo
  // correspondiente desde el estado global.
  const { orderId } = router.query;

  /**
   * useEffect para:
   * - Validar que orderId sea un string no vacío
   * - Validar que orderId sea un id de orden de trabajo válido
   * - Actualizar el estado de la orden de trabajo
   *   con la orden de trabajo encontrada.
   *
   */

  useEffect(() => {
    console.log("useEffect");
    if (orderId && orderId.length && typeof orderId === "string") {
      console.log("validating orderId");
      const foundOrder = getOrderById(fetched_orders, orderId);

      console.log("Found order", foundOrder, "fetched_orders", fetched_orders);
      if (!foundOrder) {
        router.push("/orders");
      } else {
        setOrder(foundOrder);
      }
    } else {
      router.push("/orders");
    }
  }, [orderId, fetched_orders]);

  /**
   * Inicia proceso de creación de factura.
   */
  const onCreateBilling = () => {
    console.log("onCreateBilling");
    openVentanaEmergente();
  };

  /**
   * Actualiza la orden de trabajo a
   * PENDIENTE (por pagar).
   *
   */
  const onCompleteOrder = () => {
    console.log("onCompleteOrder");
    const completedOrder = {
      ...order,
      status: WorkOrderStatus.PENDING,
    } as WorkOrder;
    setOrder(completedOrder);
    dispatch(updateOrder(completedOrder));
  };

  /**
   * Actualiza la orden de trabajo a
   * CANCELADO (no se podrá emitir factura).
   *
   */
  const onCancelOrder = () => {
    console.log("onCancelOrder");
    const cancelledOrder = {
      ...order,
      status: WorkOrderStatus.CANCELLED,
    } as WorkOrder;
    setOrder(cancelledOrder);
    dispatch(updateOrder(cancelledOrder));
  };

  const [updateModalConfig, setUpdateModalConfig] = useState({
    message: "",
    confirmButtonText: "Confirmar",
    cancelButtonText: "Cancelar",
    onConfirm: () => {},
    onClose: () => {},
  });

  const onUpdateBillingStatus = (statusTo: string) => {
    console.log("onUpdateBillingStatus");

    if (statusTo === WorkOrderStatus.PENDING) {
      setUpdateModalConfig({
        ...updateModalConfig,
        message: "¿Desea confirmar operación? No podrá deshacer cambios.",
        onConfirm: () => {
          onCompleteOrder();
          closeOrderUpdateModal();
        },
        onClose: () => closeOrderUpdateModal(),
      });
    }

    if (statusTo === WorkOrderStatus.CANCELLED) {
      setUpdateModalConfig({
        ...updateModalConfig,
        message:
          "¿Desea confirmar operación? No podrá emitir factura para esta orden.",
        onConfirm: () => {
          onCancelOrder();
          closeOrderUpdateModal();
        },
        onClose: () => {
          closeOrderUpdateModal();
        },
      });
    }

    openOrderUpdateModal();
  };

  const handleDeleteOrder = (orderId: string) => {
    console.log("handleDeleteOrder");
    dispatch(removeOrder(orderId));
    router.push("/orders");
  };

  const labelMappping = {
    id: "ID",
    receiptDate: "Fecha de recepción",
    deliveryDate: "Fecha de entrega",
    vehicleLicensePlate: "Patente",
    vehicleId: "ID Vehículo",
    items: "Servicios",
    workerFullName: "Mecánico responsable",
    workerId: "ID Mecánico",
    customerFullName: "Cliente",
    customerId: "ID Cliente",
    notes: "Notas",
    status: "Estado",
    cost: "Costo",
    createdAt: "Fecha ingreso",
  };

  // DEPRECATED
  // const order: WorkOrder = {
  //   id: "dskajdkasjdkjsadkjasd",
  //   receiptDate: "2021-10-01",
  //   deliveryDate: "2021-10-01",
  //   licensePlate: "ABC123",
  //   items: [
  //     "Cambio de aceite",
  //     "Cambio de filtro de aceite",
  //     "Cambio de filtro de aire",
  //     "Cambio de filtro de bencina",
  //   ],
  //   responsibleMechanic: "Juan Perez",
  //   responsibleMechanicId: "-",
  //   notes:
  //     "El auto tiene un ruido extraño desde hace mas de dos meses y el motor se calienta de manera frecuente.",
  //   status: WorkOrderStatus.PENDING,
  //   cost: 100000,
  // };

  const resolveStatusClass = (status: WorkOrderStatus) => {
    switch (status) {
      case WorkOrderStatus.PENDING:
        return "text-yellow-600 font-bold";
      case WorkOrderStatus.IN_PROGRESS:
        return "text-blue-600 font-bold";
      case WorkOrderStatus.BILLED:
        return "text-green-600 font-bold";
      case WorkOrderStatus.CANCELLED:
        return "text-red-700 font-bold";
      default:
        return "text-gray-500";
    }
  };

  const factoryOrderRow = (key: string, value: any) => {
    switch (key) {
      case "cost":
        return (
          <p className="text-teal-700 font-bold">
            {numeral(value).format("$0,0")}
          </p>
        );
      case "status":
        return <p className={resolveStatusClass(value)}>{value}</p>;

      case "notes":
        return (
          <div className="max-w-xs">
            <p className="text-gray-500 text-end">{value}</p>
          </div>
        );

      case "createdAt":
        return (
          <div className="max-w-xs">
            <p className="text-gray-500 text-end">
              {DateUtils.formatISOString(value)}
            </p>
          </div>
        );
      case "items":
        if (Array.isArray(value) && value.length > 1) {
          return (
            <div className="list-disc list-inside text-end">
              {value.map((concepto: any) => (
                <p className="text-gray-500">{concepto}</p>
              ))}
            </div>
          );
        } else {
          return <p className="text-gray-500">{value}</p>;
        }
      default:
        return <p className="text-gray-500">{value}</p>;
    }
  };

  const handleOnCompleteOrder = () => {
    console.log("handleOnCompleteOrder");
    setOrder({
      ...order,
      status: WorkOrderStatus.BILLED,
    } as WorkOrder);
    dispatch(updateOrder(order as WorkOrder));
    router.push("/orders/invoice?orderId=" + order.id);
  };

  return (
    <div className="flex items-center justify-center py-4 md:py-2">
      {showOrderUpdateModal && (
        <ConfirmationAlert
          icon={regular("question-circle")}
          message={updateModalConfig.message}
          onCancel={() => updateModalConfig.onClose()}
          onConfirm={() => updateModalConfig.onConfirm()}
          confirmButtonText={updateModalConfig.confirmButtonText}
          cancelButtonText={updateModalConfig.cancelButtonText}
        ></ConfirmationAlert>
      )}

      {showVentanaEmergente && (
        <CreateBillingModal
          onClose={() => closeVentanaEmergente()}
          onComplete={() => handleOnCompleteOrder()}
          workOrder={order as WorkOrder}
          customer={
            fetched_customers.find(
              (customer) => customer.id === order.customerId
            )!
          }
        ></CreateBillingModal>
      )}

      <div className="md:px-6">
        <header>
          <FormHeader
            id="header-vehiculos"
            text="Órden de trabajo"
            includeRoute={true}
          ></FormHeader>
        </header>

        <div className="flex flex-col bg-white rounded-lg px-7 py-7 shadow-lg">
          <h2 className="text-xl font-bold mb-4">
            Detalles de la orden de Trabajo
          </h2>
          <hr className="my-4" />
          <div className="flex flex-col gap-y-6 divide-y divide-dashed hover:divide-solid">
            {Object.entries(order).map(([key, value]) => (
              <SummaryRow
                label={(labelMappping as any)[key as string]}
                value={factoryOrderRow(key, value)}
              />
            ))}
          </div>
          <hr className="my-8 mt-14" />
          <div className="flex flex-row align-start gap-x-4">
            {order.status === WorkOrderStatus.PENDING && (
              <ResponsiveButton
                textSm="Facturar"
                text="Generar factura"
                theme="success"
                onClick={onCreateBilling}
              ></ResponsiveButton>
            )}

            {order.status === WorkOrderStatus.IN_PROGRESS && (
              <ResponsiveButton
                textSm="Completar"
                text="Completar orden"
                theme="warning"
                onClick={() => onUpdateBillingStatus(WorkOrderStatus.PENDING)}
              ></ResponsiveButton>
            )}

            {order.status !== WorkOrderStatus.BILLED &&
              order.status !== WorkOrderStatus.CANCELLED && (
                <ResponsiveButton
                  textSm="Cancelar"
                  text="Cancelar orden"
                  theme="danger"
                  onClick={() =>
                    onUpdateBillingStatus(WorkOrderStatus.CANCELLED)
                  }
                ></ResponsiveButton>
              )}

            {order.status == WorkOrderStatus.BILLED && (
              <Link
                href={`/orders/invoice?billingId=${fetched_billings.find(
                  (billing) => billing.workOrder.id === order.id
                )}`}
                className="px-6 py-4 pb-4 text-blue-500 hover:underline"
              >
                <ResponsiveButton
                  textSm="Ver factura"
                  text="Ver factura"
                  theme="success"
                ></ResponsiveButton>
              </Link>
            )}

            {debugMode && (
              <ResponsiveButton
                textSm="Eliminar orden"
                text="Eliminar orden"
                theme="danger"
                onClick={() => handleDeleteOrder(order.id!)}
              ></ResponsiveButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
