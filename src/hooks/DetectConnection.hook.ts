import { useEffect, useState } from 'react';

/**
 * Хук отслеживания интернет соединения
 */
const useDetectConnection = () => {
	const [online, setOnline] = useState(navigator.onLine);

	const onNetworkStatusChange = () => {
		setOnline(navigator.onLine);
	};

	useEffect(() => {
		window.addEventListener('online', onNetworkStatusChange);
		window.addEventListener('offline', onNetworkStatusChange);

		return () => {
			window.removeEventListener('online', onNetworkStatusChange);
			window.removeEventListener('offline', onNetworkStatusChange);
		};
	}, []);

	return online;
};

export default useDetectConnection;