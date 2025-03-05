import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthForm, fetchGetProfile, fetchLogin, fetchLogout, fetchRegister, RegisterForm, User } from '../api/User';
import { ResultResponse, SuccessResponse } from '../api/Response';

export type TypeModal = 'reg' | 'auth' | 'success' | null;

export interface UserState {
	profile?: User,
	typeModal: TypeModal,
	loading: boolean,
	authErrorMessage: string,
	regErrorMessage: string
}

const initialState: UserState = {
	typeModal: null,
	loading: false,
	authErrorMessage: '',
	regErrorMessage: ''
};

export const getProfile = createAsyncThunk('user/profile', 
	async () => {
		return await fetchGetProfile();
	}
);

export const logout = createAsyncThunk('user/logout', 
	async () => {
		return await fetchLogout();
	}
);

export const login = createAsyncThunk('user/login', 
	async ( params: AuthForm) => {
		return await fetchLogin(params);
	}
);

export const register = createAsyncThunk('user/register', 
	async ( params: RegisterForm) => {
		return await fetchRegister(params);
	}
);

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {	
		openModal: (state, action: PayloadAction<TypeModal>) => {
			state.typeModal = action.payload;
		},
		closeModal: (state) => {
			state.typeModal = null;
			state.loading = false;
			state.regErrorMessage = '';
			state.authErrorMessage = '';
		},
		clearErrorMessage:  (state) => {
			state.regErrorMessage = '';
			state.authErrorMessage = '';
		}
	},
	extraReducers: (builder) => {

		// получение данных о текущем авторизованном пользователе
		/////////////////////////////////////////////////////////
		builder.addCase(getProfile.fulfilled, (state, action) => {
			state.profile = action.payload;
		});
		
		builder.addCase(getProfile.rejected, (state) => {
			state.profile = undefined;
		});

		// закрытие текущей пользовательской сессии
		/////////////////////////////////////////////////////////

		builder.addCase(logout.fulfilled, (state, action: PayloadAction<ResultResponse>) => {
			if (action.payload.result) {
				state.profile = undefined;
				state.typeModal = null;
			}
		});

		builder.addCase(logout.rejected, () => {
			return;
		});

		// аутентификации пользователя по электронной почте
		/////////////////////////////////////////////////////////

		builder.addCase(login.pending, (state) => {
			state.loading = true;
		});

	
		builder.addCase(login.fulfilled, (state, action: PayloadAction<ResultResponse | undefined>) => {
			if (action.payload?.result) {
				state.typeModal = null;
				state.loading = false;
			}
		});

		builder.addCase(login.rejected, (state, action) => {
			state.loading = false;
			if (action.error.message) {
				state.authErrorMessage = action.error.message;
			}
		});


	  	// регистрация/создание пользователя
		/////////////////////////////////////////////////////////

		builder.addCase(register.pending, (state) => {
			state.loading = true;
		});

	
		builder.addCase(register.fulfilled, (state, action: PayloadAction<SuccessResponse | undefined>) => {
			if (action.payload?.success) {
				state.typeModal = 'success';
				state.loading = false;
			}
		});

		builder.addCase(register.rejected, (state, action) => {
			state.loading = false;
			if (action.error.message) {
				state.regErrorMessage = action.error.message;
			}
		});

	}
});

export default userSlice.reducer;
export const userActions = userSlice.actions;