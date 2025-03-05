import { Link } from 'react-router-dom';
import logo from '../../assets/images/common/logo.png';
import styles from './Logo.module.scss';

/**
 * Компонент отображения логотипа сайта
 */
const Logo = ({...props}) => {

	return (
		<div className={styles['logo']}>
			<img className={styles['logo__img']} src={logo} alt=""/>
			<Link className={styles['logo__link']} to="/" {...props}/>
		</div>
	); 
};

export default Logo;