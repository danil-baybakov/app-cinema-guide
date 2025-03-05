import { FC, useEffect } from 'react';
import MoviePoster from '../MoviePoster/MoviePoster';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { getRandomMovie } from '../../store/poster.slice';
import Plug from '../Plug/Plug';

/**
 * Компонент для отображения секции случайных фильмов
 */
const MovieRandom: FC = () => {

	const dispatch = useDispatch<AppDispatch>();

	const randomMovie = useSelector((s: RootState) => s.poster.movie);

	useEffect(() => {
		if (!randomMovie) 
			void dispatch(getRandomMovie());
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);


	if (!randomMovie) {
		return <Plug />;
	}

	return (
		<>
			<MoviePoster 
				movie={randomMovie}
				isVisibleShortDescription
			/>
		</>
	);
};

export default MovieRandom;