import { FC } from 'react';
import styles from './SettingsItem.module.scss';
import { SettingsItemProps } from './SettingsItem.props';
import cn from 'classnames';
import Icon from '../../../../ui/Icon/Icon';

/**
 * Компонент отображения настройки аккаунта пользователя
 * @param {SettingsItemProps} props - объект со свойтвами компонента
 * @param {string | undefined} props.title - заголовок
 * @param {string | undefined} props.title - значение
 * @param {boolean | undefined} props.isIcon - использовать иконку
 * @param {string | undefined} props.svgName - id иконки в спрайте
 * @param {string | undefined} props.io - текст если не используем иконку
 * @returns 
 */
const SettingsItem: FC<SettingsItemProps> = ({
	title,
	value,
	isIcon,
	io,
	svgName
}) => {
	return (
		<div className={cn(styles['settings-item'], {
			[styles['icon']]: isIcon
		})}>
			<div className={styles['settings-item__icon']}>
				<span className={cn(styles['settings-item__icon-item'], styles['settings-item__icon-text'])}>{io}</span>
				<Icon className={cn(styles['settings-item__icon-item'], styles['settings-item__icon-svg'])} name={svgName} />
			</div>
			<div className={styles['settings-item__content']}>
				<span className={styles['settings-item__name']}>
					{title}
				</span>
				<span className={styles['settings-item__value']}>
					{value}
				</span>
			</div>
		</div>
	);
};

export default SettingsItem;