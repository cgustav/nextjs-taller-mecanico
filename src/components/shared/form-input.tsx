import InputMask from "react-input-mask";
import ErrorLabel from "./error-label";

export interface CreateVehicleFormInputProps {
  id: string;
  label: string;
  inputName: string;
  inputType?: "text" | "number" | "date" | "email" | "password" | "tel" | "url";
  placeholder?: string;
  inputMask?: string;
  onChange?: any;
  value?: any;
  maxLength?: number;
  error?: string;
  noMargins?: boolean;
  noDynamicW?: boolean;
  disabled?: boolean;
}

function FormInput(props: CreateVehicleFormInputProps) {
  const {
    id,
    label,
    inputName,
    inputType,
    placeholder,
    inputMask,
    onChange,
    value,
    maxLength,
    error,
    noMargins = false,
    noDynamicW = false,
    disabled = false,
  } = props;
  const standardInputClassName =
    "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white";

  // const handleChange = (e) => {
  //   console.log("handleChange e.target.name: ", e.target.name);
  //   const { name, value } = e.target;

  return (
    <div
      className={
        "flex flex-wrap -mx-3 mb-6 items-center justify-center" + noMargins
          ? ""
          : ""
      }
    >
      <div
        className={`w-full ${noDynamicW ? "" : "md:w-4/5"} px-3 mb-6 md:mb-0`}
      >
        <label
          htmlFor={id}
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        >
          {label ?? "N/A"}
        </label>

        {inputMask ? (
          <InputMask mask={inputMask} onChange={onChange} value={value}>
            <input
              type={inputType ?? "text"}
              id={id}
              name={inputName}
              placeholder={placeholder ?? ""}
              className={standardInputClassName}
            />
          </InputMask>
        ) : (
          <input
            type={inputType ?? "text"}
            id={id}
            name={inputName}
            placeholder={placeholder ?? ""}
            className={standardInputClassName}
            onChange={onChange}
            value={value}
            maxLength={maxLength}
            disabled={disabled}
          />
        )}

        {error && <ErrorLabel message={error} />}
      </div>
    </div>
  );
}

export default FormInput;
