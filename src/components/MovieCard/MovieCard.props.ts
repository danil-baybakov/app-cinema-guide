import { Movie } from '../../api/Movies';

export interface MovieCardProps {
	movie: Movie
	place?: number,
	isBtnRemoveFavorite?: boolean,
	className?: string,
	handlers?: {
		clickBtnRemoveFavorite?: (id?: number) => void
	}
}