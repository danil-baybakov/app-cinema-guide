import { ButtonHTMLAttributes } from 'react';

export interface ButtonSmallProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
	nameSvg?: string;
}