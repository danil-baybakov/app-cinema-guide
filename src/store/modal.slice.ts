import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TypeModal = 'reg' | 'auth' | 'success';

export interface ModalState {
	type?: TypeModal,
}

const initialState: ModalState = {
	type: undefined
};

export const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		open: (state, action: PayloadAction<TypeModal>) => {
			state.type = action.payload;
		},
		close: (state) => {
			state.type = undefined;
		}
	}
});

export default modalSlice.reducer;
export const modalActions = modalSlice.actions;