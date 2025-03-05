import { FC } from 'react';
import styles from '../Modal.module.scss';
import Input from '../../../ui/Input/Input';
import ButtonText from '../../../ui/ButtonText/ButtonText';
import Button from '../../../ui/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import { userActions, register as registerUser } from '../../../store/user.slice ';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RegisterForm, RegisterFormSchema } from '../../../api/User';
import { zodResolver } from '@hookform/resolvers/zod';

/**
 * Компонент для отображения контента модального окна регистрации
 */
const Registartion: FC = () => {

	const dispatch = useDispatch<AppDispatch>();

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<RegisterForm>({
		resolver: zodResolver(RegisterFormSchema)
	});

	const error = useSelector((s: RootState) => s.user.regErrorMessage);

	const onSubmit: SubmitHandler<RegisterForm> = async (data) => {
		dispatch(userActions.clearErrorMessage());
		await dispatch(registerUser(data));
	};

	const handlerGoToAuth = () => {
		dispatch(userActions.openModal('auth'));
	};


	return (
		<form className={styles['modal__form']} onSubmit={handleSubmit(onSubmit)}>
			<h2 className={styles['modal__title']}>
                Регистрация
			</h2>
			<ul className={styles['modal__list']}>
				<li className={styles['modal__item']}>
					<Input 
						lightThema 
						svgName='email' 
						{...register('email')}
						error={errors.email?.message}
						type='text' 
						placeholder='Электронная почта'/>
				</li>
				<li className={styles['modal__item']}>
					<Input 
						lightThema 
						svgName='login' 
						{...register('name')} 
						error={errors.name?.message}
						type='text' 
						placeholder='Имя'/>
				</li>
				<li className={styles['modal__item']}>
					<Input 
						lightThema 
						svgName='login'  
						{...register('surname')} 
						error={errors.surname?.message}
						type='text' 
						placeholder='Фамилия'/>
				</li>
				<li className={styles['modal__item']}>
					<Input 
						lightThema 
						svgName='password'   
						{...register('password')} 
						error={errors.password?.message} 
						type='password' 
						placeholder='Пароль'/>
				</li>
				<li className={styles['modal__item']}>
					<Input 
						lightThema 
						svgName='password'    
						{...register('confirmPassword')} 
						error={errors.confirmPassword?.message}  
						type='password' 
						placeholder='Подтвердить пароль'/>
				</li>
			</ul>
			<div className={styles['modal__btn']}>
				<ButtonText text='Создать аккаунт' type='submit'/>
			</div>
			<Button className={styles['modal__link']} type='button' onClick={handlerGoToAuth}>
				У меня есть пароль
			</Button>
			{error && <p className={styles['modal__error']}>{error}</p>}
		</form>
	);
};

export default Registartion;