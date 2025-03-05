import { useState, useEffect } from 'react'; 

/**
 * Хук отслеживания изменения ширины окна браузера
 */
const useWindowWidth = () => {

	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};
		window.addEventListener('resize', handleResize);
		// Очистка прослушивателя событий при размонтировании компонента
		return () => { window.removeEventListener('resize', handleResize); };
	}, []);

	return windowWidth;
};


export default useWindowWidth;