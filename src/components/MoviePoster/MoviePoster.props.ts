import { Movie } from '../../api/Movies';

export interface MoviePosterProps {
	movie: Movie,
	toReleaseYear?: number,
	isMinuteRuntime?: boolean
	appearence?: 'primary' | 'secondary',
	isVisibleShortDescription?: boolean,
}