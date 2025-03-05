import defaultGenre from './default.png';
import adventure from './adventure.png';
import comedy from './comedy.png';
import detective from './detective.png';
import drama from './drama.png';
import family from './family.png';
import fantasy from './fantasy.png';
import history from './history.png';
import thriller from './thriller.png';
import horror from './horror.png';
import scifi from './scifi.png';
import standup from './stand-up.png';
import mystery from './mystery.png';
import romance from './romance.png';
import action from './action.png';
import animation from './animation.png';
import crime from './crime.png';
import documentary from './documentary.png';
import music from './music.png';
import tvmovie from './tv-movie.png';
import war from './war.png';
import western from './western.png';

export type GenreType = {
	id: number,
	name: string,
	genreUS: string,
	genreRU: string,
	url: string,
}

export const genres: GenreType[] = [
	{ id: 1, name: 'adventure', genreUS: 'Adventure', genreRU: 'Приключения', url: adventure },
	{ id: 2, name: 'comedy', genreUS: 'Comedy', genreRU: 'Комедия', url: comedy },
	{ id: 3, name: 'detective', genreUS: 'Detective', genreRU: 'Детектив', url: detective },
	{ id: 4, name: 'drama', genreUS: 'Drama', genreRU: 'Драма', url: drama },
	{ id: 5, name: 'family', genreUS: 'Family', genreRU: 'Семейное', url: family },
	{ id: 6, name: 'fantasy', genreUS: 'Fantasy', genreRU: 'Фантастика', url: fantasy },
	{ id: 7, name: 'history', genreUS: 'History', genreRU: 'Историческое', url: history },
	{ id: 8, name: 'thriller', genreUS: 'Thriller', genreRU: 'Триллер', url: thriller },
	{ id: 9, name: 'horror', genreUS: 'Horror', genreRU: 'Ужасы', url: horror },
	{ id: 10, name: 'scifi', genreUS: 'Scifi', genreRU: 'Научная фантастика', url: scifi },
	{ id: 11, name: 'stand-up', genreUS: 'Stand-up', genreRU: 'Стендап', url: standup },
	{ id: 12, name: 'mystery', genreUS: 'Mystery', genreRU: 'Мистика', url: mystery },
	{ id: 13, name: 'romance', genreUS: 'Romance', genreRU: 'Мелодрама', url: romance },
	{ id: 14, name: 'action', genreUS: 'Action', genreRU: 'Боевик', url: action },
	{ id: 15, name: 'animation', genreUS: 'Animation', genreRU: 'Аниме', url: animation },
	{ id: 16, name: 'crime', genreUS: 'Crime', genreRU: 'Криминал', url: crime },
	{ id: 17, name: 'documentary', genreUS: 'Documentary', genreRU: 'Документальный	', url: documentary },
	{ id: 18, name: 'music', genreUS: 'Music', genreRU: 'Мюзикл', url: music },
	{ id: 19, name: 'tv-movie', genreUS: 'Tv-movie', genreRU: 'Реальное ТВ', url: tvmovie },
	{ id: 20, name: 'war', genreUS: 'War', genreRU: 'Военный', url: war },
	{ id: 21, name: 'western', genreUS: 'Western', genreRU: 'Вестерн', url: western }
];

/**
 * Функция для получения информации о жанре
 * @param {GenreType} genre наименование жанра фильма
 * @returns {GenreType} объект с информацией о жанре
 */
export function getDataGenre(genre: string): GenreType {
	const dataGenre = genres.find(item => item.name === genre);
	if (!dataGenre) {
		genres.push({
			id: genres.length + 1,
			name: genre,
			genreUS: genre,
			genreRU: genre,
			url: defaultGenre
		});
		return genres[genres.length - 1];
	};
	return dataGenre;
}