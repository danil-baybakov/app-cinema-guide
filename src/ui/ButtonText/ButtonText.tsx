import { FC } from 'react';
import styles from './ButtonText.module.scss';
import { ButtonTextProps } from './ButtonText.props';
import cn from 'classnames';
import Loader from '../Loader/Loader';

/**
 * Компонент для отображения кнопки c текстом
 * @param {ButtonTextProps} props - объект со свойтвами компонента
 * @param {string} props.appearence - вид компонента: primary или secondary
 * @param {string} props.text - текст внутри
 * @param {string} props.className - дополнительный класс для стилиации компонента
 * @returns 
 */
const ButtonText: FC<ButtonTextProps> = ({
	appearence='primary',
	text,
	loading=false,
	className, 
	...props}: ButtonTextProps) => {
	return (
		<button className={cn(styles['button-text'], {
			[`${className}`]: className,
			[styles['secondary']]: appearence === 'secondary'
		})} 
		disabled={loading}
		{...props}
		>
			<span className={styles['button-text__content']}>
				{text}
			</span>
			{loading && <Loader className={styles['button-text__loader']} size={28}/>}
		</button>
	);
};

export default ButtonText;