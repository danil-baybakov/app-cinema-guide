import { FC } from 'react';
import styles from './ButtonIcon.module.scss';
import { ButtonIconProps } from './ButtonIcon.props';
import cn from 'classnames';
import Icon from '../Icon/Icon';

/**
 * Компонент для отображения кнопки в виде иконки
 * @param {ButtonIconProps} props - объект со свойтвами компонента
 * @param {string} props.appearence - вид компонента: primary или secondary
 * @param {string} props.className - дополнительный класс для стилиации компонента
 * @param {boolean} props.active - флаг активности компонента
 * @param {string} props.nameSvg1 - имя первой иконки из спрайта
 * @param {string} props.nameSvg2 - имя второй иконки из спрайта
 * @returns 
 */
const ButtonIcon: FC<ButtonIconProps> = ({
	appearence='primary',
	className, 
	active=false,
	nameSvg1='default', 
	nameSvg2='default',
	...props}: ButtonIconProps) => {
	return (
		<button className={cn(styles['button-icon'], {
			[styles[`${className}`]]: className,
			[styles['active']]: active,
			[styles['secondary']]: appearence === 'secondary'
		})
		} {...props}>
			<span className={styles['button-icon__wrapper']}>
				<Icon className={styles['button-icon__svg']} name={nameSvg1}/>
				<Icon className={styles['button-icon__svg']} name={nameSvg2}/>
			</span>
		</button>
	);
};

export default ButtonIcon;