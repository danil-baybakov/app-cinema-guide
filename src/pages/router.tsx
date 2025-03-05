/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout/MainLayout';
import DetectConnection from '../components/DetectConnection/DetectConnection';
import ErrorPage from './ErrorPage/ErrorPage';
import { lazy, Suspense } from 'react';
import Loader from '../ui/Loader/Loader';

const MainPage = lazy(() => import('./MainPage/MainPage'));
const GenresPage = lazy(() => import('./GenresPage/GenresPage'));
const MoviesPage = lazy(() => import('./MoviesPage/MoviesPage'));
const MoviePage = lazy(() => import('./MoviePage/MoviePage'));
const AccountPage = lazy(() => import('./AccountPage/AccountPage'));

const router = createBrowserRouter([
	{
		path: '',
		element: <DetectConnection><MainLayout /></DetectConnection>,
		children: [
			{
				path: '/',
				element: <Suspense fallback={<Loader/>}><MainPage/></Suspense>
			},
			{
				path: '/genres',
				element: <Suspense fallback={<Loader/>}><GenresPage /></Suspense>
			},
			{
				path: '/movies/:genre',
				element: <Suspense fallback={<Loader/>}><MoviesPage /></Suspense>
			},
			{
				path: '/movie/:id',
				element: <Suspense fallback={<Loader/>}><MoviePage /></Suspense>
			},
			{
				path: '/account/:section',
				element: <Suspense fallback={<Loader/>}><AccountPage /></Suspense>
			}
		],
		errorElement: <ErrorPage />
	}
],{
	future: {
		v7_relativeSplatPath: true
	}
});

export default router;