import { FC } from 'react';
import styles from './ButtonSmall.module.scss';
import { ButtonSmallProps } from './ButtonSmall.props';
import Icon from '../Icon/Icon';
import cn from 'classnames';

/**
 * Компонент для отображения маленькой кнопки в виде иконки
 * @param {ButtonSmallProps} props - объект со свойтвами компонента
 * @param {string} props.className - дополнительный класс для стилиации компонента
 * @param {string} props.nameSvg - имя иконки из спрайта
 * @returns 
 */
const ButtonSmall: FC<ButtonSmallProps> = ({className, nameSvg='default', ...props}: ButtonSmallProps) => {
	return (
		 <button className={cn(styles['button-small'], {[styles[`${className}`]]: className})} {...props}>
			<Icon name={nameSvg} className={styles['button-small__svg']}/>
		</button>
	);
};

export default ButtonSmall;