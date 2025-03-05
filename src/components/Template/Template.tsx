import { FC } from 'react';
import styles from './Template.module.scss';
import { TemplateProps } from './Template.props';
import cn from 'classnames';

/**
 * Компонент-шаблон для создания новых компонентов
 * @param {TemplateProps} props - объект со свойтвами компонента
 * @param {string | undefined} props.text - контент
 */
const Template: FC<TemplateProps> = ({text}: TemplateProps) => {
	return (
		<>
			<span className={cn(styles['text'])}>{text}</span>
		</>
	);
};

export default Template;