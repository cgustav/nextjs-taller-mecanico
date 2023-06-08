export abstract class RUTUtils {
  public static validate = (rut: any) => {
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
