import styles from '../Modal.module.scss';
import Input from '../../../ui/Input/Input';
import ButtonText from '../../../ui/ButtonText/ButtonText';
import Button from '../../../ui/Button/Button';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AuthForm, AuthFormSchema } from '../../../api/User';
import { zodResolver } from '@hookform/resolvers/zod';
import { getProfile, login, userActions } from '../../../store/user.slice ';


/**
 * Компонент для отображения контента модального окна аутентификации
 */
const Authentication: FC= () => {

	const dispatch = useDispatch<AppDispatch>();

	const error = useSelector((s: RootState) => s.user.authErrorMessage);

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<AuthForm>({
		resolver: zodResolver(AuthFormSchema)
	});

	const onSubmit: SubmitHandler<AuthForm> = async (data) => {
		dispatch(userActions.clearErrorMessage());
		await dispatch(login(data));
		await dispatch(getProfile());
	};

	const handlerGoToReg = () => {
		dispatch(userActions.openModal('reg'));
	};

	return (
		<form className={styles['modal__form']} onSubmit={handleSubmit(onSubmit)}>
			<ul className={styles['modal__list']}>
				<li className={styles['modal__item']}>
					<Input 
						{...register('email')} 
						lightThema 
						svgName='email' 
						type='text' 
						placeholder='Электронная почта'
						error={errors.email?.message}
					/>
				</li>
				<li className={styles['modal__item']}>
					<Input 
						{...register('password')} 	
						lightThema 
						svgName='password' 
						type='password' 
						placeholder='Пароль'
						error={errors.password?.message}
					/>
				</li>
			</ul>
			<div className={styles['modal__btn']}>
				<ButtonText text='Войти' type='submit'/>
			</div>
			<Button className={styles['modal__link']} type='submit' onClick={handlerGoToReg}>
				Регистрация
			</Button>
			{error && <p className={styles['modal__error']}>{error}</p>}
		</form>
	);
};

export default Authentication;