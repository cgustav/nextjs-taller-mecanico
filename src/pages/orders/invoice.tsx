import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import type { AppState } from "../../store";

const findBillingById = (state: AppState, id: string) => {
  return state.billings.find((billing: any) => billing.id === id) || null;
};

const InvoiceDetail = () => {
  const router = useRouter();
  const { billingId } = router.query;

  const baseBillings = useSelector((state: any) => state.billings);

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

    if (billingId?.length) {
      const foundBilling = findBillingById(
        baseBillings,
        billingId as string
      );
      console.log("Found billing: ", foundBilling);

      if (foundBilling) {
        setBillingState(foundBilling);
        console.log("Setting billing state: ", foundBilling);
      }
    }
  }, [billingId, baseBillings]);

  return (
    <div className="flex items-center justify-center py-4 md:py-2">
      <div className="bg-white rounded-lg shadow-lg px-6 py-8 max-w-md mx-auto mt-16">
        <h1 className="font-bold text-2xl my-4 text-center text-blue-600">
          3BS Taller Mecánico Especializado EIRL.
        </h1>
        <hr className="mb-2" />
        <div className="flex justify-between mb-6">
          <h1 className="text-lg font-bold">Invoice</h1>
          <div className="text-gray-700">
            <div>Fecha: {billing.issueDate}</div>
            <div>Número Factura: #{billing.billingNumber}</div>
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4">Facturar A:</h2>
          <div className="text-gray-700 mb-2">{billing.customer.isLegalEntity ? billing.customer.commercialTurn : billing.customer.fullName}</div>
          <div className="text-gray-700 mb-2">{billing.customer.address}</div>
          <div className="text-gray-700 mb-2">{billing.customer.city}</div>
          <div className="text-gray-700">{billing.customer.email}</div>
        </div>
        <table className="w-full mb-8">
          <thead>
            <tr>
              <th className="text-left font-bold text-gray-700">Descripción</th>
              <th className="text-right font-bold text-gray-700">Monto</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-left text-gray-700">Product 1</td>
              <td className="text-right text-gray-700">$100.00</td>
            </tr>
            <tr>
              <td className="text-left text-gray-700">Product 2</td>
              <td className="text-right text-gray-700">$50.00</td>
            </tr>
            <tr>
              <td className="text-left text-gray-700">Product 3</td>
              <td className="text-right text-gray-700">$75.00</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td className="text-left font-bold text-gray-700">Total</td>
              <td className="text-right font-bold text-gray-700">$225.00</td>
            </tr>
          </tfoot>
        </table>
        {/* <div className="text-gray-700 mb-2">Thank you for your business!</div> */}
        <div className="text-gray-700">
          Por favor remita el pago antes de 30 días.
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetail;
