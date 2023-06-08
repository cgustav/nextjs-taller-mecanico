export abstract class PhoneUtils {
  public static format(phone: string): string {
    const phoneRegex = /(\d{3})(\d{3})(\d{4})/;
    const phoneFormatted = phone.replace(phoneRegex, "($1) $2-$3");
    return phoneFormatted;
  }

  public static validate(phone: string): boolean {
    // Expresión regular para validar el formato del número de teléfono con código de país
    const regexTelefono = /^\+\d{1,3}\s\d{3}\s\d{6,}$/;
    return regexTelefono.test(phone);
  }
}
