import axios, { AxiosError } from 'axios';
import { BASE_URL } from './Config';
import { ZodError } from 'zod';
import { ResultResponse, ResultResponseSchema } from './Response';
import { Movies, MoviesSchema } from './Movies';

/**
 * Функция осуществляет запрос на бэкэнд (API) 
 * для добавления фильма в избранное
 * @returns {ResultResponse} объект с информацией о успешном выполнении запроса
 */
export async function fetchAddFavorite(id: number): Promise<ResultResponse | undefined> {
	try {
		const { data } = await axios.post<ResultResponse>(`${BASE_URL}/favorites`, 
			{
				id: id
			}, 
			{ 
				withCredentials: true, 
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				} 
			} 
		);
		return ResultResponseSchema.parse(data);
	} catch (error) {

		if (axios.isAxiosError(error)) {

			const axiosError: AxiosError = error;

			if (axiosError.code === 'ERR_BAD_REQUEST') {
				if (axiosError.response) {
					if (axiosError.response.status === 400)
						throw new Error('Ошибка запроса добавления фильма в избранные: фильм уже добавлен в избранные.');
					else if (axiosError.response.status === 404) {
						throw new Error('Ошибка запроса добавления фильма в избранные: ресурс не найден, проверьте на корректность запрос.');
					} else {
						throw new Error('Ошибка запроса добавления фильма в избранные: неизветная ошибка');
					}
				}
			} else if (axiosError.code === 'ERR_NETWORK') {
				throw new Error('Ошибка запроса добавления фильма в избранные: ошибка связи с сервером, проверьте подключение.');
			}	
		} else if (error instanceof ZodError) {
			throw new Error('Ошибка запроса добавления фильма в избранные: неккоректная валидации данных полученных с сервера');
		} else {
			throw new Error('Ошибка запроса добавления фильма в избранные: неизветная ошибка');
		}

	}
}

/**
 * Функция осуществляет запрос на бэкэнд (API) 
 * для удаления фильма из избранного
 * @returns {ResultResponse} объект с информацией о успешном выполнении запроса
 */
export async function fetchRemoveFavorite(id: number): Promise<ResultResponse | undefined> {
	try {
		const { data } = await axios.delete<ResultResponse>(`${BASE_URL}/favorites/${id}`, 
			{ 
				withCredentials: true 
			} 
		);
		return ResultResponseSchema.parse(data);
	} catch (error) {
		if (axios.isAxiosError(error)) {

			const axiosError: AxiosError = error;

			if (axiosError.code === 'ERR_BAD_REQUEST') {
				if (axiosError.response) {
					if (axiosError.response.status === 404)
						throw new Error('Ошибка запроса удаления фильма из избранного: ресурс не найден, проверьте на корректность запрос.');
					else {
						throw new Error('Ошибка запроса удаления фильма из избранного: неизветная ошибка');
					}
				}
			} else if (axiosError.code === 'ERR_NETWORK') {
				throw new Error('Ошибка запроса удаления фильма из избранного: ошибка связи с сервером, проверьте подключение.');
			}	
		} else if (error instanceof ZodError) {
			throw new Error('Ошибка запроса удаления фильма из избранного: неккоректная валидации данных полученных с сервера.');
		} else {
			throw new Error('Ошибка запроса удаления фильма из избранного: неизветная ошибка');
		}

	}
}


/**
 * Функция осуществляет запрос на бэкэнд (API) 
 * для получения списка избранных фильмов
 * @returns {Movies}  список избранных фильмов
 */
export async function fetchGetFavorite(): Promise<Movies | undefined> {
	try {
		const { data } = await axios.get<Movies>(`${BASE_URL}/favorites`, 
			{ 
				withCredentials: true 
			} 
		);
		return MoviesSchema.parse(data);
	} catch (error) {
		if (axios.isAxiosError(error)) {

			const axiosError: AxiosError = error;

			if (axiosError.code === 'ERR_BAD_REQUEST') {
				if (axiosError.response) {
					if (axiosError.response.status === 404)
						throw new Error('Ошибка запроса получения списка избранных фильмов: ресурс не найден, проверьте на корректность запрос.');
					else {
						throw new Error('Ошибка запроса получения списка избранных фильмов: неизветная ошибка');
					}
				}
			} else if (axiosError.code === 'ERR_NETWORK') {
				throw new Error('Ошибка запроса получения списка избранных фильмов: ошибка связи с сервером, проверьте подключение.');
			}	
		} else if (error instanceof ZodError) {
			throw new Error('Ошибка запроса получения списка избранных фильмов: неккоректная валидации данных полученных с сервера.');
		} else {
			throw new Error('Ошибка запроса получения списка избранных фильмов: неизветная ошибка');
		}

	}
}