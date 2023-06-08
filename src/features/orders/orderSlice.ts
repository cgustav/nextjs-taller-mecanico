import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppState } from "../../store";
import { v4 as uuid, v4 } from "uuid";
import { WorkOrdersMocks } from "./mocks";

export enum WorkOrderStatus {
  PENDING = "Pendiente",
  IN_PROGRESS = "En progreso",
  BILLED = "Facturado",
  CANCELLED = "Cancelado",
}

export interface WorkOrder {
  id: string;
  receiptDate: string;
  mileageTimestamp?: string;
  deliveryDate?: string;
  vehicleId: string;
  vehicleLicensePlate: string;
  customerId: string;
  customerFullName: string;
  workerId: string;
  workerFullName: string;
  items: string;
  status: WorkOrderStatus | string;
  notes: string;
  cost: number;
  createdAt: string;
}
export interface WorkOrdersState {
  orders: WorkOrder[];
  status: "idle" | "loading" | "failed";
}

export const moduleName = "orders";

const initialState: WorkOrdersState = {
  orders: [],
  // DEBUG ONLY
  // orders: WorkOrdersMocks.initialWorkOrders,
  status: "idle",
};

const ordersSlice = createSlice({
  name: moduleName,
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    addOrder: (state, action: PayloadAction<WorkOrder>) => {
      state.orders.push(action.payload);
    },

    updateOrder: (state, action: PayloadAction<WorkOrder>) => {
      const { id } = action.payload;
      const orderIndex = state.orders.findIndex((order) => order.id === id);
      state.orders[orderIndex] = action.payload;
    },

    removeOrder: (state, action: PayloadAction<string>) => {
      const { payload: id } = action;
      const orderIndex = state.orders.findIndex((order) => order.id === id);
      state.orders.splice(orderIndex, 1);
    },
  },
});

export const { addOrder, updateOrder, removeOrder } = ordersSlice.actions;

export const selectOrders = (state: AppState) => state.orders.orders;

// export const getOrderById = (state: AppState, id: string) =>
//   state.orders.orders.find((order: any) => order.id === id);

export const getOrderById = (orders: WorkOrder[], id: string) =>
  orders.find((order: any) => order.id === id);

export default ordersSlice.reducer;
