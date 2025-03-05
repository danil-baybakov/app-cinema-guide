import { FC } from 'react';
import styles from './SearchCard.module.scss';
import { SearchCardProps } from './SearchCard.props';
import { Link } from 'react-router-dom';
import Rating from '../../ui/Rating/Rating';
import { formatHoursAndMinutesToString, formatRangeYearsToString } from '../../utils/utils';
import urlMovieDefault from '../../assets/images/common/movie-default.jpg';

/**
 * Компонент для отобраения карточки списка поиска фильмов
 * 
 * @param {SearchCardProps} props - объект со свойтвами компонента
 * 
 * @param {number} props.movie.id - id фильма
 * @param {string} props.movie.title - заголовок фильма
 * @param {string} props.movie.posterUrl - постер к фильму
 * @param {number} props.movie.relaseYear - год выпуска фильма
 * @param {string[]} props.movie.genres - жанр фильма
 * @param {number} props.movie.tmdbRating - рейтинг фильма
 * @param {number} props.movie.runtime - продолительность фильма в минутах
 * 
 * @param {number} props.toRelaseYear - конец года выпуска фильма если диапазон
 * @param {boolean} props.isMinuteRuntime - формат вывода продолительности фильма (0 - часы минуты, 1 - только минуты)
 * @param {Object} props.handlers - объект с обработчиками событий
 * 
 * @param {Function} props.handlers.onClick - обработчик события клика на ссылке компонента
 * @returns 
 */
const SearchCard: FC<SearchCardProps> = ({
	movie,
	toReleaseYear,
	isMinuteRuntime,
	handlers
}: SearchCardProps) => {

	const outRangeYear = formatRangeYearsToString(movie.releaseYear, toReleaseYear);

	const outRuntime = formatHoursAndMinutesToString(movie.runtime, !isMinuteRuntime);

	const outPosterUrl = movie.posterUrl || urlMovieDefault;

	return (
		<div className={styles['search-card']}>
			<Link className={styles['search-card__link']} to={`/movie/${movie.id}`} onClick={handlers?.onClick}/>
			<div className={styles['search-card__preview']}>
				<div className={styles['search-card__img-wrapper']}>
					<img className={styles['search-card__img']}
						src={outPosterUrl} alt="Постер" />
				</div>
			</div>
			<div className={styles['search-card__content']}>
				<div className={styles['search-card__data']}>
					<ul className={styles['search-card__data-list']}>
						<li className={styles['search-card__data-item']}>
							<Rating rating={movie.tmdbRating}/>
						</li>
						<li className={styles['search-card__data-item']}>
							<time className={styles['search-card__time']} dateTime={outRangeYear.format}>
								{outRangeYear.value}
							</time>
						</li>
						<li className={styles['search-card__data-item']}>
							<p className={styles['search-card__text']}>
								{movie.genres.join(', ')}
							</p>
						</li>
						<li className={styles['search-card__data-item']}>
							<time className={styles['search-card__time']} dateTime={outRuntime.format}>
								{outRuntime.value}
							</time>
						</li>
					</ul>
				</div>
				<div className={styles['search-card__title-wrapper']}>
					<h2 className={styles['search-card__title']}>
						{movie.title}
					</h2>
				</div>
			</div>
		</div>
	);
};

export default SearchCard;