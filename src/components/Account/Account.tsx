import { FC } from 'react';
import styles from './Account.module.scss';
import Container from '../Container/Container';
import LinkMenu from '../LinkMenu/LinkMenu';
import { useParams } from 'react-router-dom';
import AccountFavorites from './AccountFavorites/AccountFavorites';
import AccountSettings from './AccountSettings/AccountSettings';


/**
 * Компонент отображения страницы аккаунта пользователя
 */
const Account: FC = () => {
	const { section } = useParams();

	const choiceSection = () => {
		switch(section) {
		case 'favorites': return <AccountFavorites/ >;
		case 'settings': return <AccountSettings/ >;
		default: return <AccountFavorites/ >;
		}
	};

	return (
		<section className={styles['account']} aria-label="Аккаунт пользователя">
			<Container className={styles['account__container']}>
				<h2 className={styles['account__title']}>
                    Мой аккаунт
				</h2>
				<ul className={styles['account__list']}>
					<li className={styles['account__item']}>
						<LinkMenu 
							title='Избранные фильмы' 
							svg1='like' 
							onActive
							typeSecondary 
							href='/account/favorites' 
						/>
					</li>
					<li className={styles['account__item']}>
						<LinkMenu 
							title='Настройка аккаунта' 
							svg1='login'
							onActive 
							typeSecondary 
							href='/account/settings'
						/>
					</li>
				</ul>
				<div className={styles['account__content']}>
					{choiceSection()}
				</div>
			</Container>
		</section>
	);
};

export default Account;