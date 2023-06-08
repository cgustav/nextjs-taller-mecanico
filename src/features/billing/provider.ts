import { v4 as uuid } from "uuid";
import { WorkOrder } from "../orders/orderSlice";
import { Customer } from "../customers/customerSlice";

export interface LegalEntityData {
  rut: string;
  name: string;
  commercialTurn: string;
  address: string;
  email: string;
  phone: string;
}

export interface AssembleBillingData {
  workOrder: WorkOrder;
  customer: Customer;
  fines?: number;
  isLegalEntity?: boolean;
  legalEntityData?: LegalEntityData;
  city?: string;
}

export class BillingProvider {
  public static bussinessData = {
    rut: "76.123.456-7",
    name: "Taller 3BS",
    commercialTurn: "TALLER MECÁNICO AUTOMOTRIZ 3BS LTDA.",
    address: "Av. Siempre Viva 1234",
    email: "servicios@3bs.cl",
    image:
      "https://i.pinimg.com/550x/c5/40/57/c540575dde6d1ae57cb3cfa836812de8.jpg",
    city: "La serena",
  };

  public static defaultIva = 19;

  public static generateBillingNumber = (): string => {
    const fechaActual = new Date();
    const anio = fechaActual.getFullYear().toString().slice(-2);
    const mes = (fechaActual.getMonth() + 1).toString().padStart(2, "0");
    const dia = fechaActual.getDate().toString().padStart(2, "0");
    const hora = fechaActual.getHours().toString().padStart(2, "0");
    const minutos = fechaActual.getMinutes().toString().padStart(2, "0");
    const segundos = fechaActual.getSeconds().toString().padStart(2, "0");

    const numeroFacturacion = `${anio}${mes}${dia}${hora}${minutos}${segundos}`;

    return numeroFacturacion;
  };

  public static calculateTotalWithIva = (subtotal: number) => {
    return (subtotal * BillingProvider.defaultIva) / 100 + subtotal;
  };

  /**
   *
   * @param workOrder - WorkOrder
   * @param fines - number
   * @param customer - Customer
   * @param isLegalEntity - boolean
   * @param legalEntityData - LegalEntityData
   * @returns
   */
  public static assembleBilling = ({
    workOrder,
    fines,
    customer,
    isLegalEntity = false,
    legalEntityData,
  }: AssembleBillingData) => {
    const subtotal = workOrder.cost + (fines || 0);
    const billing = {
      id: uuid(),
      billingNumber: BillingProvider.generateBillingNumber(),
      issueDate: new Date().toISOString(),
      bussiness: BillingProvider.bussinessData,

      customer: {
        id: customer.id,
        isLegalEntity,
        fullName: isLegalEntity ? legalEntityData?.name : customer.fullName,
        commercialTurn: isLegalEntity && legalEntityData?.commercialTurn,
        address: isLegalEntity ? legalEntityData?.address : customer.address,
        city: isLegalEntity ? legalEntityData?.address : customer.city,
        phone: isLegalEntity ? legalEntityData?.phone : customer.phone,
        email: isLegalEntity ? legalEntityData?.email : customer.email,
      },

      workOrder: {
        id: workOrder.id,
        receiptDate: workOrder.receiptDate,
        deliveryDate: workOrder.deliveryDate,
        licensePlate: workOrder.vehicleLicensePlate,
        responsibleMechanic: workOrder.workerFullName,
        responsibleMechanicId: workOrder.workerId,
        cost: workOrder.cost,
      },
      // TODO: STATIC VALUES FOR NOW - IMPROVE TO ENHANCE BILLING DETAILS
      // items: workOrder.items.map((item) => ({
      //   description: item,
      //   quantity: 1,
      //   unitPrice: 1,
      //   total: 1,
      // })),
      items: workOrder.items,
      netAmount: workOrder.cost,
      fines: fines || 0,
      otherTaxes: 0,
      subtotal,
      iva: BillingProvider.defaultIva,
      totalAmount: BillingProvider.calculateTotalWithIva(subtotal),
    };
    return billing;
  };

  public static formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
    }).format(value);
  };

  /**
   * Esta función validarRutChileno toma un RUT chileno como entrada y devuelve true si el RUT es válido y false en caso contrario.
   * La función realiza los siguientes pasos de validación:
   *
   * - Elimina los puntos y guión del RUT para tener un formato consistente.
   * - Comprueba si el RUT tiene el formato correcto utilizando la expresión regular /^[0-9]+-[0-9kK]{1}$/.
   * - Divide el RUT en su número y dígito verificador.
   *
   * @param rut - string
   *
   * @returns
   */
  public static validateChileanRut = (rut: any) => {
    console.log("validateChileanRut: ", rut);

    console.log(
      "rutLimpio test: ",
      /^(\d{1,3}(?:\.\d{1,3}){2}-[\dkK])$/.test(rut)
    );
    // Validar formato del RUT
    if (/^(\d{1,3}(?:\.\d{1,3}){2}-[\dkK])$/.test(rut) == false) {
      // if (!/^(\d{1,3}(?:\.\d{1,3}){2}-[\dkK])$/.test(rut)) {
      console.log("formato incorrecto");
      return false;
    }

    // Remover puntos y guión del RUT
    const rutLimpio = rut.replace(/\./g, "");
    // .replace(/-/g, "");
    console.log("rutLimpio: ", rutLimpio);

    // Separar el número y el dígito verificador
    const [numero, digitoVerificador] = rutLimpio.split("-");

    console.log("numero: ", numero);
    console.log("digitoVerificador: ", digitoVerificador);

    // Validar dígito verificador
    const caracteres = [...numero];
    const factor = [2, 3, 4, 5, 6, 7, 2, 3];
    let suma = 0;

    for (let i = caracteres.length - 1, j = 0; i >= 0; i--, j++) {
      suma += parseInt(caracteres[i]) * factor[j];
    }

    const resto = suma % 11;
    // const digitoCalculado = resto === 0 ? "0" : 11 - resto;
    let digitoCalculado = "";

    if (resto === 0) {
      digitoCalculado = "0";
    } else if (resto === 1) {
      digitoCalculado = "K";
    } else {
      digitoCalculado = (11 - resto).toString();
    }

    return (
      digitoCalculado.toString() === (digitoVerificador || "")?.toUpperCase()
    );
  };
}
