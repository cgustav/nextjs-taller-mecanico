import { DateUtils } from "../../utils/date.utils";
import { EmailUtils } from "../../utils/email.utils";
import { RUTUtils } from "../../utils/rut.utils";

export abstract class PersonnelTools {
  public static validateCredentials(data: any): any {
    let validationErrors: any = {};

    if (data.password) {
      if (data.password.trim().length < 6) {
        validationErrors.password =
          "Contraseña debe tener al menos 6 caracteres";
      }
    } else {
      validationErrors.password = "Contraseña es requerida";
    }

    if (data.confirmPassword) {
      if (data.confirmPassword !== data?.password) {
        validationErrors.confirmPassword = "Las contraseñas no coinciden";
      }
    } else {
      validationErrors.confirmPassword = "Confirmar contraseña es requerida";
    }

    return validationErrors;
  }
  public static validatePersonnelData(data: any): any {
    let validationErrors: any = {};

    // if(!pers)

    if (!data.rut) {
      validationErrors.rut = "RUT es requerido";
    } else {
      const isValid = RUTUtils.validate(data.rut);

      if (!isValid) {
        validationErrors.rut = "RUT no es válido";
      }
    }

    if (!data.fullName) {
      validationErrors.fullName = "Nombre completo es requerido";
    } else {
      if (data.fullName.trim().length < 3) {
        validationErrors.fullName =
          "Nombre completo debe tener al menos 3 caracteres";
      }
    }

    if (!data.specialty) {
      validationErrors.specialty = "Especialidad es requerida";
    } else {
      if (data.specialty.trim().length < 3) {
        validationErrors.specialty =
          "Especialidad debe tener al menos 3 caracteres";
      }
    }

    if (!data.email) {
      validationErrors.email = "Correo es requerido";
    } else {
      if (!EmailUtils.validate(data.email)) {
        validationErrors.email = "Correo no es válido";
      }
    }

    if (!data.phone) {
      validationErrors.phone = "Teléfono es requerido";
    } else {
      if (data.phone.trim().length < 3) {
        validationErrors.phone = "Teléfono debe tener al menos 3 caracteres";
      }
    }

    if (!data.birthdate) {
      validationErrors.birthdate = "Fecha nacimiento es requerido";
    } else {
      if (!DateUtils.validate(data.birthdate.trim())) {
        validationErrors.birthdate = "Fecha nacimiento sin formato dd/mm/aaaa";
      }
    }

    if (!data.address) {
      validationErrors.address = "Dirección es requerida";
    } else {
      if (data.address.trim().length < 3) {
        validationErrors.address = "Dirección debe tener al menos 3 caracteres";
      }
    }

    return validationErrors;
  }
}
