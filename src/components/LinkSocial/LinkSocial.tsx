import { FC } from 'react';
import styles from './LinkSocial.module.scss';
import { LinkSocialProps } from './LinkSocial.props';
import { Link } from 'react-router-dom';
import Icon from '../../ui/Icon/Icon';

/**
 * Компонент отображения ссылки на социальную сеть в виде иконки
 * 
 * @param {LinkSocialProps} props - объект со свойтвами компонента
 * @param {string} props.href - ссылка на социальную сеть
 * @param {string} props.svgName - наименование иконки в спрайте
 * @returns 
 */
const LinkSocial: FC<LinkSocialProps> = ({href='#', svgName}) => {
	return (
		<div className={styles['social']}>
			<Link to={href} className={styles['social__link']}></Link>
			<Icon name={svgName} className={styles['social__icon']} />
		</div>
	);
};

export default LinkSocial;