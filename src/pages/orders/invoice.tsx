import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import type { AppState } from "../../store";
import { selectBillings } from "../../features/billing/billingSlice";
import { DateUtils } from "../../utils/date.utils";
import { AuthorizationUtils } from "../../utils/authorization.utils";
import { USER_ROLES } from "../../features/auth/authSlice";

const findBillingByOrderId = (collection: any[], orderId: string) => {
  return (
    collection.find((billing: any) => billing.workOrder?.id === orderId) || null
  );
};

const InvoiceDetail = () => {
  const router = useRouter();
  const { orderId } = router.query;

  const baseBillings = useSelector(selectBillings);

  const [billing, setBillingState] = useState({
    id: "",
    billingNumber: "",
    issueDate: "",
    bussiness: {
      rut: "",
      name: "",
      commercialTurn: "",
      address: "",
      email: "",
      image: "",
      city: "",
    },
    customer: {
      id: "",
      rut: "",
      isLegalEntity: false,
      fullName: "",
      commercialTurn: "",
      address: "",
      city: "",
      phone: "",
      email: "",
    },
    workOrder: {
      id: "",
      receiptDate: "",
      deliveryDate: "",
      licensePlate: "",
      responsibleMechanic: "",
      responsibleMechanicId: "",
      cost: 0,
    },
    billing: "",
    netAmount: 0,
    fines: 0,
    otherTaxes: 0,
    subtotal: 0,
    iva: 0,
    totalAmount: 0,
  });

  useEffect(() => {
    console.log("CreateVehicle useEffect");

    // NOTE: Sin proteccion para permitir envio a través de
    // correo electronico (CU Hipotético)
    // AuthorizationUtils.useRoleGuard([USER_ROLES.ADMIN], router);

    if (orderId?.length) {
      const foundBilling = findBillingByOrderId(
        baseBillings,
        orderId as string
      );
      console.log("Found billing: ", foundBilling);

      if (foundBilling) {
        setBillingState(foundBilling);
        console.log("Setting billing state: ", foundBilling);
      }
    }
  }, [orderId, baseBillings]);

  return (
    <div className="flex items-center justify-center py-4 md:py-2">
      <div className="bg-white rounded-lg shadow-lg px-6 py-8 max-w-md mx-auto mt-16">
        <h2 className="font-bold text-2xl my-4 text-left text-blue-600">
          3BS Taller Mecánico Especializado EIRL.
        </h2>

        <div className="flex flex-col w-full text-gray-500 text-left gap-y-1 md:gap-y-2 mb-4">
          <span className="font-bold text-lg text-gray-800">
            {billing.bussiness.rut}
          </span>
          <span>{billing.bussiness.address}</span>
          <span>{billing.bussiness.city}</span>
          <span>{billing.bussiness.email}</span>
          <span>56 9362555111</span>
        </div>
        <hr className="mb-2" />
        <div className="flex justify-between mb-6">
          <h1 className="text-lg font-bold">Datos Factura</h1>
          <div className="text-gray-700">
            <div className="text-semibold italic text-gray-600">
              Fecha: {DateUtils.formatISOString(billing.issueDate)}
            </div>
            <div className="text-semibold italic text-gray-600">
              Número:{" "}
              <span className="text-gray-700 text-bold">
                {" "}
                #{billing.billingNumber}
              </span>
            </div>
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4">Facturar A:</h2>
          <div className="text-gray-700 mb-3">
            {billing.customer.isLegalEntity
              ? billing.customer.commercialTurn
              : billing.customer.fullName}
          </div>
          <div className="text-gray-700 mb-3">{billing.customer.address}</div>
          <div className="text-gray-700 mb-3">{billing.customer.city}</div>
          <div className="text-gray-700 mb-3">{billing.customer.email}</div>
        </div>

        <h2 className="text-lg font-bold mt-2 mb-4">Detalle:</h2>
        <table className="w-full h-full">
          <thead className="mb-4">
            <tr className="mb-4">
              <th className="text-left font-bold text-rose-800">Descripción</th>
              <th className="text-right font-bold text-rose-800">Monto</th>
            </tr>
          </thead>
          <div className="my-4"></div>
          <tbody>
            <tr className="my-6">
              <td className="text-left text-gray-700">{billing.billing}</td>
              <td className="text-right text-gray-700">
                ${billing.workOrder.cost}
              </td>
            </tr>
            <div className="md:my-6 my-4"></div>
            {/* <tr>
              <td className="text-left text-gray-700">Product 2</td>
              <td className="text-right text-gray-700">$50.00</td>
            </tr>
            <tr>
              <td className="text-left text-gray-700">Product 3</td>
              <td className="text-right text-gray-700">$75.00</td>
            </tr> */}
          </tbody>
          <tfoot>
            <tr className="border-b border-gray-200">
              <td className="text-left font-bold text-gray-700">Monto neto</td>
              <td className="text-right font-bold text-gray-700">
                ${billing.netAmount}
              </td>
            </tr>
            <div className="my-4"></div>
            <tr>
              {/* <div className="h-100"></div> */}
              <td className="text-left text-gray-700">Multas</td>
              <td className="text-right text-gray-700">${billing.fines}</td>
            </tr>

            <tr>
              <td className="text-left text-gray-700">Otros impuestos</td>
              <td className="text-right text-gray-700">
                ${billing.otherTaxes}
              </td>
            </tr>

            <tr className="border-b border-gray-200">
              <td className="text-left font-bold text-gray-700">Subtotal</td>
              <td className="text-right font-bold text-gray-700">
                ${billing.subtotal}
              </td>
            </tr>

            <div className="my-4"></div>

            <tr className="border-b border-gray-200">
              <td className="text-left text-gray-700">IVA</td>
              <td className="text-right text-gray-700">{billing.iva},0 %</td>
            </tr>

            <div className="my-4"></div>

            <tr className="border-b border-gray-200">
              <td className="text-left font-bold text-gray-700">Total</td>
              <td className="text-right font-bold text-gray-700">
                ${billing.totalAmount}
              </td>
            </tr>

            <div className="my-4"></div>
          </tfoot>
        </table>
        <div className="my-4"></div>
        {/* <div className="text-gray-700 mb-2">Thank you for your business!</div> */}
        <div className="italic text-gray-500">
          Por favor remita el pago antes de 30 días hábiles desde la fecha de
          emisión de esta factura.
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetail;
