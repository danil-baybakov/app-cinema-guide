import { FC } from 'react';
import styles from '../Modal.module.scss';
import ButtonText from '../../../ui/ButtonText/ButtonText';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store/store';
import { userActions } from '../../../store/user.slice ';

/**
 * Компонент для отображения контента модального окна после успешной регистрации
 */
const RegistartionSuccess: FC = () => {
	const dispatch = useDispatch<AppDispatch>();

	const handlerGoLogin = () => {
		dispatch(userActions.openModal('auth'));
	};

	return (
		<>
			<h2 className={styles['modal__title']}>
                Регистрация завершена
			</h2>
			<p className={styles['modal__info']}>
                Используйте вашу электронную почту для входа
			</p>
			<div className={cn(styles['modal__btn'], styles['desktop-mb-32'])}>
				<ButtonText text='Войти' type='button'  onClick={handlerGoLogin}/>
			</div>
		</>
	);
};

export default RegistartionSuccess;