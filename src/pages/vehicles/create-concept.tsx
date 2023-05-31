function RollVehicleForm() {
  return (
    <div>
      <div className="container mt-4">
        <h1>Registro de Vehículos</h1>
        <form>
          <div className="form-group">
            <label htmlFor="marca">Marca:</label>
            <input
              type="text"
              className="form-control"
              id="marca"
              placeholder="Ingrese la marca del vehículo"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="modelo">Modelo:</label>
            <input
              type="text"
              className="form-control"
              id="modelo"
              placeholder="Ingrese el modelo del vehículo"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="placa">Placa:</label>
            <input
              type="text"
              className="form-control"
              id="placa"
              placeholder="Ingrese la placa del vehículo"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Registrar
          </button>
        </form>
      </div>

      <footer className="bg-dark text-white text-center py-3">
        <p>Taller Mecánico &copy; 2023. Todos los derechos reservados.</p>
      </footer>

      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    </div>
  );
}

export default RollVehicleForm;

// {vehicles.map((vehicle: Vehicle) => (
//     // <li className="flex justify-between gap-x-6 py-5">
//     // <div className="flex gap-x-4">
//     <div className="grid grid-cols-4 gap-4">
//       <Image
//         className="h-18 w-18 flex-none rounded-full bg-gray-50 object-fill object-center"
//         src="/generic-vehicle.jpeg"
//         alt="me"
//         width="120"
//         height="120"
//       />
//       <div className="min-w-0 flex-auto">
//         {/* <div className="flex-row">
//               <p className="text-md font-semibold leading-6 text-gray-900">
//                 {vehicle.licensePlate}
//               </p>

//               <p className="mt-1 truncate text-smleading-5 text-gray-500">
//                 {vehicle.manufacturer} {vehicle.model} {vehicle.modelYear}
//               </p>
//             </div> */}

//         <div className="flex flex-row text-zinc-700 text-md gap-x-2">
//           <div className="font-semibold leading-6">
//             {vehicle.licensePlate}
//           </div>
//           <div className="text-gray-500 text-smleading-5">
//             {vehicle.manufacturer} {vehicle.model}{" "}
//             {vehicle.color || "Blanco"} ({vehicle.modelYear || "2021"})
//           </div>
//         </div>

//         <div className="flex flex-row items-center text-gray-500 text-sm gap-x-2">
//           <p>Cliente</p> <div style={separatorStyle} className=""></div>
//           <p>{"Juan Pérez"}</p>
//         </div>

//         <div className="flex flex-row items-center text-gray-500 text-sm gap-x-2">
//           <p>0 órdenes activa(s)</p>{" "}
//           <div style={separatorStyle} className=""></div>
//           <p>{"Sin deuda"}</p>
//         </div>

//         <div className="flex flex-row mt-2 gap-x-2 text-sm font-bold">
//           <Link
//             href={`/vehicles/${vehicle.id}/edit`}
//             className="flex items-center text-teal-700 hover:text-teal-900 opacity-75 py-1 px-2 rounded"
//           >
//             <svg
//               className="w-5 h-5 mr-1"
//               fill="none"
//               stroke="currentColor"
//               stroke-linecap="round"
//               stroke-linejoin="round"
//               stroke-width="2"
//               viewBox="0 0 24 24"
//               width="24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
//               <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
//             </svg>
//             <span>Editar</span>
//           </Link>

//           <Link
//             href={`/vehicles/${vehicle.id}/edit`}
//             className="flex items-center text-rose-700 hover:text-rose-900 opacity-75 py-1 px-2 rounded"
//           >
//             <svg
//               className="w-5 h-5 mr-1"
//               enable-background="new 0 0 139 139"
//               stroke="currentColor"
//               fill="currentColor"
//               height="139px"
//               version="1.1"
//               viewBox="0 0 139 139"
//               width="139px"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path d="M114.115,28.505v-0.281c0-9.937-6.001-17.992-13.402-17.992H38.288c-7.406,0-13.408,8.056-13.408,17.992v0.281H114.115z" />
//               <path d="M114.592,43.842c-1.495-1.749-3.68-2.758-5.983-2.758H30.391c-2.304,0-4.491,1.009-5.986,2.758  c-1.496,1.752-2.149,4.068-1.79,6.345l11.373,71.939c0.604,3.827,3.9,6.642,7.776,6.642h55.47c3.873,0,7.17-2.814,7.776-6.642  l11.373-71.939C116.743,47.91,116.088,45.594,114.592,43.842z M47.433,118.075c-0.132,0.012-0.266,0.018-0.396,0.018  c-2.307,0-4.271-1.765-4.475-4.108l-4.703-53.772c-0.218-2.473,1.615-4.655,4.088-4.869c2.454-0.266,4.657,1.612,4.872,4.088  l4.705,53.773C51.739,115.678,49.909,117.862,47.433,118.075z M73.997,113.597c0,2.482-2.017,4.496-4.5,4.496  c-2.485,0-4.498-2.014-4.498-4.496V59.617c0-2.485,2.014-4.498,4.498-4.498c2.484,0,4.5,2.015,4.5,4.498V113.597z M95.859,113.984  c-0.203,2.344-2.165,4.108-4.474,4.108c-0.128,0-0.265-0.006-0.397-0.018c-2.474-0.213-4.307-2.402-4.088-4.87l4.701-53.773  c0.216-2.476,2.403-4.343,4.873-4.088c2.477,0.214,4.304,2.397,4.087,4.869L95.859,113.984z" />
//             </svg>

//             <span>Eliminar</span>
//           </Link>
//         </div>
//       </div>
//     </div>
//     // </li>
//   ))}
