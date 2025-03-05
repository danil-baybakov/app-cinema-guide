import { NavLink } from 'react-router-dom';
import styles from './LinkMenu.module.scss';
import Icon from '../../ui/Icon/Icon';
import { FC } from 'react';
import { LinkMenuProps } from './LinkMenu.props';
import cn from 'classnames';

/**
 * Компонент отображения кнопки меню
 * @param {LinkMenuProps} props - объект со свойтвами компонента
 * @param {string | undefined} props.title - наименование
 * @param {string | undefined} props.href - путь перехода для роутинга
 * @param {boolean | undefined} props.typeSecondary - ототразить второй тип кнопки 
 * @param {boolean | undefined} props.hoverChangeSvg - при наведении на элемент менять иконку
 * @param {string | undefined} props.svg1 - наименование первой иконки из спрайта
 * @param {string | undefined} props.svg2 - наименование второй иконки из спрайта
 * @param {boolean | undefined} props.onActive - флаг активности компонента
 * @param {function | undefined} props.onClick -  обработчик события клика по компоненту
 */
const LinkMenu: FC<LinkMenuProps> = (
	{
		title='***',
		href='/',
		typeSecondary, 
		hoverChangeSvg, 
		svg1='',
		svg2='',
		onActive,
		onClick
	}) => {
	return (
		  <NavLink 
		  	className={({isActive}) => cn(styles['link-menu'], {
				[styles['secondary']]: typeSecondary, 
				[styles['icon2']]: hoverChangeSvg,
				[styles['active']]: isActive && onActive
			})} to={href}
			onClick={onClick}
		  >
			<span className={styles['link-menu__wrapper']}>
				<span className={styles['link-menu__icon-wrapper']}>
					<Icon name={svg1} className={styles['link-menu__icon']}/>
					{hoverChangeSvg && <Icon name={svg2} className={styles['link-menu__icon']}/>}
				</span>
				<span className={styles['link-menu__title-wrapper']}>
					<span className={styles['link-menu__title']}>{title}</span>
				</span>
			</span>
		</NavLink>
	);
};

export default LinkMenu;