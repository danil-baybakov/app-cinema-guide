import { FC } from 'react';
import styles from './ButtonClose.module.scss';
import { ButtonCloseProps } from './ButtonClose.props';
import cn from 'classnames';
import Icon from '../Icon/Icon';

/**
 * Компонент для отображения кнопки закрытия окна
 * @param {ButtonCloseProps} props - объект со свойтвами компонента
 * @param {string} props.className - дополнительный класс для стилиации компонента
 * @param {string} props.size - размер компонента: small/large - маленький/большой
 * @returns 
 */
const ButtonClose: FC<ButtonCloseProps> = ({
	className, 
	size='small',
	...props}: ButtonCloseProps) => {
	return (
		 <button className={cn(styles['button-close'], {[`${className}`]: className})} {...props}>
			<Icon name={size === 'small' ? 'cross-small' : 'cross'} className={styles['button-close__svg']}/>
		</button>
	);
};

export default ButtonClose;