import { FC, useEffect } from 'react';
import MoviePoster from '../../components/MoviePoster/MoviePoster';
import MovieInfo from '../../components/MovieInfo/MovieInfo';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { useQuery } from '@tanstack/react-query';
import { queryClient } from '../../api/QueryClient';
import { errorActions } from '../../store/error.slice';
import { fetchGetMovieById } from '../../api/Movies';
import TextLoader from '../../ui/TextLoader/TextLoader';
import styles from './MoviePage.module.scss';
import Message from '../../ui/Message/Message';
import Plug from '../../components/Plug/Plug';
import Container from '../../components/Container/Container';

/**
 * Страница фильма
 */
const MoviePage: FC = () => {

	const { id } = useParams();

	const parseId = (id?: string) => {
		const numId = Number(id);
		if (isNaN(numId)) return;
		return numId;
	};
	
	const dispatch = useDispatch<AppDispatch>();

	const { data, error, isSuccess, isPending, isError } = useQuery({
		queryKey: ['movie', id],
		queryFn: () => fetchGetMovieById(parseId(id))
	}, queryClient);

	useEffect(() => {	
		if (error) {
			dispatch(errorActions.add([error.message]));
		}
	}, [error, dispatch]);

	return (
		<>
			{ (!isSuccess || (isSuccess && !data)) &&
			<Container>
				<Plug />
				{ isPending && <TextLoader className={styles['movie-page__message']} />}
				{ isSuccess && <Message>Фильм с укаанным Id не найден.</Message>}
				{ isError && <Message>Ошибка загрузки данных.</Message>}
			</Container>
			}
			{isSuccess && data && <>
				<MoviePoster 
					movie={data}
					appearence='secondary'
				/>
				<MovieInfo 
					movie={data}
				/>
			</>
			}
		</>
	);
};

export default MoviePage;