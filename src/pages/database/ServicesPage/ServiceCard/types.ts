export interface IServiceCard {
    title: string;
    text: string;
    ownerName?: string;
    buttonText?: string;
    onClick?: () => void;
}
