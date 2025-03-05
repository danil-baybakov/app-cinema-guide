import Container from '../Container/Container';
import styles from './MoviePoster.module.scss';
import cn from 'classnames';

import Rating from '../../ui/Rating/Rating';
import { FC } from 'react';
import { formatHoursAndMinutesToString, formatRangeYearsToString } from '../../utils/utils';
import ButtonIcon from '../../ui/ButtonIcon/ButtonIcon';
import ButtonText from '../../ui/ButtonText/ButtonText';
import { MoviePosterProps } from './MoviePoster.props';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { getRandomMovie } from '../../store/poster.slice';
import ButtonFavorite from './ButtonFavorite/ButtonFavorite';
import { playerActions } from '../../store/player.slice';


/**
 * Компонент для отображения постера фильма
 * 
 * @param {MoviePosterProps} props - объект со свойтвами компонента
 * 
 * @param {number} props.movie.id - id фильма
 * @param {string} props.movie.title - заголовок фильма
 * @param {string} props.movie.posterUrl - постер к фильму
 * @param {number} props.movie.relaseYear - год выпуска фильма
 * @param {string} props.movie.plot - краткое описание фильма
 * @param {string[]} props.movie.genres - жанр фильма
 * @param {number} props.movie.tmdbRating - рейтинг фильма
 * @param {number} props.movie.runtime - продолительность фильма в минутах
 * 
 * @param {'primary' | 'secondary'} props.appearence - вид компонента
 * @param {number} props.toRelaseYear - конец года выпуска фильма если диапазон
 * @param {boolean} props.isHoureRuntime - формат вывода продолительности фильма (1 - часы минуты, 2 - только минуты)
 * 
 * @param {boolean} props.isVisibleShortDescription - отобразить опмсание кратко
 */
const MoviePoster: FC<MoviePosterProps> = ({
	movie,
	appearence='primary',
	toReleaseYear,
	isMinuteRuntime,
	isVisibleShortDescription = false
}: MoviePosterProps) => {

	const dispatch = useDispatch<AppDispatch>();

	const navigate = useNavigate();

	const outRangeYear = formatRangeYearsToString(movie.releaseYear, toReleaseYear);
	
	const outRuntime = formatHoursAndMinutesToString(movie.runtime, !isMinuteRuntime);
	
	const outBackdropUrl = movie.backdropUrl || '';

	
	const handlerClickBtnTrailer = () => {
		if (movie) {
			dispatch(playerActions.open({
				url: movie.trailerUrl,
				title: movie.title
			}));
		}
	};

	const handlerClickBtnAbout = () => {
		if (movie) navigate(`/movie/${movie.id}`);
	};


	const handlerClickBtnUpdate = async () => {
		await dispatch(getRandomMovie());
	};

	
	return (
		<section className={cn(styles['movie-poster'], {
			[styles['secondary']]: appearence === 'secondary'
		})} >
			<Container className={cn(styles['movie-poster__container'])}>
				<div className={styles['movie-poster__picture-wrapper']}>
					<picture className={styles['movie-poster__picture']}>
						<source className={styles['movie-poster__picture-source']} srcSet={outBackdropUrl}
							media="(max-width: 1920px)"/>
						<source className={styles['movie-poster__picture-source']} srcSet={outBackdropUrl}
							media="(min-width: 1920px)"/>
						<img className={styles['movie-poster__picture-img']} src={outBackdropUrl} alt="Постер"/>
					</picture>
				</div>

				 <div className={styles['movie-poster__content']}>
					<div className={styles['movie-poster__data']}>
						<ul className={styles['movie-poster__data-list']}>
							<li className={styles['movie-poster__data-item']}>
								<Rating rating={movie.tmdbRating} size='large'/>
							</li>
							<li className={styles['movie-poster__data-item']}>
								<time className={styles['movie-poster__time']} dateTime={outRangeYear.format}>
									{outRangeYear.value}
								</time>
							</li>
							<li className={styles['movie-poster__data-item']}>
								<p className={styles['movie-poster__text']}>
									{movie.genres.join(', ')}
								</p>
							</li>
							<li className={styles['movie-poster__data-item']}>
								<time className={styles['movie-poster__time']}  dateTime={outRuntime.format}>
									{outRuntime.value}
								</time>
							</li>
						</ul>
						<h2 className={cn(styles['movie-poster__title'], {
							[styles['short']]: isVisibleShortDescription
						})}>
							{movie.title}
						</h2>
						<p className={cn(styles['movie-poster__description'], {
							[styles['short']]: isVisibleShortDescription
						})}>
							{movie.plot}
						</p>
					</div>
					<div className={styles['movie-poster__control']}>
						<ul className={styles['movie-poster__control-list']}>
							<li className={styles['movie-poster__control-item']}>
								<ButtonText 
									className={styles['movie-poster__control-item-btn']} 
									text='Трейлер' 
									type='button' 
									onClick={handlerClickBtnTrailer}
								/>
							</li>
							<li className={styles['movie-poster__control-item']}>
								<ButtonText 
									className={styles['movie-poster__control-item-btn']} 
									text='О фильме' 
									appearence='secondary' 
									type='button' 
									onClick={handlerClickBtnAbout}
								/>
							</li>
							<li className={styles['movie-poster__control-item']}>
								<ButtonFavorite movieId={movie.id} />
							</li>
							<li className={styles['movie-poster__control-item']}>							
								<ButtonIcon 
									className={styles['movie-poster__control-item-btn']}
									appearence='secondary'
									type='button'
									nameSvg1='random'
									onClick={handlerClickBtnUpdate}
								/>
							</li>
						</ul>
					</div>
				</div>
			</Container>
		</section>
	);
};

export default MoviePoster;