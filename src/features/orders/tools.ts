import { DateUtils } from "../../utils/date.utils";
import { NumberUtils } from "../../utils/number.utils";

export abstract class WorkOrderTools {
  public static validateWorkOrderData(data: any): any {
    let validationErrors: any = {};

    if (!data.customerId || !data.customerId.trim().length) {
      validationErrors.customerId = "El cliente es requerido";
    }

    if (!data.vehicleId || !data.vehicleId.trim().length) {
      validationErrors.vehicleId = "El vehículo es requerido";
    }

    if (!data.workerId || !data.workerId.trim().length) {
      validationErrors.workerId = "Trabajador asignado es requerido";
    }

    if (!data.receiptDate) {
      validationErrors.receiptDate = "Fecha de recepción es requerida";
    } else {
      if (!DateUtils.validate(data.receiptDate)) {
        validationErrors.receiptDate =
          "Fecha de recepción sin formato dd/mm/aaaa";
      }
    }

    if (!data.deliveryDate) {
      validationErrors.deliveryDate = "Fecha de entrega es requerida";
    } else {
      if (!DateUtils.validate(data.deliveryDate)) {
        validationErrors.deliveryDate =
          "Fecha de entrega sin formato dd/mm/aaaa";
      }
    }

    if (!data.items || !data.items.length) {
      validationErrors.items = "Trabajo a realizar es requerido";
    } else {
      if (data.items.trim().length < 5) {
        validationErrors.items =
          "Trabajo a realizar debe tener al menos 5 caracteres";
      }
    }

    if (!data.cost || !data.cost.trim().length) {
      validationErrors.cost = "Costo es requerido";
    } else {
      if (!NumberUtils.hasOnlyNumbers(data.cost)) {
        validationErrors.cost = "Costo debe ser numérico";
      }
    }

    return validationErrors;
  }
}
