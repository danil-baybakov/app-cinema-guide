import { FC } from 'react';
import styles from './Rating.module.scss';
import { RatingProps } from './Rating.props';
import cn from 'classnames';
import Icon from '../Icon/Icon';

/**
 * Компонент для отображения рейтинга 0-10
 * @param {RatingProps} props - объект со свойтвами компонента
 * @param {number} props.rating - значение - рейтинг
 * @param {string | undefined} props.size - размер small/big - маленький/большой
 */
const Rating: FC<RatingProps> = ({rating, size = 'small'}: RatingProps) => {

	return (
		<div className={cn(styles['rating'], 
			{
				[cn(styles['red'])]: rating <= 4.2,
				[cn(styles['grey'])]: rating > 4.2 && rating <= 6.4 ,
				[cn(styles['green'])]: rating > 6.4 && rating <= 7.5,
				[cn(styles['brown'])]: rating > 7.5,
				[cn(styles['large'])]: size === 'large'

			}
		)}>
			<Icon className={styles['rating__svg']} name='star'/>
			<span className={styles['rating__text']}>{rating.toFixed(1)}</span>
		</div>
	);
};

export default Rating;