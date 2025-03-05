import { FC } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Plug from '../../components/Plug/Plug';
import Container from '../../components/Container/Container';

/**
 * Ошибочная страница
 */
const ErrorPage: FC = () => {
	return (
		<>
			<Header />
			<Plug />
			<Container>
				<h1> Страница не найдена.</h1>	
			</Container>
			<Footer />
		</>
	);
};

export default ErrorPage;