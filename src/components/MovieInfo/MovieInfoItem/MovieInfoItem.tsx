import { FC } from 'react';
import styles from '../MovieInfo.module.scss';
import { MovieInfoItemProps } from './MovieInfoItem.props';
import { capitalizeFirstLetter } from '../../../utils/utils';

/**
 * Компонент для отображения элемента списка дополнительной информации о фильме
 * @param {MovieInfoItemProps} props - объект со свойтвами компонента
 * @param {string} props.title - наименование
 * @param {string | null} props.value - значение
 */
const MovieInfoItem: FC<MovieInfoItemProps> = ({title, value}: MovieInfoItemProps) => {

	const outValue = value || '';

	return (
		<>
			<li className={styles['movie-info__item']}>
				<p className={styles['movie-info__item-name']}>
					<span className={styles['movie-info__item-name-text']}>{title}</span>
				</p>
				<p className={styles['movie-info__item-descr']}>{capitalizeFirstLetter(outValue)}</p>
			</li>
		</>
	);
};

export default MovieInfoItem;