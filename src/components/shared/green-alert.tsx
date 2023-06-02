import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular } from "@fortawesome/fontawesome-svg-core/import.macro";

export interface GreenAlertProps {
  message: string;
  onClose?: any;
}

const GreenAlert = ({ message, onClose }: GreenAlertProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 backdrop-blur-sm bg-opacity-50">
      <div className="flex flex-col bg-white p-8 max-w-sm rounded">
        <FontAwesomeIcon
          icon={regular("thumbs-up")}
          className="py-1 text-green-700 opacity-75 text-lg font-bold rounded "
        />

        <p className="mt-4 text-zinc-500 text-md font-bold">{message}</p>

        <button
          className="mt-4 pt px-1 py-1 text-green-700 font-bold rounded self-end"
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default GreenAlert;
