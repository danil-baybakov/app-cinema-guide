import { Outlet } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Modal from '../../components/Modal/Modal';
import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { getProfile } from '../../store/user.slice ';
import Errors from '../../components/Errors/Errors';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';

/**
 * Главный слой для всех страниц
 */
const MainLayout: FC = () => {

	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
	 	void dispatch(getProfile());
	}, [dispatch]);

	return (
		<>
			<Header/>
			<main aria-label="Тело сайта">
				<Outlet/>
			</main>
			<Footer/>
			<Modal/>
			<VideoPlayer />
			<Errors />
		</>
	);
};

export default MainLayout;