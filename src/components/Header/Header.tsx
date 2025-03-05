import Logo from '../Logo/Logo';
import Menu from '../Menu/Menu';
import styles from './Header.module.scss';
import cn from 'classnames';
import Search from '../Search/Search';
import Container from '../Container/Container';
import Login from '../Login/Login';

/**
 * Компонент отображения шапки сайта
 */
const Header = () => {

	return (
		<header className={styles['header']} aria-label="Шапка сайта">
			<Container className={styles['header__container']}>
				<div className={styles['header__wrapper']}>	
					<div className={cn(styles['header__item'], styles['header__item-logo'])}>
						<Logo />
					</div>
					<div className={cn(styles['header__item'], styles['header__item-nav'])}>
						<Menu />
					</div>
					<div className={cn(styles['header__item'], styles['header__item-search'])}>
						<Search />
					</div>
					<div className={cn(styles['header__item'], styles['header__item-link'])}>
						<Login />
					</div>
				</div>
			</Container>
		</header>
	);
};

export default Header;