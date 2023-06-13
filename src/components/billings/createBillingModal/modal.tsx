import { useEffect, useState } from "react";
import FormInput from "../../shared/form-input";
import { CreateBillingModalTools } from "./tools";
// import numeral from "numeral";
import { BillingProvider } from "../../../features/billing/provider";
import { NumberUtils } from "../../../utils/number.utils";
import { Customer } from "../../../features/customers/customerSlice";
import { WorkOrder } from "../../../features/orders/orderSlice";
import {
  Billing,
  emitBilling,
  selectBillings,
} from "../../../features/billing/billingSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { v4 as uuid } from "uuid";
import RedAlert from "../../shared/red-alert";

export interface CreateBillingModalProps {
  onClose: any;
  onComplete: any;
  customer: Customer;
  workOrder: WorkOrder;
}

function CreateBillingModal({
  onClose,
  onComplete,
  workOrder,
  customer,
}: CreateBillingModalProps) {
  const router = useRouter();
  const dispatch = useDispatch();

  const fetchedBillings = useSelector(selectBillings);
  console.log("Fetched billings: ", fetchedBillings);

  const [netAmount, setnetAmount] = useState(0);
  const [fines, setFines] = useState(0);
  const [otherTaxes, setOtherTaxes] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const iva = 19;

  // Estado para almacenar el paso actual del formulario
  const [paso, setPaso] = useState(1);

  const siguientePaso = () => {
    setPaso(paso + 1);
  };

  const anteriorPaso = () => {
    setPaso(paso - 1);
  };

  // Estado para almacenar el tipo de emisión de la factura
  const [emitirPersonaNatural, setEmitirPersonaNatural] = useState(true);

  const [showConflictModal, setShowConflictModal] = useState(true);

  // Estado para almacenar los datos de facturación de empresa
  // (Paso 1)
  const [datosFacturacion, setDatosFacturacion] = useState({
    id: "",
    fullName: "",
    commercialTurn: "",
    rut: "",
    address: "",
    phone: "",
    email: "",
  });

  // Estado para almacenar los datos de facturación de empresa
  // (Paso 2)
  // const [datosContabilidad, setDatosContabilidad] = useState({
  //   netAmount: "24000",
  //   fines: "0",
  //   otherTaxes: "0",
  //   subtotal: "24000",
  //   iva: "19.0%",
  //   totalAmount: "",
  // });

  // Estado para almacenar los errores de validación
  // de datos de facturación (Paso 1)
  const [errors, setErrors] = useState<any>({});

  // Estado para almacenar los errores de validación
  // de datos de contabilidad (Paso 2)
  const [contabilidadErrors, setContabilidadErrors] = useState<any>({});

  const handleBillingCreation = () => {
    console.log("Handle billing creation");
    //TODO - Create billing

    const billingChilling: Billing = {
      //Mocked bussiness data
      id: uuid(),
      bussiness: BillingProvider.bussinessData,
      billingNumber: BillingProvider.generateBillingNumber(),
      issueDate: new Date().toISOString(),
      customer: {
        id: customer.id,
        fullName: customer.fullName,
        rut: emitirPersonaNatural ? customer.rut : datosFacturacion.rut,
        address: emitirPersonaNatural
          ? customer.address
          : datosFacturacion.address,
        phone: emitirPersonaNatural ? customer.phone : datosFacturacion.phone,
        email: emitirPersonaNatural ? customer.email : datosFacturacion.email,
        commercialTurn: emitirPersonaNatural
          ? ""
          : datosFacturacion.commercialTurn,
        city: emitirPersonaNatural ? customer.city : "La serena",
        isLegalEntity: !emitirPersonaNatural,
      },
      workOrder: {
        id: workOrder.id,
        receiptDate: workOrder.receiptDate,
        deliveryDate: workOrder.deliveryDate!,
        licensePlate: workOrder.vehicleLicensePlate,
        responsibleMechanic: workOrder.workerFullName,
        responsibleMechanicId: workOrder.workerId,
        cost: workOrder.cost,
      },
      billing: workOrder.items,
      netAmount: netAmount,
      fines: fines,
      otherTaxes: otherTaxes,
      subtotal: subtotal,
      iva: iva,
      totalAmount: totalAmount,
    };

    const checkIfBillingExists = fetchedBillings.find(
      (billing: any) => billing.workOrder?.id === workOrder.id
    );

    //Previene duplicados
    if (checkIfBillingExists) {
      setShowConflictModal(true);
      return;
    }

    console.log("Creating billing...");
    dispatch(emitBilling(billingChilling));

    onComplete();
  };

  const handleSubmitStep1 = (e: any) => {
    e.preventDefault();
    console.log(datosFacturacion);

    if (!emitirPersonaNatural) {
      const validationErrors =
        CreateBillingModalTools.validateBussinessFormData(datosFacturacion);

      if (Object.keys(validationErrors).length) {
        setErrors(validationErrors);
        return;
      }
    }

    siguientePaso();
  };

  const handleSubmitStep2 = (e: any) => {
    e.preventDefault();
    console.log("Handle submit step 2");
    handleBillingCreation();
  };

  const handleEmitirClienteChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setEmitirPersonaNatural(e.target.value === "cliente");
  };

  const handleDatosContabilidadChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log("Handle datos contabilidad change");

    let { name, value } = e.target;
    console.log(name, value);

    if (name === "netAmount") {
      setnetAmount(Number.parseFloat(value) || 0);
    }

    if (name === "fines") {
      setFines(Number.parseFloat(value) || 0);
    }

    if (name === "otherTaxes") {
      setOtherTaxes(Number.parseFloat(value) || 0);
    }

    // const validationErrors =
    //   CreateBillingModalTools.validateAccountableFormData(datosContabilidad);

    // let capturedSubtotal = datosContabilidad.subtotal;

    // if (validationErrors[name]) {
    //   setContabilidadErrors({
    //     ...contabilidadErrors,
    //     [name]: validationErrors[name],
    //   });
    // } else {
    //   setContabilidadErrors({
    //     ...contabilidadErrors,
    //     [name]: "",
    //   });
    // }

    // setDatosContabilidad({
    //   ...datosContabilidad,
    //   // (capturedSubtotal != )
    //   subtotal: capturedSubtotal,
    //   [name]: value,
    // });

    // Recalculate subtotal after setting the new value
    // if (name === "netAmount" || name === "fines" || name === "otherTaxes") {
    //   // value = BillingProvider.formatCurrency(Number.parseFloat(value));
    //   capturedSubtotal = recalculateSubtotal();
    //   console.log("Recalculated subtotal: ", capturedSubtotal);
    // }
  };

  const handleDatosFacturacionChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log("Handle datos facturacion change");
    let { name, value } = e.target;
    console.log(name, value);

    if (name === "rut") {
      value = value.toUpperCase();
    }

    // if(name === "netAmount") {}

    const validationErrors = CreateBillingModalTools.validateBussinessFormData({
      ...datosFacturacion,
      [name]: value,
    });

    if (validationErrors[name]) {
      setErrors({
        ...errors,
        [name]: validationErrors[name],
      });
    } else {
      setErrors({
        ...errors,
        [name]: "",
      });
    }

    setDatosFacturacion({
      ...datosFacturacion,
      [name]: value,
    });
  };

  useEffect(() => {
    setnetAmount(Number.parseFloat(workOrder.cost.toString() || "0"));

    console.log("NetAmount typeof: ", typeof netAmount);
    console.log("Fines typeof: ", typeof fines);
    console.log("OtherTaxes typeof: ", typeof otherTaxes);

    const newSubtotal = netAmount + fines + otherTaxes;
    const totalConIva = newSubtotal * 1.19;
    setSubtotal(newSubtotal);
    setTotalAmount(totalConIva);
  }, [netAmount, fines, otherTaxes, subtotal, totalAmount, iva]);

  const handleCloseConflictModal = () => {
    setShowConflictModal(false);
    router.push("/orders");
  };

  return (
    <div>
      {showConflictModal && (
        <RedAlert
          message="Ya existe una factura emitida para esta orden"
          onClose={() => handleCloseConflictModal()}
        />
      )}
      <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
        <div className="bg-white p-4 rounded shadow">
          {/* Paso 1 */}
          {paso === 1 && (
            <div>
              <div className="flex justify-end">
                <button
                  className="self-end top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  onClick={onClose}
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <h2 className="text-lg font-bold mb-4">
                Emitir Facturación (Paso 1)
              </h2>
              <form className="flex flex-col w-full">
                <div className="mb-4 px-3">
                  <label
                    htmlFor="emitir"
                    className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  >
                    Emitir a nombre de:
                  </label>
                  <select
                    id="emitir"
                    className="block w-full mt-1 py-2"
                    value={emitirPersonaNatural ? "cliente" : "empresa"}
                    onChange={handleEmitirClienteChange}
                  >
                    <option value="cliente">
                      Persona natural (Asociada al vehículo)
                    </option>
                    <option value="empresa">Nueva Empresa</option>
                  </select>
                </div>

                {emitirPersonaNatural ? (
                  <div className="bg-white rounded-lg p-4 w-80">
                    <h2 className="text-lg font-bold mb-4">
                      Información del cliente
                    </h2>

                    <p>
                      <span className="font-semibold">Rut:</span> {customer.rut}
                    </p>

                    <p>
                      <span className="font-semibold">Nombre:</span>{" "}
                      {customer.fullName}
                    </p>

                    <p>
                      <span className="font-semibold">Correo:</span>{" "}
                      {customer.email}
                    </p>
                    <p>
                      <span className="font-semibold">Teléfono:</span>{" "}
                      {customer.phone}
                    </p>
                    <p>
                      <span className="font-semibold">Ciudad:</span>{" "}
                      {customer.city}
                    </p>
                  </div>
                ) : (
                  <div className="w-full">
                    <FormInput
                      id="wv-create-input-rut"
                      label="Nombre Empresa"
                      inputName="fullName"
                      placeholder="Mecánica 3BS"
                      maxLength={100}
                      noDynamicW={true}
                      value={datosFacturacion.fullName}
                      error={errors.fullName}
                      onChange={handleDatosFacturacionChange}
                    ></FormInput>

                    <FormInput
                      id="wv-create-input-razon-social"
                      label="Giro Comercial"
                      inputName="commercialTurn"
                      placeholder="Mecánica Automotriz y Repuestos 3BS Ltda."
                      noDynamicW={true}
                      value={datosFacturacion.commercialTurn}
                      error={errors.commercialTurn}
                      onChange={handleDatosFacturacionChange}
                    ></FormInput>
                    <FormInput
                      id="wv-create-input-nombre-empresa"
                      label="RUT Empresa"
                      inputName="rut"
                      noDynamicW={true}
                      value={datosFacturacion.rut}
                      error={errors.rut}
                      onChange={handleDatosFacturacionChange}
                    ></FormInput>

                    <div className="flex flex-row md:gap-x-1 gap-x-0 items-end">
                      <FormInput
                        id="wv-create-input-nombre-empresa"
                        label="Teléfono Empresa"
                        inputName="phone"
                        noDynamicW={true}
                        value={datosFacturacion.phone}
                        error={errors.phone}
                        onChange={handleDatosFacturacionChange}
                      ></FormInput>
                      <FormInput
                        id="wv-create-input-nombre-empresa"
                        label="Email Empresa"
                        inputName="email"
                        noDynamicW={true}
                        value={datosFacturacion.email}
                        error={errors.email}
                        onChange={handleDatosFacturacionChange}
                      ></FormInput>
                    </div>
                    <FormInput
                      id="wv-create-input-nombre-empresa"
                      label="Dirección Empresa"
                      inputName="address"
                      noDynamicW={true}
                      value={datosFacturacion.address}
                      error={errors.address}
                      onChange={handleDatosFacturacionChange}
                    ></FormInput>
                  </div>
                )}

                <button
                  type="submit"
                  className="bg-zinc-700 text-white py-2 px-4 mx-3 my-4 rounded hover:bg-zinc-900 transition duration-500 ease-in-out font-black"
                  onClick={handleSubmitStep1}
                >
                  {/* Emitir Factura */}
                  Continuar
                </button>
              </form>
            </div>
          )}
          {/* Fin Paso 1 */}

          {/* Paso 2 */}
          {paso === 2 && (
            <div className="">
              <div className="flex justify-end">
                <button
                  className="self-end top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  onClick={onClose}
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <h2 className="text-lg font-bold mb-4">
                Emitir Facturación (Paso 2)
              </h2>
              <form className="flex flex-col w-full">
                <div className="mb-4 px-2">
                  <span className="text-white">
                    Los siguientes datos son opcionales, pero si los ingresas
                    ahora.
                  </span>
                </div>
                {/* Contenido del segundo formulario */}
                {/* ... */}
                <FormInput
                  id="wv-create-input-billing-netAmount"
                  label="Monto Neto"
                  inputName="netAmount"
                  maxLength={8}
                  noDynamicW={true}
                  disabled={true}
                  value={netAmount}
                  error={contabilidadErrors.netAmount}
                  onChange={handleDatosContabilidadChange}
                ></FormInput>
                <FormInput
                  id="wv-create-input-billing-fines"
                  label="Multas"
                  inputName="fines"
                  maxLength={6}
                  noDynamicW={true}
                  value={fines}
                  error={contabilidadErrors.fines}
                  onChange={handleDatosContabilidadChange}
                ></FormInput>
                <FormInput
                  id="wv-create-input-billing-otherTaxes"
                  label="Otros impuestos"
                  inputName="otherTaxes"
                  maxLength={6}
                  noDynamicW={true}
                  value={otherTaxes}
                  error={contabilidadErrors.otherTaxes}
                  onChange={handleDatosContabilidadChange}
                ></FormInput>
                <FormInput
                  id="wv-create-input-billing-subtotal"
                  label="Subtotal"
                  inputName="subtotal"
                  disabled={true}
                  noDynamicW={true}
                  value={subtotal}
                  error={contabilidadErrors.subtotal}
                  onChange={handleDatosContabilidadChange}
                ></FormInput>
                <FormInput
                  id="wv-create-input-billing-iva"
                  label="IVA"
                  inputName="iva"
                  disabled={true}
                  noDynamicW={true}
                  value={iva}
                  error={contabilidadErrors.iva}
                  onChange={handleDatosContabilidadChange}
                ></FormInput>
                <FormInput
                  id="wv-create-input-billing-totalAmount"
                  label="Monto Total"
                  inputName="totalAmount"
                  disabled={true}
                  noDynamicW={true}
                  value={totalAmount}
                  error={contabilidadErrors.totalAmount}
                  onChange={handleDatosContabilidadChange}
                ></FormInput>
                <div className="flex justify-between w-full px-3 my-4">
                  <button
                    className="mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={anteriorPaso}
                  >
                    Anterior
                  </button>
                  <button
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                    onClick={handleSubmitStep2}
                  >
                    Emitir
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateBillingModal;
