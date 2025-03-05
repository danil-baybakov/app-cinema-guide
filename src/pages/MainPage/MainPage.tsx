import { FC } from 'react';
import Top from '../../components/Top/Top';
import MovieRandom from '../../components/MovieRandom/MovieRandom';

/**
 * Главная страница
 */
const MainPage: FC = () => {
	

	return (
		<>
			<MovieRandom />
			<Top />
		</>
	);
};

export default MainPage;