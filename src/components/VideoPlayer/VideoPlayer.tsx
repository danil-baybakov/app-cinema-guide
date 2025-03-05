import { FC } from 'react';
import styles from './VideoPlayer.module.scss';
import ButtonClose from '../../ui/ButtonClose/ButtonClose';
import Icon from '../../ui/Icon/Icon';
import cn from 'classnames';
import ReactPlayer from 'react-player';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { playerActions } from '../../store/player.slice';

/**
 * Компонент для отображения плеера
 */
const VideoPlayer: FC = () => {

	const dispatch = useDispatch<AppDispatch>();

	const { playing, video } = useSelector((s: RootState) => s.player);

	const handlePlay = () => {
		dispatch(playerActions.togglePlaying());
	};

	const handleClose = () => {
		dispatch(playerActions.close());
	};

	if (!video) return;

	return (
		<div className={styles['video-player']}>
			<div className={styles['video-player__container']}>
				<div className={styles['video-player__close']}>
					<ButtonClose onClick={handleClose} />
				</div>	
				<div className={styles['video-player__wrapper']}>
					<ReactPlayer
						url={video.url}
						className={styles['video-player__player']}
						playing={playing}
						width={'100%'}
						height={'100%'}
						config={{
							youtube: {
								playerVars: {
									showinfo: 0,
									controls: 0,
									modestbranding: 1
								}
							}
						}}
					/>
					<button className={cn(styles['video-player__btn'], {
						[styles['play']]: playing
					})} onClick={handlePlay}>
						<Icon className={styles['video-player__btn-svg']} name='play' />
						<Icon className={styles['video-player__btn-svg']} name='pause' />
					</button>
				</div>
				<div className={styles['video-player__title']}>
					<span className={styles['video-player__text']}>
                    	{video.title}
					</span>
				</div>
			</div>
		</div>
	);
};

export default VideoPlayer;