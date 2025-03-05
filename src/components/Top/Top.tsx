import { FC, useEffect } from 'react';
import styles from './Top.module.scss';
import Container from '../Container/Container';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import MovieCard from '../MovieCard/MovieCard';
import { fetchGetTopMovies } from '../../api/Movies';
import { useQuery } from '@tanstack/react-query';
import { queryClient } from '../../api/QueryClient';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { errorActions } from '../../store/error.slice';
import TextLoader from '../../ui/TextLoader/TextLoader';
import Message from '../../ui/Message/Message';


/**
 * Компонент для отображения списка топ-10-ти фильмов
 */
const Top: FC = () => {

	const dispatch = useDispatch<AppDispatch>();

	const { data, error, isSuccess, isPending, isError } = useQuery({
		queryFn: () => fetchGetTopMovies(),
		queryKey: ['movie', 'top10'],
		gcTime: 0
	}, queryClient);

	useEffect(() => {
		if (error) {
			dispatch(errorActions.add([error.message]));
		}
	}, [error, dispatch]);

	return (
		<section className={styles['top']} aria-label="Топ 10 фильмов">
			<Container className={styles['top__container']}>
				<h2 className={styles['top__title']}>
                    Топ 10 фильмов
				</h2>
				{isPending && <TextLoader className={styles['top__message']} />}
				{isSuccess && data && data.length > 0 && (
					<div className={styles['top__list-container']}>
						< Swiper 
							className={styles['top__list-wrapper']}
							wrapperClass={styles['top__list']}
							spaceBetween={40}
							slidesPerView={'auto'}
							loop
							breakpoints={{
								567: {
									enabled: false
								}
							}}
						>
							{
								data.map((movie, index) => (
									<SwiperSlide className={styles['top__item']}
										key={movie.id}>
										<MovieCard 
											movie={movie}
											place={index + 1}
										/>
									</SwiperSlide>
								))
							}
						</Swiper>
					</ div>
				)}
				{isSuccess && data && data.length == 0 && <Message>Список фильмов пустой.</Message>}
				{isError && <Message>Ошибка загрузки данных.</Message>}
				
			</Container>
		</section>
	);
};

export default Top;