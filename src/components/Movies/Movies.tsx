import { FC, useEffect, useState, MouseEvent } from 'react';
import styles from './Movies.module.scss';
import cn from 'classnames';
import Container from '../Container/Container';
import Icon from '../../ui/Icon/Icon';
import ButtonText from '../../ui/ButtonText/ButtonText';
import MovieCard from '../MovieCard/MovieCard';
import { Link, useParams } from 'react-router-dom';
import { getDataGenre } from '../../assets/images/genres/genres.image';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { useQuery } from '@tanstack/react-query';
import { queryClient } from '../../api/QueryClient';
import { errorActions } from '../../store/error.slice';
import { fetchGetMovies, Movies as MoviesType } from '../../api/Movies';
import TextLoader from '../../ui/TextLoader/TextLoader';
import Message from '../../ui/Message/Message';

/**
 * Компонент для отображения списка карточек фильмав по жанру
 */
const Movies: FC = () => {
	
	const { genre } = useParams();

	const [countPage, setCountPage] = useState(0);
	const [movies, setMovies] = useState<MoviesType | null>(null);

	const dispatch = useDispatch<AppDispatch>();

	const { data, error, isPending, isSuccess, isError } = useQuery({
		queryKey: ['movie', 'filter', genre, countPage],
		queryFn: () => fetchGetMovies({genre: genre, count: 15, page: countPage })
	}, queryClient);

	useEffect(() => {
		if (isSuccess && data && data.length > 0) {
			const temp_movies = movies === null ? []: movies;
			const moviesSort = [...temp_movies, ...data].sort((a, b) => a.id - b.id);
			setMovies(moviesSort);
		} 
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, isSuccess]);


	useEffect(() => {	
		if (error) {
			dispatch(errorActions.add([error.message]));
		}
	}, [error, dispatch]);

	const nameGenre = genre ? getDataGenre(genre).genreRU : '';

	const handlerClickBtnMore = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setCountPage(count => count + 1);
	};

	return (
		<section className={styles['movies']} aria-label="Список фильмов">
			<Container className={styles['movies__container']}>
				<div className={styles['movies__title']}>
					<div className={cn(styles['movies__title-icon-wrapper'], styles['movies__title-item'])}>
						<Link className={styles['movies__title-link']} to={'/genres'} >
							<Icon className={styles['movies__title-icon']} name='chapter' />
						</Link>
					</div>
					<h2 className={cn(styles['movies__title-text'], styles['movies__title-item'])}>{nameGenre}</h2>
				</div>
				{movies && movies.length > 0 && ( 
					<div className={styles['movies__list-container']}>
						<div className={styles['movies__list-wrapper']}>
							<ul className={styles['movies__list']}>
								{movies.map((movie) => (
									<li key={movie.id} className={styles['movies__item']}>
										<MovieCard key={movie.id}
											className={styles['movies__card']} 
											movie={movie}
										/>
									</li>
								))}
						 </ul>
							<div className={cn(styles['movies__btn-wrapper'], {
								[styles['none']]: data?.length === 0
							})}>
								<ButtonText 
									className={styles['movies__btn']} 
									text='Показать еще' 
									type='button' 
									loading={isPending}
									onClick={handlerClickBtnMore}
								/>
							</div>
						</div>
					</div>
				)} 
				{movies && movies.length == 0 && <Message>Список фильмов пуст.</Message>} 
				{!movies && isPending && <TextLoader className={styles['genres__message']} />}
				{!movies && isError && <Message>Ошибка загрузки данных.</Message>} 
			</Container>
		</section>
	);
};

export default Movies;