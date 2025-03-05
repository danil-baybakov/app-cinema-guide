import { ButtonHTMLAttributes } from 'react';

export interface ButtonCloseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
	size?: 'small' | 'large';
}