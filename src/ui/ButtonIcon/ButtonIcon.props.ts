import { ButtonHTMLAttributes } from 'react';

export interface ButtonIconProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	appearence?: 'primary' | 'secondary'
	className?: string;
	active?: boolean;
	nameSvg1?: string;
	nameSvg2?: string;
}