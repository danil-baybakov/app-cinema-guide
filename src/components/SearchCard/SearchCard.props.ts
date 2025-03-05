import { Movie } from '../../api/Movies';

export interface SearchCardProps {
	movie: Movie,
	toReleaseYear?: number,
	isMinuteRuntime?: boolean
	handlers?: {
		onClick?: () => void
	}
}