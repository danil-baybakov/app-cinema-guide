import { FC, useEffect } from 'react';
import styles from '../Errors.module.scss';
import { ErrorProps } from './Error.props';
import ButtonClose from '../../../ui/ButtonClose/ButtonClose';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store/store';
import { errorActions } from '../../../store/error.slice';

/**
 * Компонент отображения сообщения об ошибке
 * @param {ErrorProps} props - объект со свойтвами компонента
 * @param {string} props.id - идентификатор сообщения
 * @param {string} props.message - текст сообщения
 */
const Error: FC<ErrorProps> = ({id, message}: ErrorProps) => {

	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			dispatch(errorActions.remove(id));
		}, 5000);
		return () => clearTimeout(timeoutId);
	}, [dispatch, id]);

	const handlerBtnCloseOnClick = () => {
		dispatch(errorActions.remove(id));
	};

	return (
		<>
			<li className={styles['error__item']}>
				<p className={styles['error__text']}>{message}</p>
				<ButtonClose className={styles['error__btn']} onClick={handlerBtnCloseOnClick} />
			</li> 
		</>
	);
};

export default Error;