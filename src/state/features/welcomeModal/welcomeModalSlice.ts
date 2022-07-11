import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export type WelcomeModalType = {
    isOpen: boolean
};

const initialState: WelcomeModalType = {
    isOpen: true
}

const welcomeModalSlice = createSlice({
    name: "welcomeModalSlice",
    initialState,
    reducers: {
        closeModal: (state) => {
            state.isOpen = false;
        }
    }
});

export const { closeModal } = welcomeModalSlice.actions;

export const selectWelcomeModal = (state: RootState) => state.welcomeModal.isOpen;

export default welcomeModalSlice.reducer;