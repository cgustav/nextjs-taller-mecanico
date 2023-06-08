// import React from "react";
// import numeral from "numeral";

// const OrderDetails = ({ order }) => {
//   return (
//     <div className="bg-white rounded p-4 shadow-md">
//       <h2 className="text-xl font-bold mb-4">
//         Detalles de la Orden de Trabajo
//       </h2>
//       <div className="mb-2">
//         <strong>ID:</strong> {order.id}
//       </div>
//       <div className="mb-2">
//         <strong>Fecha de Recepción:</strong> {order.fecha_recepcion}
//       </div>
//       <div className="mb-2">
//         <strong>Fecha de Entrega:</strong> {order.fecha_entrega}
//       </div>
//       <div className="mb-2">
//         <strong>Patente del Vehículo:</strong> {order.patente_vehiculo}
//       </div>
//       <div className="mb-2">
//         <strong>Concepto:</strong> {order.concepto}
//       </div>
//       <div className="mb-2">
//         <strong>Mecánico a Cargo:</strong> {order.mecanico_a_cargo}
//       </div>
//       <div className="mb-2">
//         <strong>Costo Estimado:</strong>{" "}
//         {numeral(order.costo_estimado).format("$0,0")}
//       </div>
//     </div>
//   );
// };

// export default OrderDetails;

const OrderCreate = () => {
  return (
    <div className="flex items-center justify-center py-4 md:py-2">
      <div className="bg-white rounded-lg shadow-lg px-6 py-8 max-w-md mx-auto mt-16">
        <h1 className="font-bold text-2xl my-4 text-center text-blue-600">KRP Services</h1>
        <hr className="mb-2" />
        <div className="flex justify-between mb-6">
          <h1 className="text-lg font-bold">Invoice</h1>
          <div className="text-gray-700">
            <div>Date: 01/05/2023</div>
            <div>Invoice #: INV12345</div>
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4">Bill To:</h2>
          <div className="text-gray-700 mb-2">John Doe</div>
          <div className="text-gray-700 mb-2">123 Main St.</div>
          <div className="text-gray-700 mb-2">Anytown, USA 12345</div>
          <div className="text-gray-700">johndoe@example.com</div>
        </div>
        <table className="w-full mb-8">
          <thead>
            <tr>
              <th className="text-left font-bold text-gray-700">Description</th>
              <th className="text-right font-bold text-gray-700">Amount</th>
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
        <div className="text-gray-700 mb-2">Thank you for your business!</div>
        <div className="text-gray-700">Please remit payment within 30 days.</div>
      </div>
    </div>
  );
};

export default OrderCreate;
