export interface ISnackbar {
    isOpen: boolean;
    message: string;

    showCloseButton?: boolean;

    messageButton?: string;
    textButton?: string;
    onClickButton?: () => void;
}

type ISnackbarData = Omit<ISnackbar, 'isOpen'>;

export interface ISnackbarStore {
    activeSnackbar: ISnackbar;
    timerId: number | null;
    clearSnackbar: () => void;
    showSnackbar: (snackbarData: ISnackbarData) => void;
}
