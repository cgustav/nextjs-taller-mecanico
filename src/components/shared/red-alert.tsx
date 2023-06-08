// import { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { solid, regular } from "@fortawesome/fontawesome-svg-core/import.macro";

export interface RedAlertProps {
  message: string;
  onClose?: any;
}

const RedAlert = ({ message, onClose }: RedAlertProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 backdrop-blur-sm bg-opacity-50">
      <div className="flex flex-col bg-white p-8 max-w-sm rounded">
        {/* <FontAwesomeIcon
          icon={regular("circle-exclamation")}
          className="py-1 text-rose-700 opacity-75 text-lg font-bold rounded "
        /> */}

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16zm0-11a1 1 0 00-1 1v4a1 1 0 002 0v-4a1 1 0 00-1-1zm0 7a1 1 0 100 2 1 1 0 000-2z" />
        </svg>

        <p className="mt-4 text-zinc-500 text-md font-bold">{message}</p>

        <button
          className="mt-4 pt px-1 py-1 text-rose-700 font-bold rounded self-end"
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default RedAlert;
