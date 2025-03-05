import { ChangeEvent, FC, useEffect, useRef} from 'react';
import styles from './Search.module.scss';
import cn from 'classnames';
import Input from '../../ui/Input/Input';
import ButtonSmall from '../../ui/ButtonSmall/ButtonSmall';
import SearchCard from '../SearchCard/SearchCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { search, searchActions } from '../../store/search.slice';
import useWindowWidth from '../../hooks/WindowsResize.hook';

/***
 * Компонент для отображения поля поиска фильмов
 */
const Search: FC = () => {

	const dispatch = useDispatch<AppDispatch>();

	const { 	
		value, 
		visible,
		movies
	} = useSelector((s: RootState) => s.search);

	// отображение поля поиска при изменении размера экрана
	const windowWidth = useWindowWidth();
	useEffect(() => {
		if (windowWidth <= 1200) {
			dispatch(searchActions.close());
		} else {
			dispatch(searchActions.open());
		}
	}, [dispatch, windowWidth]);

	// хук закрытия поля поиска по нажатию на любую часть экрана 
	// кроме поля поиска для мобильной версии
	const ref = useRef<HTMLDivElement>(null);
	useEffect(() => {
		const checkIfClickedOutside = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				dispatch(searchActions.init());
				dispatch(searchActions.close());
			}
		};

		document.addEventListener('click', checkIfClickedOutside);

		return () => {
			document.removeEventListener('click', checkIfClickedOutside);
		};
	}, [dispatch]);

	// debounce для поля поиска
	useEffect(() => {
		const delayInputTimeoutId = setTimeout(async () => {
			if (value) {
				await dispatch(search({ title: value, count: 5}));
			} else {
				dispatch(searchActions.init());
			}
		}, 200);
		return () => clearTimeout(delayInputTimeoutId);
	}, [dispatch, value]);

	// обработчик события ввода текста в поле поиска
	const handlerSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
		dispatch(searchActions.change(e.target.value));
	};

	// обработчик события наатия на кнопку очистки поля поиска
	const handlerSearchClear = () => {
		dispatch(searchActions.clear());
	};

	// обработчик события нажатия на кнопку отрытия поля поиска для мобильной версии
	const handlerSearchOpen = () => {
		dispatch(searchActions.init());
		dispatch(searchActions.open());
	};

	// обработчик события нажатия на какточку фильма в списке найденного
	const handlerSearchLink = () => {
		dispatch(searchActions.init());
	};

	return (
		<div ref={ref} className={styles['search']}>
			<div className={cn(styles['search__btn'], styles['search__btn-open'])}>
				<ButtonSmall nameSvg='search' type='button' name='btn-search-open' onClick={handlerSearchOpen}/>
			</div>
			<div className={cn(styles['search__wrapper'], {[styles['show']]: visible.field})}>
				<div className={styles['search__input']}>
					<Input placeholder='Поиск' type='text' name='search' svgName='search' value={value} onInput={handlerSearchChange}/>
				</div>
				<div className={cn(styles['search__btn'], styles['search__btn-clear'], {[styles['show']]: visible.btnClear})}>
					<ButtonSmall nameSvg='cross-small' type='button' name='btn-search-clear' onClick={handlerSearchClear}/>
				</div>
				<div className={cn(styles['search__list-container'], {[styles['show']]: visible.list})}>
					< Swiper 
						className={styles['search__list-wrapper']}
						wrapperClass={styles['search__list']}
						spaceBetween={16}
						slidesPerView={'auto'}
						loop
						breakpoints={{
							567: {
								enabled: false
							}
						}}
					>
						{
							movies.map(movie => (
								<SwiperSlide className={styles['search__item']}
									key={movie.id}>
									<SearchCard 
										movie={movie}
										handlers={{
											onClick: handlerSearchLink
										}}
									/>
								</SwiperSlide>
							))
						}
					</Swiper>
				</div>
			</div>
		</div>
	);
};

export default Search;