import { FC } from 'react';
import styles from './GenreCard.module.scss';
import { GenreCardProps } from './GenreCard.props';
import { Link } from 'react-router-dom';
import { capitalizeFirstLetter } from '../../utils/utils';
import { getDataGenre } from '../../assets/images/genres/genres.image';

/**
 * Компонент отображения карточки жанра
 * @param {GenreCardProps} props - объект со свойтвами компонента
 * @param {string} props.genre - наименование жанра фильма
 */
const GenreCard: FC<GenreCardProps> = ({ genre = 'unknown' }) => {
	const dataGenre = getDataGenre(genre);

	return (
		<div className={styles['genre-card']}>
			<Link className={styles['genre-card__link']} to={`/movies/${dataGenre.name}`}/>
			<div className={styles['genre-card__picture-wrapper']}>
				<picture className={styles['genre-card__picture']}>
					<source className={styles['genre-card__picture-source']}
						srcSet={dataGenre.url} media="(max-width: 1920px)"/>
					<source className={styles['genre-card__picture-source']}
						srcSet={dataGenre.url} media="(min-width: 1920px)"/>
					<img className={styles['genre-card__picture-img']}
						src={dataGenre.url} alt={dataGenre.genreRU}/>
				</picture>
			</div>
			<h3 className={styles['genre-card__title']}>{capitalizeFirstLetter(dataGenre.genreRU)}</h3>
		</div>
	);
};

export default GenreCard;