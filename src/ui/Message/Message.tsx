import { FC } from 'react';
import styles from './Message.module.scss';
import { MessageProps } from './Message.props';
import cn from 'classnames';

/**
 * Компонент для отображения сообщения
 * @param {MessageProps} props - объект со свойтвами компонента
 * @param {ReactNode} props.children - контент внутри (сообщение)
 * @param {string | undefined} props.className - дополнительный класс для стилизации компонента
 */
const Message: FC<MessageProps> = ({children, className}: MessageProps) => {
	return <p className={cn(styles['message'], {[`${className}`]: className})}>{children}</p>;
};

export default Message;