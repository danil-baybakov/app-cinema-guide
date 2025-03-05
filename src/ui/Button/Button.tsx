import { FC } from 'react';
import styles from './Button.module.scss';
import { ButtonProps } from './Button.props';
import cn from 'classnames';

/**
 * Компонент для отображения кнопки с контентом внутри
 * @param {ButtonProps} props - объект со свойтвами компонента
 * @param {string} props.className - дополнительный класс для стилиации компонента
 * @param {ReactNode} props.children - контент внутри кнопки
 */
const Button: FC<ButtonProps> = ({
	className, 
	children,
	...props}: ButtonProps) => {
	return (
		<button className={cn(styles['button'], className)} {...props}>
			{children}
		</button>
	);
};

export default Button;