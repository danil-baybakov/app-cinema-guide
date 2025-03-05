import { FC } from 'react';
import styles from '../Modal.module.scss';
import cn from 'classnames';

/**
 * Компонент для отображения модального окна с сообщением об
 * отсутствии подключения к интернету
 */
const ErrorConnection: FC = () => {
	return (
		<div className={cn(styles['modal'])}>
			<div className={styles['modal__container']}>
				<div className={styles['modal__wrapper']}>
					<h2 className={styles['modal__title']}>
                		Нет интернета
					</h2>
					<p className={styles['modal__info']}>
                		Убедитесь, что устройство подключено к сети.
					</p>
				</div> 
			</div>
		</div>
	);
};

export default ErrorConnection;