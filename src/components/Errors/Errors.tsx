import { FC, useEffect } from 'react';
import styles from './Errors.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { errorActions } from '../../store/error.slice';
import Error from './Error/Error';

/**
 * Компонент отображения списка сообщений об ошибоках
 */
const Errors: FC = () => {

	const dispatch = useDispatch<AppDispatch>();

	const posterErrors = useSelector((s: RootState) => s.poster.errors);

	const errors = useSelector((s: RootState) => s.error.messages);

	useEffect(() => {	
		dispatch(errorActions.add(posterErrors));
	}, [posterErrors, dispatch] );
	
	if (errors.length === 0) return;
	
	return (
		<div className={styles['error']}>
			<ul className={styles['error__list']}>
				{errors.map((error) => (
					<Error key={error.id}
						id={error.id}
						message={error.message}
					/>
				))}
			</ul>
		</div>
	);
};

export default Errors;