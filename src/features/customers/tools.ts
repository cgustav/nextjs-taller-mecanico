import { EmailUtils } from "../../utils/email.utils";
import { RUTUtils } from "../../utils/rut.utils";

export abstract class CustomerTools {
  public static validateCustomerData(data: any): any {
    let validationErrors: any = {};

    if (!data.rut) {
      validationErrors.rut = "El RUT es obligatorio";
    } else {
      if (!RUTUtils.validate(data.rut)) {
        validationErrors.rut = "El RUT no es válido";
      }
    }

    if (!data.fullName) {
      validationErrors.fullName = "El nombre es obligatorio";
    } else {
      if (data.fullName.trim().length < 3) {
        validationErrors.fullName =
          "El nombre debe tener al menos 3 caracteres";
      }
    }

    if (!data.email) {
      validationErrors.email = "El correo es obligatorio";
    } else {
      if (!EmailUtils.validate(data.email)) {
        validationErrors.email = "El correo no es válido";
      }
    }

    if (!data.phone) {
      validationErrors.phone = "El teléfono es obligatorio";
    } else {
      if (data.phone.trim().length < 3) {
        validationErrors.phone = "El teléfono debe tener al menos 3 caracteres";
      }
    }

    if (!data.address) {
      validationErrors.address = "La dirección es obligatoria";
    } else {
      if (data.address.trim().length < 3) {
        validationErrors.address =
          "La dirección debe tener al menos 3 caracteres";
      }
    }

    if (!data.city) {
      validationErrors.city = "La ciudad es obligatoria";
    } else {
      if (data.city.trim().length < 3) {
        validationErrors.city = "La ciudad debe tener al menos 3 caracteres";
      }
    }

    return validationErrors;
  }
}
