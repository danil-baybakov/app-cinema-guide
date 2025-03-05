import { FC } from 'react';
import styles from './TextLoader.module.scss';
import { TextLoaderProps } from './TextLoader.props';
import cn from 'classnames';

/**
 * Компонент для отобраения лоадера в виде теста с тремя анимированными точками в конце
 * @param {TextLoaderProps} props - объект со свойтвами компонента
 * @param {string | undefined} props.text - текст внутри компонента
 * @param {string | undefined} props.className - дополнительный класс для стилиации компонента
 */
const TextLoader: FC<TextLoaderProps> = ({text = 'Загрузка данных', className}: TextLoaderProps) => {
	return (
		<p className={cn(styles['loader'], {[`${className}`]: className})}>
			{text}...
		</p>
		
	);
};

export default TextLoader;