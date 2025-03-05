import { FC, useEffect } from 'react';
import styles from './MovieCard.module.scss';
import { MovieCardProps } from './MovieCard.props';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import ButtonClose from '../../ui/ButtonClose/ButtonClose';
import Place from '../../ui/Place/Place';
import urlMovieDefault from '../../assets/images/common/movie-default.jpg';
import { useMutation } from '@tanstack/react-query';
import { fetchRemoveFavorite } from '../../api/Favorites';
import { queryClient } from '../../api/QueryClient';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { errorActions } from '../../store/error.slice';

/**
 * Компонент отображения карточки фильма
 * @param {MovieCardProps} props - объект со свойтвами компонента
 * @param {Movie} props.movie - объект с данными фильма
 * @param {number} props.movie.id - идентификатор фильма
 * @param {string} props.movie.title - заготловок фильма
 * @param {string | null} props.movie.posterUrl - url постера фильма
 * @param {boolean | undefined} props.isButtonRemove - добавить кнопку удаления фильма 
 * @param {number | undefined} props.place - место фильма в рейтинге
 * @param {string | undefined} props.className - дополнительный класс для стилиации компонента
 * @param {object | undefined} props.handlers - объект с обработчиками событий компонента
 * @param {function | undefined} props.handlers.clickBtnRemoveFavorite - обработчик события клика по кнопке удаления фильма из избранного
 */
const MovieCard: FC<MovieCardProps> = ({
	movie, 
	isBtnRemoveFavorite, 
	place, 
	className,
	handlers
}) => {

	const dispatch = useDispatch<AppDispatch>();

	const {isSuccess, error,  mutate} = useMutation({
		mutationFn: fetchRemoveFavorite
	}, queryClient);

	const outPosterUrl = movie.posterUrl || urlMovieDefault;

	useEffect(() => {
		if (handlers && handlers.clickBtnRemoveFavorite) handlers.clickBtnRemoveFavorite(movie.id);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isSuccess]);

	useEffect(() => {
		if (error) {
			dispatch(errorActions.add([error.message]));
		}
	}, [error, dispatch]);

	const handlerRemoveFavorite = () => {
		mutate(movie.id);
	};

	return (
		 <div className={cn(styles['movie-card'], {[`${className}`]: className})}>
			<Link className={styles['movie-card__link']} to={`/movie/${movie.id}`}></Link>
			{isBtnRemoveFavorite && (
				<div className={cn(styles['movie-card__remove'])}>
					<ButtonClose type='button' onClick={handlerRemoveFavorite}/>
				</div>)}
			<div className={styles['movie-card__picture-wrapper']}>
				<picture className={styles['movie-card__picture']}>
					<source className={styles['movie-card__picture-source']}
						srcSet={outPosterUrl}
						media="(max-width: 1920px)"/>
					<source className={styles['movie-card__picture-source']}
						srcSet={outPosterUrl}
						media="(min-width: 1920px)"/>
					<img className={styles['movie-card__picture-img']}
						src={outPosterUrl} alt="Постер"/>
				</picture>
			</div>
			{!movie.posterUrl && (
				<div className={styles['movie-card__title-wrapper']}>
					<h2 className={styles['movie-card__title']}>{movie.title}</h2>
				</div>
			)}
			{place && (<div className={cn(styles['movie-card__place'])}>
				<Place place={place} />
			</div>)}
		</div>
	);
};

export default MovieCard;