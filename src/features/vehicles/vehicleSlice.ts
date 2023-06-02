import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppState } from "../../store";

export interface Vehicle {
  id: string;
  licensePlate: string;
  color: string;
  model: string;
  modelYear: string;
  vehicleClass: string;
  manufacturer: string;
  fuelType: string;
  passengers: string;
  traction: string;
  createdAt: string;
  notes: string;
}

export interface VehiclesState {
  vehicles: Vehicle[];
  status: "idle" | "loading" | "failed";
}

const initialState: VehiclesState = {
  vehicles: [],
  status: "idle",
};

const vehiclesSlice = createSlice({
  name: "vehicles",
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    addVehicle: (state, action: PayloadAction<Vehicle>) => {
      state.vehicles.push(action.payload);
    },
    removeVehicle: (state, action: PayloadAction<string>) => {
      state.vehicles = state.vehicles.filter(
        (vehicle) => vehicle.id !== action.payload
      );
    },
    updateVehicle: (state, action: PayloadAction<Vehicle>) => {
      const index = state.vehicles.findIndex(
        (vehicle) => vehicle.id === action.payload.id
      );
      state.vehicles[index] = action.payload;
    },
  },
  //   extraReducers: (builder) => {
  //     builder
  //       .addCase(fetchVehicles.pending, (state) => {
  //         state.status = "loading";
  //       })
  //       .addCase(fetchVehicles.fulfilled, (state, action) => {
  //         state.status = "idle";
  //         state.vehicles = action.payload;
  //       });
  //   },
});

export const { addVehicle, removeVehicle, updateVehicle } =
  vehiclesSlice.actions;

export const selectVehicles = (state: AppState) => state.vehicles.vehicles;
export const selectStatus = (state: AppState) => state.vehicles.status;
// export const selectVehicleById = (state: AppState) => state.vehicles.status;
export const getVehicleById = (state: AppState, vehicleId: string) =>
  state.vehicles.vehicles.find((vh: Vehicle) => vh.id === vehicleId) || null;

export default vehiclesSlice.reducer;
