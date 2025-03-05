import { FC } from 'react';
import { DetectConnectionProps } from './DetectConnection.props';
import useDetectConnection from '../../hooks/DetectConnection.hook';
import ErrorConnection from '../Modal/ErrorConnection/ErrorConnection';

/**
 * Компонент-оберка базового слоя страниц для вывода модального окна 
 * с информацией в случае отсутствия подключения к интернету
 * @param {DetectConnectionProps} props - объект со свойтвами компонента
 * @param {ReactNode} props.children - оборачиваемый компонент
 */
const DetectConnection: FC<DetectConnectionProps> = ({children}) => {
	const online = useDetectConnection();

	if (!online) {
		return <ErrorConnection />;
	}

	return children;
};

export default DetectConnection;