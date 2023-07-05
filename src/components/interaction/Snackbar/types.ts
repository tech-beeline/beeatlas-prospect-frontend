export interface ISnackbar {
    isOpen: boolean;
    message: string;
    messageButton?: string;
    textButton?: string;

    setOpen: (bool: boolean) => void;
    onClickButton?: () => void;
}
