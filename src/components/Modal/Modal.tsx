import { FC } from 'react';
import Registartion from './Registartion/Registartion';
import RegistartionSuccess from './RegistartionSuccess/RegistartionSuccess';
import Authentication from './Authentication/Authentication';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';

import styles from './Modal.module.scss';
import ButtonClose from '../../ui/ButtonClose/ButtonClose';
import Logo from '../Logo/Logo';
import { TypeModal, userActions } from '../../store/user.slice ';
import cn from 'classnames';
import Loader from '../../ui/Loader/Loader';

const caseModal = (type: TypeModal) => {
	switch(type) {
	case 'reg': return <Registartion />;
	case 'success': return <RegistartionSuccess />;
	case 'auth': return <Authentication />;
	default: return <></>;
	}
};

/**
 * Компонент отображения базового контента модального окна 
 * аутентификации/регистрации пользователя
 */
const Modal: FC = () => {
	
	const dispatch = useDispatch<AppDispatch>();

	const typeModal = useSelector((s: RootState) => s.user.typeModal);

	const loading = useSelector((s: RootState) => s.user.loading);

	const handlerClose = () => {
		dispatch(userActions.clearErrorMessage());
		dispatch(userActions.closeModal());
	};

	const handlerClickLogo = () => {
		dispatch(userActions.closeModal());
	};

	return (
		typeModal && 
		<div className={cn(styles['modal'], {[styles['disable']]: loading})}>
			<div className={styles['modal__container']}>
				<div className={styles['modal__close']}>
					<ButtonClose type='button' onClick={handlerClose}/>
				</div>
				<div className={styles['modal__logo']}>
					<Logo onClick={handlerClickLogo}/>
				</div>
				<div className={styles['modal__wrapper']}>
					{caseModal(typeModal)}
				</div> 
				{loading && <Loader className={styles['modal__loader']} secondary />}
			</div>
		</div>
	);
};

export default Modal;