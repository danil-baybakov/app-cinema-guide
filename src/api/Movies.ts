import axios, { AxiosError } from 'axios';
import { z, ZodError } from 'zod';
import { BASE_URL } from './Config';

export const MovieSchema = z.object({
	id: z.number(),
	title: z.string(),
	originalTitle: z.string(),
	language: z.string(),
	releaseYear: z.number().optional().nullable(),
	releaseDate: z.string().optional().nullable(),
	genres: z.string().array(),
	plot: z.string(),
	runtime: z.number(),
	budget: z.string().optional().nullable(),
	revenue: z.string().optional().nullable(),
	homepage: z.string(),
	status: z.string(),
	posterUrl: z.string().optional().nullable(),
	backdropUrl: z.string().optional().nullable(),
	trailerUrl: z.string(),
	trailerYouTubeId: z.string(),
	tmdbRating: z.number(),
	searchL: z.string(),
	keywords: z.string().array(),
	countriesOfOrigin: z.string().array(),
	languages: z.string().array(),
	cast: z.string().array(),
	director: z.string().optional().nullable(),
	production: z.string().optional().nullable(),
	awardsSummary: z.string().optional().nullable()
});

export type Movie = z.infer<typeof MovieSchema>

export const MoviesSchema = z.array(MovieSchema);

export type Movies = z.infer<typeof MoviesSchema>;

export type TypeQueryParamsFetchGetMovies = {
	count?: number,
	page?: number,	
	title?: string,
	genre?: string
}

export const GenreSchema = z.string();

export type Genre = z.infer<typeof GenreSchema>;

export const GenresSchema = z.array(GenreSchema);

export type Genres = z.infer<typeof GenresSchema>;

/**
 * Функция осуществляет запрос на бэкэнд (API) 
 * для получения списка фильмов по заданным фильтрам
 * @param {TypeQueryParamsFetchGetMovies} params - query - параметры
 * @param {number | undefined} params.count - ограничение количества возвращаемых фильмов (по-умолчанию - 50)
 * @param {number | undefined} params.page - показ следующей страницы списка фильмов
 * @param {string | undefined} params.title - фильтр по названию фильма
 * @param {string | undefined} params.genre - фильтр по жанру
 * @returns {Movies} список фильмов
 */
export async function fetchGetMovies( params?: TypeQueryParamsFetchGetMovies): Promise<Movies | undefined> {
	try {
		const { data } = await axios.get<Movies>(`${BASE_URL}/movie`, { params: params });
		return MoviesSchema.parse(data);

	} catch (error) {

		if (axios.isAxiosError(error)) {

			const axiosError: AxiosError = error;

			if (axiosError.code === 'ERR_BAD_REQUEST') {
				if (axiosError.response) {
					if (axiosError.response.status === 404) {
						throw new Error('Ошибка запроса получения списка фильмов по заданным фильтрам: ресурс не найден, проверьте на корректность запрос.');
					} else {
						throw new Error('Ошибка запроса получения списка фильмов по заданным фильтрам: неизветная ошибка');
					}
				}
			} else if (axiosError.code === 'ERR_NETWORK') {
				throw new Error('Ошибка запроса получения списка фильмов по заданным фильтрам: ошибка связи с сервером, проверьте подключение.');
			}	
		} else if (error instanceof ZodError) {
			throw new Error('Ошибка запроса получения списка фильмов по заданным фильтрам: неккоректная валидации данных полученных с сервера');
		} else {
			throw new Error('Ошибка запроса получения списка фильмов по заданным фильтрам: неизветная ошибка');
		}

	}
}

/**
 * Функция осуществляет запрос на бэкэнд (API) 
 * для получения случайного фильма
 * @returns {Movie} объект с данными случайного фильма
 */
export async function fetchGetRandomMovie(): Promise<Movie | undefined> {
	try {
		const { data } = await axios.get<Movie>(`${BASE_URL}/movie/random` );
		return MovieSchema.parse(data);
	} catch (error) {

		if (axios.isAxiosError(error)) {

			const axiosError: AxiosError = error;

			if (axiosError.code === 'ERR_BAD_REQUEST') {
				if (axiosError.response) {
					if (axiosError.response.status === 404) {
						throw new Error('Ошибка запроса получения случайного фильма: ресурс не найден, проверьте на корректность запрос.');
					} else {
						throw new Error('Ошибка запроса получения случайного фильма: неизветная ошибка');
					}
				}
			} else if (axiosError.code === 'ERR_NETWORK') {
				throw new Error('Ошибка запроса получения случайного фильма: ошибка связи с сервером, проверьте подключение.');
			}	
		} else if (error instanceof ZodError) {
			throw new Error('Ошибка запроса получения случайного фильма: неккоректная валидации данных полученных с сервера');
		} else {
			throw new Error('Ошибка запроса получения случайного фильма: неизветная ошибка');
		}

	}
}

