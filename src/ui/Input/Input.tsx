import { forwardRef } from 'react';
import styles from './Input.module.scss';
import { InputProps } from './Input.props';
import cn from 'classnames';
import Icon from '../Icon/Icon';

/**
 * Компонент для отображения поля ввода
 * @param {InputProps} props - объект со свойтвами компонента
 * @param {string | undefined} props.className - дополнительный класс для стилиации компонента
 * @param {boolean | undefined} props.lightThema - вид компоента в светлом стиле
 * @param {string | undefined} props.svgName - наименование иконки в спрайте
 * @param {string | undefined} props.error - сообщение об ошибке
 */
const Input = forwardRef<HTMLInputElement, InputProps>(function Input({className, lightThema, svgName, error, ...props}, ref) {
	return (
		 <div className={cn(styles['input'], {
			[styles[`${className}`]]: className,
			[styles['light']]: lightThema,
			[styles['error']]: error
		})}>
			<p className={styles['input__error']}>{error}</p>
			<div className={styles['input__wrapper']}>
				<input ref={ref} className={styles['input__field']} {...props}
					data-name={styles['search-field']}/>
				<p className={styles['input__icon']}>
					<Icon className={styles['input__svg']} name={svgName}/>
				</p>
			</div>
		</div>
	);
});

export default Input;