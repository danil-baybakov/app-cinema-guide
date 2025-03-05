import { FC } from 'react';
import styles from './MovieInfo.module.scss';
import { MovieInfoProps } from './MovieInfo.props';
import Container from '../Container/Container';
import { formatNumberToCurrencyUSD, getLanguage } from '../../utils/utils';
import MovieInfoItem from './MovieInfoItem/MovieInfoItem';
import { MovieInfoItemsInterface } from './MovieInfoItem/MovieInfoItem.interface';

/**
 * Компонент для отображения списка дополнительной информации о фильме
 * @param {MovieInfoProps} props - объект со свойтвами компонента
 * @param {Movie} props.movie - объект с данными о фильме
 * @param {string} props.movie.language - язык оригинала
 * @param {string | undefined | null} props.movie.budget - бюджет
 * @param {string | undefined | null} props.movie.revenue - выручка
 * @param {string | undefined | null} props.movie.director - режиссёр
 * @param {string | undefined | null} props.movie.production - продакшен
 * @param {string | undefined | null} props.movie.awardsSummary - награды
 */
const MovieInfo: FC<MovieInfoProps> = ({
	movie
}: MovieInfoProps) => {

	const movieInfoItems: MovieInfoItemsInterface = [
		{
			id: 1,
			title: 'Язык оригинала',
			value: getLanguage(movie.language, ['en'])
		},
		{
			id: 2,
			title: 'Бюджет',
			value: formatNumberToCurrencyUSD(movie.budget)
		},
		{
			id: 3,
			title: 'Выручка',
			value: formatNumberToCurrencyUSD(movie.revenue) 
		},
		{
			id: 4,
			title: 'Режиссёр',
			value: movie.director
		},
		{
			id: 5,
			title: 'Продакшен',
			value: movie.production
		},
		{
			id: 6,
			title: 'Награды',
			value: movie.awardsSummary
		}
	];

	return (
		  <section className={styles['movie-info']} aria-label="О фильме">
			<Container className={styles['movie-info__container']}>
				<h2 className={styles['movie-info__title']}>
                    О фильме
				</h2>
				<ul className={styles['movie-info__list']}>
					{movieInfoItems.map((movieInfoItem) => (
						<MovieInfoItem key={movieInfoItem.id}
							title={movieInfoItem.title}
							value={movieInfoItem.value}
						/>
					))}
				</ul>
			</Container>
		</section>
	);
};

export default MovieInfo;