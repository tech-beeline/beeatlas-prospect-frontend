export interface IIconCard {
    icon: string;
    title: string;
    text: string;
    color?: 'error' | 'success' | 'warning' | 'info' | 'purple' | 'teal' | 'magenta';
    deadlineText?: string;
    buttonText?: string;
    onClick?: () => void;
}
