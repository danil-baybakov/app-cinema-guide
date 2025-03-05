import { FC, useEffect } from 'react';
import styles from './Genres.module.scss';
import Container from '../Container/Container';
import GenreCard from '../GenreCard/GenreCard';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { useQuery } from '@tanstack/react-query';
import { queryClient } from '../../api/QueryClient';
import { errorActions } from '../../store/error.slice';
import { fetchGetGenres } from '../../api/Movies';
import TextLoader from '../../ui/TextLoader/TextLoader';
import Message from '../../ui/Message/Message';

/**
 * Компонент отображения списка карточек жанров
 */
const Genres: FC = () => {

	const dispatch = useDispatch<AppDispatch>();

	const { data, error, isSuccess, isPending, isError } = useQuery({
		queryFn: () => fetchGetGenres(),
		queryKey: ['movie', 'genres']
	}, queryClient);

	useEffect(() => {
		if (error) {
			dispatch(errorActions.add([error.message]));
		}
	}, [error, dispatch]);

	return (
		  <section className={styles['genres']} aria-label="Жанры фильмов">
			<Container className={styles['genres__container']}>
				<h2 className={styles['genres__title']}>
                    Жанры фильмов
				</h2>
				{isPending && <TextLoader className={styles['genres__message']} />}
				{isSuccess && data && 
				<div className={styles['genres__list-container']}>
					<div className={styles['genres__list-wrapper']}>
						<ul className={styles['genres__list']}>			
							{ data.map((item, index) => (
								<li className={styles['genre__item']} key={index}>
									<GenreCard genre={item} />
								</li>
							))}
						</ul>
					</div>
				</div>}
				{isSuccess && data && data.length == 0 && <Message>Список жанров пустой.</Message>}
				{isError && <Message>Ошибка загрузки данных.</Message>}
			</Container>
		</section>
	);
};

export default Genres;