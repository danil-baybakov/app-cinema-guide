import { FC } from 'react';
import styles from '../MoviePoster.module.scss';
import { ButtonFavoriteProps } from './ButtonFavorite.props';
import ButtonIcon from '../../../ui/ButtonIcon/ButtonIcon';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import { getProfile, userActions } from '../../../store/user.slice ';
import { addFavorite, removeFavorite } from '../../../store/poster.slice';

/**
 * Компонент для отображения кнопки добавления/удаления фильма из избранного
 * @param {ButtonFavoriteProps} props - объект со свойтвами компонента
 * @param {number} props.movieId - id фильма
 */
const ButtonFavorite: FC<ButtonFavoriteProps> = ({movieId}: ButtonFavoriteProps) => {

	const dispatch = useDispatch<AppDispatch>();

	const profile = useSelector((s: RootState) => s.user.profile);

	const favorite = Boolean(profile?.favorites.find(elId => elId === String(movieId)));

	const handlerClickBtnFavorite = async () => {
		if (profile) {
			if (!favorite) { 
				await dispatch(addFavorite(movieId));
			} else {
				await dispatch(removeFavorite(movieId));
			}
			await dispatch(getProfile());
		} else {
			dispatch(userActions.openModal('auth'));
		}
	};

	return (
		<ButtonIcon 
			className={styles['movie-poster__control-item-btn']}
			type='button'
			active={favorite}
			nameSvg1='like'
			nameSvg2='like-second'
			onClick={handlerClickBtnFavorite}
		/>
	);
};

export default ButtonFavorite;