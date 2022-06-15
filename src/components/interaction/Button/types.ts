import { ButtonHTMLAttributes } from 'react';

export interface IOutlineButton extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon: string;
}

export interface IButton extends Omit<IOutlineButton, 'icon'> {
    isLoading?: boolean;
    styleScheme?: 'primary' | 'secondary' | 'outline';
}
