/* eslint-disable @typescript-eslint/no-floating-promises */
import { FC } from 'react';
import ButtonText from '../../../ui/ButtonText/ButtonText';
import SettingsItem from './SettingsItem/SettingsItem';
import styles from './AccountSettings.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import { logout } from '../../../store/user.slice ';
import { useNavigate } from 'react-router-dom';

/**
 * Компонент отображения раздела с настройками аккаунта пользователя
 * @returns 
 */
const AccountSettings: FC = () => {

	const dispatch = useDispatch<AppDispatch>();

	const navigate = useNavigate();
	
	const profile = useSelector((s: RootState) => s.user.profile);

	const io = profile ? [profile.name, profile.surname].join(' ') : '';

	const iconIo = profile ? 
		`${String(profile.name).charAt(0).toUpperCase()}${String(profile.surname).charAt(0).toUpperCase()}` : '';

	const handlerLogout = () => {
		dispatch(logout());
		navigate('/');
	};

	return (
		<div className={styles['account-settings']}>
			<ul className={styles['account-settings__list']}>
				<li className={styles['account-settings__item']}>
					<SettingsItem 
						title='Имя Фамилия'
						value={io} 
						io={iconIo}
					/>
				</li>
				<li className={styles['account-settings__item']}>
					<SettingsItem 
						title='Электронная почта'
						value={profile?.email || ''}
						isIcon
						svgName='email'
					/>
				</li>
			</ul>
			<div className={styles['account-settings__btn-wrapper']}>
				<ButtonText className={styles['account-settings__btn']} text='Выйти из аккаунта' onClick={handlerLogout}/>
			</div>
		</div>
	);
};

export default AccountSettings;
