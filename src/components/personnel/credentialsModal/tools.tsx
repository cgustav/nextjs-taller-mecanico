export class CredentialsModalTools {
  public static validateFormData(data: any, currentUserPassword: string) {
    let validationErrors: any = {};

    if (!data.currentPassword) {
      validationErrors.currentPassword = "Contraseña actual es requerida";
    } else {
      if (data.currentPassword !== currentUserPassword) {
        validationErrors.currentPassword = "Contraseña actual no es correcta";
      }
    }

    if (!data.newPassword) {
      validationErrors.newPassword = "Nueva contraseña es requerida";
    } else {
      if (data.newPassword.length < 5) {
        validationErrors.newPassword =
          "La contraseña debe tener al menos 5 caracteres";
      }

      if (data.newPassword === currentUserPassword) {
        validationErrors.newPassword =
          "La nueva contraseña debe ser distinta a la actual";
      }
    }

    if (!data.confirmNewPassword) {
      validationErrors.confirmNewPassword =
        "Confirmación de contraseña es requerida";
    } else {
      console.log("data.newPassword: ", data.newPassword);
      console.log("data.confirmNewPassword: ", data.confirmNewPassword);

      if (data.newPassword !== data.confirmNewPassword) {
        validationErrors.confirmNewPassword =
          "La confirmación de la nueva contraseña no coincide";
      }
    }

    return validationErrors;
  }
}
