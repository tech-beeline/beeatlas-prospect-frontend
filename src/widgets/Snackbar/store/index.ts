import { create } from 'zustand';

import { ISnackbarStore } from './types';

const defaultSnackbar = {
    isOpen: false,
    message: '',
};

export const useSnackbarStore = create<ISnackbarStore>((set, get) => ({
    activeSnackbar: defaultSnackbar,
    clearSnackbar: () => {
        set(() => ({ activeSnackbar: defaultSnackbar }));
    },
    showSnackbar: (snackbarProps) => {
        set(() => ({
            activeSnackbar: { ...snackbarProps, isOpen: true },
        }));
        setTimeout(() => {
            get().clearSnackbar();
        }, 3000);
    },
}));
