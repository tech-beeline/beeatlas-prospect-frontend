export interface ISnackbar {
    isOpen: boolean;
    message: string;

    messageButton?: string;
    textButton?: string;
    onClickButton?: () => void;
}

type ISnackbarData = Omit<ISnackbar, 'isOpen'>;

export interface ISnackbarStore {
    activeSnackbar: ISnackbar;
    clearSnackbar: () => void;
    showSnackbar: (snackbarData: ISnackbarData) => void;
}
