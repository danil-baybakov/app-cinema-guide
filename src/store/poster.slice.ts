import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchGetRandomMovie, Movie } from '../api/Movies';
import { fetchAddFavorite, fetchRemoveFavorite } from '../api/Favorites';

export interface posterState {
	movie: Movie | null;
	loading: boolean;
	errors: string[];
}

const initialState: posterState = {
	movie: null,
	loading: false,
	errors: ['', '', '']
};

export const getRandomMovie = createAsyncThunk('movie/random', 
	async () => {
		return await fetchGetRandomMovie();
	}
);

export const addFavorite = createAsyncThunk('favorite/add', 
	async (id: number) => {
		return await fetchAddFavorite(id);
	}
);

export const removeFavorite = createAsyncThunk('favorite/remove', 
	async (id: number) => {
		return await fetchRemoveFavorite(id);
	}
);


export const posterSlice = createSlice({
	name: 'poster',
	initialState,
	reducers: {
		init: (state) => {
			state.movie = null;
			state.loading = false;
			state.errors = ['', '', ''];
		}
	},
	extraReducers: (builder) => {
		// получение случайного фильма
		/////////////////////////////////////////////////////////

		builder.addCase(getRandomMovie.pending, (state) => {
			state.errors[0] = '';
		});

		builder.addCase(getRandomMovie.fulfilled, (state, action: PayloadAction<Movie | undefined>) => {
			if (action.payload)
				state.movie = action.payload;
		});

		builder.addCase(getRandomMovie.rejected, (state, action) => {
			if (action.error.message)
				state.errors[0] = action.error.message;
		});

		// добавление фильма в избранное
		/////////////////////////////////////////////////////////

		builder.addCase(addFavorite.pending, (state) => {
			state.errors[1] = '';
		});

		builder.addCase(addFavorite.fulfilled, () => {
			return;
		});

		builder.addCase(addFavorite.rejected, (state, action) => {
			if (action.error.message)
				state.errors[1] = action.error.message;
		});

		// удаление фильма из избранного
		/////////////////////////////////////////////////////////

		builder.addCase(removeFavorite.pending, (state) => {
			state.errors[2] = '';
		});

		builder.addCase(removeFavorite.fulfilled, () => {
			return;
		});

		builder.addCase(removeFavorite.rejected, (state, action) => {
			if (action.error.message)
				state.errors[2] = action.error.message;
		});

	}
});

export default posterSlice.reducer;
export const posterActions = posterSlice.actions;