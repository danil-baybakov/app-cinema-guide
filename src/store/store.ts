import { configureStore } from '@reduxjs/toolkit';
import searchSlice from './search.slice';
import userSlice from './user.slice ';
import posterSlice from './poster.slice';
import errorSlice from './error.slice';
import playerSlice from './player.slice';

export const store = configureStore({
	reducer: {
		user: userSlice,
		search: searchSlice,
		poster: posterSlice,
		error: errorSlice,
		player: playerSlice
	}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
