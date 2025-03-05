import { FC } from 'react';
import styles from './Plug.module.scss';

/**
 * Компонент-заглушка для того чтобы контент не съезжал под шапку если на странице ничего нет
 */
const Plug: FC = () => {
	return <div className={styles['plug']}></div>;
};

export default Plug;