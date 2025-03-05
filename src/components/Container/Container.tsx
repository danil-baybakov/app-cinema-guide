import { FC } from 'react';
import styles from './Container.module.scss';
import { ContainerProps } from './Container.props';
import cn from 'classnames';

/**
 * Компонент-оберка (контейнер) для основных элементов сайта
 * @param {ContainerProps} props - объект со свойтвами компонента
 * @param {ReactNode} props.children - оборачиваемый компонент
 * @param {string} props.className - дополнительный класс для стилиации компонента
 */
const Container: FC<ContainerProps> = ({children, className}: ContainerProps) => {
	return (
		<div className={cn(styles['container'], {[`${className}`]: className})}>
			{children}
		</div>
	);
};

export default Container;