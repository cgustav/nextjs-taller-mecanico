import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppState } from "../../store";

export interface Billing {
  id: string;
  billingNumber: string;
  issueDate: string;
  bussiness: {
    rut: string;
    name: string;
    commercialTurn: string;
    address: string;
    email: string;
    image: string;
    city: string;
  };
  customer: {
    id: string;
    rut?: string;
    // legalEntityRut?: string;
    isLegalEntity: boolean;
    fullName: string;
    commercialTurn?: string;
    address: string;
    city: string;
    phone: string;
    email: string;
  };
  // Otros campos relacionados con la orden de trabajo
  workOrder: {
    id: string;
    receiptDate: string;
    deliveryDate: string;
    licensePlate: string;
    responsibleMechanic: string;
    responsibleMechanicId: string;
    cost: number;
  };
  // Otros campos relacionados con los items
  // TODO - IMPROVE THIS
  // items: {
  //   description: string;
  //   quantity: number;
  //   unitPrice: number;
  //   total: number;
  // }[];
  //En reemplazo de items
  billing: string;
  netAmount: number;
  fines: number;
  otherTaxes: number;
  subtotal: number;
  iva: number;
  totalAmount: number;
}

export const moduleName = "billings";

export interface BillingState {
  billings: Billing[];
  status: "idle" | "loading" | "failed";
}

const initialState: BillingState = {
  // DEBUG ONLY
  // orders: WorkOrdersMocks.initialWorkOrders,
  billings: [],
  status: "idle",
};

const billingsSlice = createSlice({
  name: moduleName,
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    emitBilling: (state, action: PayloadAction<Billing>) => {
      state.billings.push(action.payload);
    },
  },
});

export const { emitBilling } = billingsSlice.actions;

export const selectBillings = (state: AppState) => state.billings.billings;

export default billingsSlice.reducer;
