import { FC, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import styles from './AccountFavorites.module.scss';
import MovieCard from '../../MovieCard/MovieCard';
import { fetchGetFavorite } from '../../../api/Favorites';
import { AppDispatch } from '../../../store/store';
import { useDispatch } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { queryClient } from '../../../api/QueryClient';
import { errorActions } from '../../../store/error.slice';
import TextLoader from '../../../ui/TextLoader/TextLoader';
import Message from '../../../ui/Message/Message';
import { getProfile } from '../../../store/user.slice ';

/**
 * Компонент отображения раздела со списком избранных фильмов пользователя
 * @returns 
 */
const AccountFavorites: FC = () => {

	const dispatch = useDispatch<AppDispatch>();

	const { data, error, isSuccess, isPending, isError, refetch} = useQuery({
		queryFn: () => fetchGetFavorite(),
		queryKey: ['favorite'],
		gcTime: 0
	}, queryClient);

	useEffect(() => {
		if (error) {
			dispatch(errorActions.add([error.message]));
		}
	}, [error, dispatch]);

	const handlerBtnRemoveFavorite = async () => {
		await refetch();
		if (isSuccess) await dispatch(getProfile());
	};
	
	return (
		<div className={styles['account-favorites']}>
			<div className={styles['account-favorites__list-container']}>
				{isPending && <TextLoader className={styles['genres__message']} />}
				{isSuccess && data && 
					< Swiper 
						className={styles['account-favorites__list-wrapper']}
						wrapperClass={styles['account-favorites__list']}
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
							data.map(movie => (
								<SwiperSlide className={styles['account-favorites__item']}
									key={movie.id}>
									<MovieCard 
										movie={movie}
										isBtnRemoveFavorite
										handlers={{clickBtnRemoveFavorite: handlerBtnRemoveFavorite}}
									/>
								</SwiperSlide>
							))
						}
					</Swiper>}
				{isSuccess && data && data.length == 0 && <Message>Список избранных фильмов пуст.</Message>}
				{isError && <Message>Ошибка загрузки данных.</Message>}
			</div>
		</div>
	);
};

export default AccountFavorites;