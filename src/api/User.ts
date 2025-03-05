import axios, { AxiosError } from 'axios';
import { z, ZodError } from 'zod';
import { BASE_URL } from './Config';
import { ResultResponse, ResultResponseSchema, SuccessResponse, SuccessResponseSchema } from './Response';

export const UserSchema = z.object({
	name: z.string(),
	surname: z.string(),
	email: z.string(),
	favorites: z.string().array()
});

export type User = z.infer<typeof UserSchema>


export const AuthFormSchema = z.object({
	email: z.string()
		.nonempty('E-mail обязателен для заполнения.')
		.email('Неккоректно введен e-mail.'),
	password: z.string()
		.nonempty('Пароль обязателен для заполнения.')
		.min(4, 'Длинна пароля должна быть не менее 4 символов.')
});

export type AuthForm = z.infer<typeof AuthFormSchema>


export const RegisterFormSchema = z.object({
	email: z.string()
		.nonempty('E-mail обязателен для заполнения.')
		.email('Неккоректно введен e-mail.'),
	name: z.string()
		.nonempty('Имя обязателено для заполнения.')
		.min(2, 'Длинна имени должна быть не менее 2 символов.')
		.max(30, 'Длинна имени должна быть не более 30 символов.'),
	surname: z.string()
		.nonempty('Фамилия обязателена для заполнения.')
		.min(2, 'Длинна имени должна быть не менее 2 символов.')
		.max(40, 'Длинна имени должна быть не более 40 символов.'),
	password: z.string()
		.nonempty('Пароль обязателен для заполнения.')
		.min(4, 'Длинна пароля должна быть не менее 4 символов.'),
	confirmPassword: z.string()
		.nonempty('Пароль обязателен для заполнения.')
		.min(4, 'Длинна пароля должна быть не менее 4 символов.')
}).superRefine(({ confirmPassword, password }, ctx) => {
	if (confirmPassword !== password) {
		ctx.addIssue({
			code: 'custom',
			message: 'Пароли не совпадали',
			path: ['confirmPassword']
		});
	}
});

export type RegisterForm = z.infer<typeof RegisterFormSchema>

/**
 * Функция осуществляет запрос на бэкэнд (API) 
 * для получения данных о текущем авторизованном пользователе
 * @returns {User} объект с данными о текущем авторизованном пользователе
 */
export async function fetchGetProfile(): Promise<User> {
	const { data } = await axios.get<User>(`${BASE_URL}/profile`, { withCredentials: true });
	return UserSchema.parse(data);
}

/**
 * Функция осуществляет запрос на бэкэнд (API) 
 * для закрытия текущей пользовательской сессии
 * @returns {ResultResponse} объект с информацией о успешном выполнении запроса
 */
export async function fetchLogout(): Promise<ResultResponse> {
	const { data } = await axios.get<ResultResponse>(`${BASE_URL}/auth/logout`, { withCredentials: true });
	return ResultResponseSchema.parse(data);
}

/**
 * Функция осуществляет запрос на бэкэнд (API) 
 * для аутентификации пользователя по электронной почте
 * @returns {ResultResponse} объект с информацией о успешном выполнении запроса
 */
export async function fetchLogin(params: AuthForm): Promise<ResultResponse | undefined> {
	try {
		const { data } = await axios.post<ResultResponse>(`${BASE_URL}/auth/login`, {
			email: params.email,
			password: params.password
		} ,{ withCredentials: true });
		return ResultResponseSchema.parse(data);

	} catch (error) {
		if (axios.isAxiosError(error)) {

			const axiosError: AxiosError = error;

			if (axiosError.code === 'ERR_BAD_REQUEST') {
				if (axiosError.response) {
					if (axiosError.response.status === 400)
						throw new Error('Пользователь не зарегестрирован. Пройдите регистрацию пользователя.');
					else {
						throw new Error('Регистрация не удалась, неизвестная ошибка.');
					}
				}
			} else if (axiosError.code === 'ERR_NETWORK') {
				throw new Error('Ошибка связи с сервером. Проверьте подключение.');
			}	
		} else if (error instanceof ZodError) {
			throw new Error('Ошибка валидации данных полученных с сервера.');
		} else {
			throw new Error('Неизветная ошибка');
		}

	}
}

/**
 * Функция осуществляет запрос на бэкэнд (API) 
 * для регистрации/создания пользователя
 * @returns {SuccessfulResult} объект с информацией о успешном выполнении запроса
 */
export async function fetchRegister(params: RegisterForm): Promise<SuccessResponse | undefined> {
	try {
		const { data } = await axios.post<SuccessResponse>(`${BASE_URL}/user`, {
			email: params.email,
			password: params.password,
			name: params.name,
			surname: params.surname
		} ,{ withCredentials: true });
		return SuccessResponseSchema.parse(data);
	} catch (error) {
		if (axios.isAxiosError(error)) {

			const axiosError: AxiosError = error;

			if (axiosError.code === 'ERR_BAD_REQUEST') {
				if (axiosError.response) {
					if (axiosError.response.status === 409)
						throw new Error('Пользователь уже существует.');
					else if (axiosError.response.status === 400)
						throw new Error('Регистрация не удалась, проверьте переданные данные на корректность.');
					else {
						throw new Error('Регистрация не удалась, неизвестная ошибка.');
					}
				}
			} else if (axiosError.code === 'ERR_NETWORK') {
				throw new Error('Ошибка связи с сервером. Проверьте подключение.');
			}	
		} else if (error instanceof ZodError) {
			throw new Error('Ошибка валидации данных полученных с сервера.');
		} else {
			throw new Error('Неизветная ошибка');
		}

	}
}
