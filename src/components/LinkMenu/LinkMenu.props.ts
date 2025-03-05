import { MouseEvent} from 'react';

export interface LinkMenuProps {
	title?: string;
	href?: string;
	typeSecondary?: boolean;
	hoverChangeSvg?: boolean;
	svg1?: string;
	svg2?: string;
	onActive?: boolean;
	onClick?: (e: MouseEvent) => void;
}