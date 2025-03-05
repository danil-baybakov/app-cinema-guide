import LinkMenu from '../LinkMenu/LinkMenu';
import styles from './Menu.module.scss';

/**
 * Компонент отображения меню шапки сайта
 */
const Menu = () => {
	
	return (
		<nav className={styles['nav']}>
			<ul className={styles['nav__list']}>
				<li className={styles['nav__item']}>
					<LinkMenu title='Главная'/>
				</li>
				<li className={styles['nav__item']}>
					<LinkMenu title='Жанры' href='/genres' svg1='genre'/>
				</li>
			</ul>
		</nav>
	);
};

export default Menu;