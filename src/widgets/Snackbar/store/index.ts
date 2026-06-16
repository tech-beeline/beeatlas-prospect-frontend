import { create } from 'zustand';

import { ISnackbarStore } from './types';

const defaultSnackbar = {
    isOpen: false,
    message: '',
};

export const useSnackbarStore = create<ISnackbarStore>((set, get) => ({
    activeSnackbar: defaultSnackbar,
    timerId: null,
    clearSnackbar: () => {
        set(() => ({ activeSnackbar: { ...get().activeSnackbar, isOpen: false } }));
    },
    showSnackbar: (snackbarProps) => {
        const timer = get().timerId;
        if (timer) {
            clearTimeout(timer);
        }

        const shouldAutoClick = !snackbarProps.showCloseButton;

        set(() => ({
            activeSnackbar: { ...snackbarProps, isOpen: true },
            timerId: shouldAutoClick
                ? (setTimeout(() => {
                      get().clearSnackbar();
                  }, 3000) as unknown as number)
                : null,
        }));
    },
}));
