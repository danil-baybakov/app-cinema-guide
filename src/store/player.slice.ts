import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type DataVideoPlaying = {
	url: string,
	title: string
}

export interface playerState {
	playing: boolean,
	video: DataVideoPlaying | null
}

const initialState: playerState = {
	playing: false,
	video: null
};


export const playerSlice = createSlice({
	name: 'player',
	initialState,
	reducers: {
		open: (state, action: PayloadAction<DataVideoPlaying>) => {
			state.video = action.payload;
			state.playing = false;
		},
		close: (state) => {
			state.video = null;
			state.playing = false;
		},
		togglePlaying: (state) => {
			if (state.video)
				state.playing = !state.playing;
		}
	}
});

export default playerSlice.reducer;
export const playerActions = playerSlice.actions;