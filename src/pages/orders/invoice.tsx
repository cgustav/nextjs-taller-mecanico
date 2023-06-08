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
      <div className="bg-white rounded-lg shadow-lg px-8 py-10 max-w-xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <img className="h-8 w-8 mr-2" src="https://tailwindflex.com/public/images/logos/favicon-32x32.png"
              alt="Logo" />
            <div className="text-gray-700 font-semibold text-lg">Your Company Name</div>
          </div>
          <div className="text-gray-700">
            <div className="font-bold text-xl mb-2">INVOICE</div>
            <div className="text-sm">Date: 01/05/2023</div>
            <div className="text-sm">Invoice #: INV12345</div>
          </div>
        </div>
        <div className="border-b-2 border-gray-300 pb-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Bill To:</h2>
          <div className="text-gray-700 mb-2">John Doe</div>
          <div className="text-gray-700 mb-2">123 Main St.</div>
          <div className="text-gray-700 mb-2">Anytown, USA 12345</div>
          <div className="text-gray-700">johndoe@example.com</div>
        </div>
        <table className="w-full text-left mb-8">
          <thead>
            <tr>
              <th className="text-gray-700 font-bold uppercase py-2">Description</th>
              <th className="text-gray-700 font-bold uppercase py-2">Quantity</th>
              <th className="text-gray-700 font-bold uppercase py-2">Price</th>
              <th className="text-gray-700 font-bold uppercase py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-4 text-gray-700">Product 1</td>
              <td className="py-4 text-gray-700">1</td>
              <td className="py-4 text-gray-700">$100.00</td>
              <td className="py-4 text-gray-700">$100.00</td>
            </tr>
            <tr>
              <td className="py-4 text-gray-700">Product 2</td>
              <td className="py-4 text-gray-700">2</td>
              <td className="py-4 text-gray-700">$50.00</td>
              <td className="py-4 text-gray-700">$100.00</td>
            </tr>
            <tr>
              <td className="py-4 text-gray-700">Product 3</td>
              <td className="py-4 text-gray-700">3</td>
              <td className="py-4 text-gray-700">$75.00</td>
              <td className="py-4 text-gray-700">$225.00</td>
            </tr>
          </tbody>
        </table>
        <div className="flex justify-end mb-8">
          <div className="text-gray-700 mr-2">Subtotal:</div>
          <div className="text-gray-700">$425.00</div>
        </div>
        <div className="text-right mb-8">
          <div className="text-gray-700 mr-2">Tax:</div>
          <div className="text-gray-700">$25.50</div>

        </div>
        <div className="flex justify-end mb-8">
          <div className="text-gray-700 mr-2">Total:</div>
          <div className="text-gray-700 font-bold text-xl">$450.50</div>
        </div>
        <div className="border-t-2 border-gray-300 pt-8 mb-8">
          <div className="text-gray-700 mb-2">Payment is due within 30 days. Late payments are subject to fees.</div>
          <div className="text-gray-700 mb-2">Please make checks payable to Your Company Name and mail to:</div>
          <div className="text-gray-700">123 Main St., Anytown, USA 12345</div>
        </div>
      </div>
    </div>
  );
};

export default OrderCreate;
