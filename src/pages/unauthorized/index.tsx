import { regular, solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";

const UnauthorizedScreen = () => {
  const router = useRouter();
  const goToIndex = () => {
    // window.location.href = "/";
    router.push("/");
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-4 md:px-0">
      <h1 className="text-4xl font-bold mb-4">No estás autorizado</h1>
      <p className="text-center text-lg text-gray-700">
        No tienes permisos para acceder a este contenido.
      </p>
      {/* <img
        src="/path/to/exclamation-icon.svg"
        alt="Exclamation Icon"
        className="w-24 h-24 mb-4"
      /> */}

      <FontAwesomeIcon
        icon={regular("comment-dots")}
        className="my-6 text-zinc-700 opacity-75 text-7xl font-bold rounded "
      />

      <p className="text-center text-sm text-gray-500">
        Por favor, ponte en contacto con el administrador.
      </p>

      <button
        className="mt-4 pt px-2 py-1 text-yellow-700 font-bold rounded self-center"
        onClick={goToIndex}
      >
        Volver al inicio
      </button>
    </div>
  );
};

export default UnauthorizedScreen;