/**
 * Функция осуществляет запрос на бэкэнд (API) 
 * для получения фильмов с наивысшим рейтингом
 * @returns {Movies} список фильмов с наивысшим рейтингом
 */
export async function fetchGetTopMovies(): Promise<Movies | undefined> {
	try {
		const { data } = await axios.get<Movies>(`${BASE_URL}/movie/top10` );
		return MoviesSchema.parse(data);
	} catch (error) {

		if (axios.isAxiosError(error)) {

			const axiosError: AxiosError = error;

			if (axiosError.code === 'ERR_BAD_REQUEST') {
				if (axiosError.response) {
					if (axiosError.response.status === 404) {
						throw new Error('Ошибка запроса получения списка фильмов с наивысшим рейтингом: ресурс не найден, проверьте на корректность запрос.');
					} else {
						throw new Error('Ошибка запроса получения списка фильмов с наивысшим рейтингом');
					}
				}
			} else if (axiosError.code === 'ERR_NETWORK') {
				throw new Error('Ошибка запроса получения списка фильмов с наивысшим рейтингом: ошибка связи с сервером, проверьте подключение.');
			}	
		} else if (error instanceof ZodError) {
			throw new Error('Ошибка запроса получения списка фильмов с наивысшим рейтингом: неккоректная валидации данных полученных с сервера');
		} else {
			throw new Error('Ошибка запроса получения списка фильмов с наивысшим рейтингом: неизветная ошибка');
		}

	}
}


/**
 * Функция осуществляет запрос на бэкэнд (API) 
 * для получения списка жанров фильма
 * @returns {Genres} список жанров
 */
export async function fetchGetGenres(): Promise<Genres | undefined> {
	try {
		const { data } = await axios.get<Genres>(`${BASE_URL}/movie/genres` );
		return GenresSchema.parse(data);
	} catch (error) {

		if (axios.isAxiosError(error)) {

			const axiosError: AxiosError = error;

			if (axiosError.code === 'ERR_BAD_REQUEST') {
				if (axiosError.response) {
					if (axiosError.response.status === 404) {
						throw new Error('Ошибка запроса получения списка жанров фильма: ресурс не найден, проверьте на корректность запрос.');
					} else {
						throw new Error('Ошибка запроса получения списка жанров фильма');
					}
				}
			} else if (axiosError.code === 'ERR_NETWORK') {
				throw new Error('Ошибка запроса получения списка жанров фильма: ошибка связи с сервером, проверьте подключение.');
			}	
		} else if (error instanceof ZodError) {
			throw new Error('Ошибка запроса получения списка жанров фильма: неккоректная валидации данных полученных с сервера');
		} else {
			throw new Error('Ошибка запроса получения списка жанров фильма: неизветная ошибка');
		}

	}
}

/**
 * Функция осуществляет запрос на бэкэнд (API) 
 * для получения фильма по id
 * @returns {Movie} объект с данными фильма
 */
export async function fetchGetMovieById(id?: number): Promise<Movie | undefined> {
	try {
		const { data } = await axios.get<Movie>(`${BASE_URL}/movie/${id}` );
		return MovieSchema.parse(data);
	} catch (error) {

		if (axios.isAxiosError(error)) {

			const axiosError: AxiosError = error;

			if (axiosError.code === 'ERR_BAD_REQUEST') {
				if (axiosError.response) {
					if (axiosError.response.status === 404) {
						throw new Error('Ошибка запроса получения фильма по Id: ресурс не найден, проверьте на корректность запрос.');
					} else {
						throw new Error('Ошибка запроса получения фильма по Id');
					}
				}
			} else if (axiosError.code === 'ERR_NETWORK') {
				throw new Error('Ошибка запроса получения фильма по Id: ошибка связи с сервером, проверьте подключение.');
			}	
		} else if (error instanceof ZodError) {
			throw new Error('Ошибка запроса получения фильма по Id: неккоректная валидации данных полученных с сервера');
		} else {
			throw new Error('Ошибка запроса получения фильма по Id: неизветная ошибка');
		}

	}
}