export abstract class EmailUtils {
  public static validate(email: string) {
    // Expresión regular para validar el formato del correo electrónico
    const regexCorreoElectronico =
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    return regexCorreoElectronico.test(email);
  }
}
