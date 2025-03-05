import { FC } from 'react';
import styles from './Loader.module.scss';
import { LoaderProps } from './Loader.props';
import cn from 'classnames';
import Icon from '../Icon/Icon';

/**
 * Компонент для отображения лоадера 
 * @param {LoaderProps} props - объект со свойтвами компонента
 * @param {boolean | undefined} props.secondary - вторичный вид
 * @param {number | undefined} props.size - размер компонента
 * @param {string | undefined} props.className - дополнительный класс для стилиации компонента
 */
const Loader: FC<LoaderProps> = ({secondary = false, size=40, className}: LoaderProps) => {
	return (
		<div className={cn(styles['loader'], {
			[styles['secondary']]: secondary,
			[`${className}`]: className
		})}>
			<Icon 
				className={styles['loader__icon']} 
				name='loader' 
				width={size} 
				height={size}
			/>
		</div>
	);
};

export default Loader;