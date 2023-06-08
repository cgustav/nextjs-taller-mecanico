import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppState } from "../../store";
import { PersonnelMocks } from "./mocks";

export interface MechanicPersonnel {
  id: string;
  rut: string;
  fullName: string;
  specialty: string;
  //   isPartTime: boolean;
  isActive: boolean;
  birthdate: string;
  address: string;
  phone: string;
  email: string;
  createdAt: string;
}

export interface PersonnelState {
  personnel: MechanicPersonnel[];
  status: "idle" | "loading" | "failed";
}

const initialState: PersonnelState = {
  //   personnel: [],
  //TODO - DEBUG ONLY DEACTIVATE THIS
  personnel: PersonnelMocks.standardList,
  status: "idle",
};

export const moduleName = "personnel";

const personnelSlice = createSlice({
  name: moduleName,
  initialState,
  reducers: {
    addPersonnel: (state, action: PayloadAction<MechanicPersonnel>) => {
      state.personnel.push(action.payload);
    },
    updatePersonnel: (state, action: PayloadAction<MechanicPersonnel>) => {
      const index = state.personnel.findIndex(
        (worker) => worker.id === action.payload.id
      );
      state.personnel[index] = action.payload;
    },
  },
});

export const selectPersonnel = (state: AppState) => state.personnel.personnel;

export const { addPersonnel, updatePersonnel } = personnelSlice.actions;

export default personnelSlice.reducer;
