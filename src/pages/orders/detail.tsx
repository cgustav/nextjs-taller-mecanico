import React, { useState, useEffect } from "react";
import numeral from "numeral";
import {
  WorkOrder,
  WorkOrderStatus,
  getOrderById,
  selectOrders,
} from "../../features/orders/orderSlice";
import FormHeader from "../../components/shared/form-header";
import ResponsiveButton from "../../components/shared/responsive-button";
import CreateBillingModal from "../../components/billings/createBillingModal/modal";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { useRouter } from "next/router";

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

  // Fetch order from API from store
  const [order, setOrder] = useState<Partial<WorkOrder>>({});

  const { orderId } = router.query;

  console.log("orderId", orderId);

  useEffect(() => {
    console.log("useEffect");
    if (orderId && orderId.length && typeof orderId === "string") {
      console.log("validating orderId");
      const foundOrder = getOrderById(fetched_orders, orderId);

      console.log(
        "Found order",
        foundOrder,
        "fetched_orders",
        fetched_orders
        // "orderId",
        // orderId,
        // "typeof orderId",
        // typeof orderId,
        // "orderId.length",
        // orderId.length,
        // 'orderId.length && typeof orderId === "string"',
        // orderId.length && typeof orderId === "string"
      );
      if (!foundOrder) {
        router.push("/404");
      } else {
        setOrder(foundOrder);
      }
    } else {
      router.push("/orders");
    }
  }, [orderId, fetched_orders]);

  const [showVentanaEmergente, setShowVentanaEmergente] = useState(false);

  const openVentanaEmergente = () => {
    setShowVentanaEmergente(true);
  };

  const closeVentanaEmergente = () => {
    console.log("closeVentanaEmergente");
    setShowVentanaEmergente(false);
  };

  const onCreateBilling = () => {
    console.log("onCreateBilling");
    openVentanaEmergente();
  };

  const onCompleteOrder = () => {
    console.log("onCompleteOrder");
  };

  const onCancelOrder = () => {
    console.log("onCancelOrder");
  };

  const labelMappping = {
    id: "ID",
    receiptDate: "Fecha de recepción",
    deliveryDate: "Fecha de entrega",
    licensePlate: "Patente",
    items: "Servicios",
    responsibleMechanic: "Mecánico responsable",
    responsibleMechanicId: "ID Mecánico",
    notes: "Notas",
    status: "Estado",
    cost: "Costo",
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
    //   <SummaryRow
    // label={labelMappping[key]}

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

  return (
    <div className="flex items-center justify-center py-4 md:py-2">
      {showVentanaEmergente && (
        <CreateBillingModal
          onClose={() => closeVentanaEmergente()}
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
              ></ResponsiveButton>
            )}

            {order.status !== WorkOrderStatus.BILLED &&
              order.status !== WorkOrderStatus.CANCELLED && (
                <ResponsiveButton
                  textSm="Cancelar"
                  text="Cancelar orden"
                  theme="danger"
                ></ResponsiveButton>
              )}

            {order.status == WorkOrderStatus.BILLED && (
              <ResponsiveButton
                textSm="Ver factura"
                text="Ver factura"
                theme="success"
              ></ResponsiveButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
