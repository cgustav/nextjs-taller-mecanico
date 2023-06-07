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
      <div>
        <h1>Crear Orden de Trabajo</h1>
      </div>
    </div>
  );
};

export default OrderCreate;
