import { FC } from 'react';
import styles from './Place.module.scss';
import { PlaceProps } from './Place.props';

/**
 * Компонент для отображения места в рейтинге
 * @param {PlaceProps} props - объект со свойтвами компонента
 * @param {number | undefined} props.place - значение - место в рейтинге
 */
const Place: FC<PlaceProps> = ({place}) => {
	return (
		<div className={styles['place']}>
			{place && <span className={styles['place__text']}>{place}</span>}
		</div> 
	);
};

export default Place;