import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular } from "@fortawesome/fontawesome-svg-core/import.macro";
import { IconName, IconProp } from "@fortawesome/fontawesome-svg-core";

export interface ConfirmAlertProps {
  icon: IconProp;
  message: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  onConfirm?: any;
  onCancel?: any;
}

const ConfirmationAlert = ({
  message,
  onConfirm,
  onCancel,
  icon,
  confirmButtonText,
  cancelButtonText,
}: ConfirmAlertProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 backdrop-blur-sm bg-opacity-50">
      <div className="flex flex-col bg-white p-8 max-w-sm rounded">
        <FontAwesomeIcon
          icon={icon}
          className="py-1 text-zinc-700 opacity-75 text-7xl font-bold rounded "
        />
        <p className="mt-4 text-zinc-500 text-md font-bold text-center">
          {message}
        </p>
        <div className="mt-8 flex justify-end">
          <button
            className="pt px-2 mr-2 py-1 text-rose-700 hover:text-rose-900 font-bold rounded self-end"
            onClick={onConfirm}
          >
            {confirmButtonText || "Confirmar"}
          </button>
          <button
            className="pt px-2 py-1 text-zinc-400 font-bold rounded self-end"
            onClick={onCancel}
          >
            {cancelButtonText || "Cancelar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationAlert;
