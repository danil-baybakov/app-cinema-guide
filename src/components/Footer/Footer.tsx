import { FC } from 'react';
import styles from './Footer.module.scss';
import cn from 'classnames';
import Container from '../Container/Container';
import Icon from '../../ui/Icon/Icon';
import { SocialInterface } from '../../interfaces/interfaces';
import LinkSocial from '../LinkSocial/LinkSocial';


const socialList: SocialInterface[] = [
	{
		id: 1,
		href: 'https://vk.com/',
		svgName: 'vk'
	},
	{
		id: 2,
		href: 'https://www.youtube.com/',
		svgName: 'youtube'
	},
	{
		id: 3,
		href: 'https://ok.ru/',
		svgName: 'ok'
	},
	{
		id: 4,
		href: 'https://www.twitter.com/',
		svgName: 'twitter'
	}
];

/**
 * Компонент отображения футера сайта
 */
const Footer: FC = () => {
	return (
		 <footer className={styles['footer']} aria-label="Подвал сайта">

			<Container className={styles['footer__container']}>

				<div className={cn(styles['footer__copyright'], styles['footer__item'])}>

					<p className={cn(styles['footer__copyright-title'], styles['footer__copyright-item'])}>
                    LLC «Мультимедиа Визион»
					</p>
					<p className={cn(styles['footer__copyright-text'], styles['footer__copyright-item'])}>
						<span className={styles['footer__copyright-text-item']}>
							<Icon className={styles['footer__copyright-icon']} name='copyright' />
						</span>
						<span className={styles['footer__copyright-text-item']}>
                        Все права защищены
						</span>
					</p>
				</div>
				<ul className={cn(styles['footer__social'], styles['footer__item'])}>
					{
						socialList.map(item => (
							<li key={item.id} className={styles['footer__social-item']}>
								<LinkSocial href={item.href} svgName={item.svgName} />
							</li>
							
						))
					}
				</ul>

			</Container>

		</footer>
	);
};

export default Footer;