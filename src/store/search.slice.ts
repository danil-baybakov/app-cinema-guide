import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchGetMovies, Movies, TypeQueryParamsFetchGetMovies } from '../api/Movies';

export interface SearchState {
	value: string,
	visible: {
		field: boolean,
		btnClear: boolean,
		list: boolean
	}
	movies: Movies
}

const initialState: SearchState = {
	value: '',
	visible: {
		field: false,
		btnClear: false,
		list: false
	},
	movies: []
};

export const search = createAsyncThunk('search/change', 
	async (params?: TypeQueryParamsFetchGetMovies) => {
		return fetchGetMovies(params);
	}
);

export const searchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {
		change: (state, action: PayloadAction<string>) => {
			state.value = action.payload;
			state.visible.btnClear = state.value !== '';
		},
		open: (state) => {
			state.visible.field = true;
		},
		close: (state) => {
			state.visible.field = false;
		},
		clear: (state) => {
			state.value = '';
			state.visible.btnClear = false;
			state.visible.list = false;
		},
		init: (state) => {
			state.value = '';
			state.visible.field = false;
			state.visible.btnClear = false;
			state.visible.list = false;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(search.fulfilled, (state, action: PayloadAction<Movies | undefined> ) => {
			if (action.payload) {

				if (action.payload.length === 0) {
					state.visible.list = false;
					return;
				}

				state.movies = action.payload;
				state.visible.list = true;
			}
		});
	}
});

export default searchSlice.reducer;
export const searchActions = searchSlice.actions;