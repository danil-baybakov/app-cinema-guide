import { FC, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { userActions } from '../../store/user.slice ';
import LinkMenu from '../LinkMenu/LinkMenu';

/**
 * Компонент отображения логина
 */
const Login: FC = () => {
	
	const dispatch = useDispatch<AppDispatch>();

	const profile= useSelector((s: RootState) => s.user.profile);

	const handlerLogin = (e: MouseEvent) => {
		e.preventDefault();
		dispatch(userActions.clearErrorMessage());
		dispatch(userActions.openModal('auth'));
	};

	if (!profile)
		return <LinkMenu title='Войти' hoverChangeSvg href='#' svg1='login' svg2='login-second' onClick={handlerLogin}/>; 


	return <LinkMenu title={profile.name} hoverChangeSvg href='/account/favorites' svg1='login' svg2='login-second'/>; 

};

export default Login;