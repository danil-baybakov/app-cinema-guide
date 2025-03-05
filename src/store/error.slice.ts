import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export type Error = {
	id: string,
	message: string
}

export interface posterState {
	messages: Error[];
}

const initialState: posterState = {
	messages: []
};


export const errorSlice = createSlice({
	name: 'error',
	initialState,
	reducers: {
		add: (state, action: PayloadAction<string[]>) => {
			action.payload.forEach((error) => {
				if (error) {
					state.messages.push({
						id: crypto.randomUUID(),
						message: error
					});
				}
			});
		},
		remove: (state, action: PayloadAction<string>) => {
			state.messages = state.messages.filter(error => error.id !== action.payload);
		},
		clear: (state) => {
			state.messages = [];
		}
	},
	extraReducers: () => {}
});

export const { add, remove } = errorSlice.actions;

export const messages = (state: RootState) => state.error.messages;

export default errorSlice.reducer;
export const errorActions = errorSlice.actions;