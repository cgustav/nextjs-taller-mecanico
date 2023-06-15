import { BillingProvider } from "../../../features/billing/provider";

export class CreateBillingModalTools {
  public static validateBussinessFormData(data: any) {
    let validationErrors: any = {};

    if (!data.fullName) {
      validationErrors.fullName = "Nombre de empresa es requerido";
    } else if (data.fullName.length < 3) {
      validationErrors.fullName =
        "Nombre de empresa debe tener al menos 3 letras";
    }

    if (!data.commercialTurn) {
      validationErrors.commercialTurn = "Giro comercial es requerido";
    } else if (data.commercialTurn.length < 3) {
      validationErrors.commercialTurn =
        "Giro comercial debe tener al menos 3 letras";
    }

    if (!data.rut) {
      validationErrors.rut = "RUT es requerido";
    } else {
      const isValid = BillingProvider.validateChileanRut(data.rut);

      if (!isValid) {
        validationErrors.rut = "RUT no es válido";
      }
    }

    if (!data.address) {
      validationErrors.address = "Dirección es requerida";
    } else if (data.address.length < 3) {
      validationErrors.address = "Dirección debe tener al menos 3 letras";
    }

    if (!data.phone) {
      validationErrors.phone = "Teléfono es requerido";
    } else if (data.phone.length < 3) {
      validationErrors.phone = "Teléfono debe tener al menos 3 letras";
    }

    if (!data.email) {
      validationErrors.email = "Email es requerido";
    } else if (data.email.length < 3) {
      validationErrors.email = "Email debe tener al menos 3 letras";
    }

    return validationErrors;
  }

  public static validateAccountableFormData(data: any) {
    let validationErrors: any = {};

    const hasOnlyNumbers = (str: string) => {
      return /^\d+$/.test(str);
    };

    if (!data.netAmount) {
      validationErrors.netAmount = "Monto neto es requerido";
    } else {
      //   const clearNetAmount = clearStrCurrency(data.netAmount);
      const clearNetAmount = data.netAmount;

      if (!clearNetAmount.length) {
        validationErrors.netAmount = "Monto neto es requerido";
      }

      if (!hasOnlyNumbers(clearNetAmount)) {
        validationErrors.netAmount = "Monto neto debe ser numérico";
      }
    }

    /**
     * Campo opcional para multas
     */
    if (data.fines) {
      if (!hasOnlyNumbers(data.fines) || !data.fines.trim().length) {
        validationErrors.fines = "Recargos debe ser numérico";
      }
    } else {
      validationErrors.fines = "Recargos es requerido";
    }

    /**
     * Campo opcional para otros impuestos
     */
    if (data.otherTaxes || data.fines.length) {
      if (!hasOnlyNumbers(data.otherTaxes) || !data.otherTaxes.trim().length) {
        validationErrors.otherTaxes = "Otros impuestos debe ser numérico";
      }
    }

    return validationErrors;
  }
}
