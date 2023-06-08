export abstract class VehicleTools {
  public static validateVehicleData(
    data: any,
    baseVehicles: any,
    isEditing: boolean
  ): any {
    // Objeto para almacenar los errores de validación
    let validationErrors: any = {};

    //Comprobar placa patente chilena a través de regex
    //https://www.abe.cl/contenidos/automotriz/2016/08/29/Editorial/0001.html
    const regex = /^[A-Z]{2}[A-Z0-9]{2}[0-9]{2}$/;
    if (!regex.test(data.licensePlate)) {
      validationErrors.licensePlate =
        "La placa no cumple con el formato de una placa chilena";
    } else {
      if (!isEditing) {
        console.log("baseVehicle: ", baseVehicles);
        const foundVehicle = baseVehicles.vehicles.find(
          (vehicle: any) => vehicle.licensePlate === data.licensePlate
        );
        if (foundVehicle) {
          validationErrors.licensePlate = "La placa ya existe";
        }
      }
    }

    if (!data.manufacturer) {
      validationErrors.manufacturer = "El fabricante es requerido";
    } else if (data.manufacturer.length < 3) {
      validationErrors.manufacturer =
        "El fabricante debe tener al menos 3 caracteres";
    }

    if (!data.model) {
      validationErrors.model = "El modelo es requerido";
    } else if (data.model.length < 3) {
      validationErrors.model = "El modelo debe tener al menos 3 caracteres";
    }

    if (!data.color) {
      validationErrors.color = "El color es requerido";
    } else if (data.color.length < 3) {
      validationErrors.color = "El color debe tener al menos 3 caracteres";
    }

    if (!data.modelYear) {
      validationErrors.modelYear = "El año es requerido";
    }

    if (!data.vehicleClass) {
      validationErrors.vehicleClass = "La clase es requerida";
    }

    if (!data.fuelType) {
      validationErrors.fuelType = "El tipo de combustible es requerido";
    }

    if (!data.traction) {
      validationErrors.traction = "El tipo de tracción es requerido";
    }

    if (!data.passengers) {
      validationErrors.passengers = "El número de pasajeros es requerido";
    }

    if (!data.ownerId) {
      validationErrors.ownerId = "El propietario es requerido";
    }

    return validationErrors;
  }
}
