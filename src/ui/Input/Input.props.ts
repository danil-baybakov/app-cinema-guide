import { InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	className?: string;
	lightThema?: boolean;
	svgName?: string;
	error?: string; 
}