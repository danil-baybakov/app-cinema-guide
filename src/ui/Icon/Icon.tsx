import { FC } from 'react';
import { IconProps } from './Icon.props';
import SpriteSvg from '../../assets/images/common/sprite.svg';
import styles from './Icon.module.scss';
import cn from 'classnames';

/**
 * Компонент для отображения иконки
 * @param {IconProps} props - объект со свойтвами компонента
 * @param {string | undefined} props.name - наименование иконки в спрайте
 * @param {string | undefined} props.className - дополнительный класс для стилиации компонента
 * @param {string | undefined} props.color - цвет
 * @param {number | undefined} props.width - ширина
 * @param {number | undefined} props.height - высота
 */
const Icon: FC<IconProps> = ({name='', className, color='black', width=24, height=24}: IconProps) => {
	return (
		<svg className={cn(styles['icon'], {[`${className}`]: className})} fill={color} width={width} height={height}>
			<use className={styles['icon__use']} href={`${SpriteSvg}#${name}`} />
		</svg>
	); 
};

export default Icon;