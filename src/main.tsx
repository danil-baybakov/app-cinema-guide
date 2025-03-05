import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './assets/styles/index.scss';
import 'swiper/css';
import { RouterProvider } from 'react-router-dom';
import router from './pages/router';
import { Provider } from 'react-redux';
import { store } from './store/store';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} future={{
				v7_startTransition: true
			}}/>
		</Provider>
	</StrictMode>
);
