import { ButtonHTMLAttributes } from 'react';

export interface ButtonTextProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	appearence?: 'primary' | 'secondary';
	text: string; 
	loading?: boolean;
	className?: string;
}