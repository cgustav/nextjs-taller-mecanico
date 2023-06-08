import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppState } from "../../store";

export interface Customer {
  id: string;
  rut: string;
  fullName: string;
  address: string;
  phone: string;
  email: string;
  city: string;
  vehicles: string[];
  createdAt: string;
  // Otros campos relacionados con el cliente
}

export interface CustomersState {
  customers: Customer[];
  status: "idle" | "loading" | "failed";
}

const initialState: CustomersState = {
  customers: [],
  status: "idle",
};

export const moduleName = "customers";

const customersSlice = createSlice({
  name: moduleName,
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    addCustomer: (state, action: PayloadAction<Customer>) => {
      state.customers.push(action.payload);
    },
    removeCustomer: (state, action: PayloadAction<string>) => {
      state.customers = state.customers.filter(
        (customer) => customer.id !== action.payload
      );
    },
    updateCustomer: (state, action: PayloadAction<Customer>) => {
      const index = state.customers.findIndex(
        (customer) => customer.id === action.payload.id
      );
      state.customers[index] = action.payload;
    },
  },
});

export const { addCustomer, removeCustomer, updateCustomer } =
  customersSlice.actions;

export const selectCustomers = (state: AppState) => state.customers.customers;
export const selectStatus = (state: AppState) => state.customers.status;

export const getCustomerById = (state: AppState, customerId: string) =>
  state.customers.customers.find((c: Customer) => c.id === customerId) || null;

export default customersSlice.reducer;
