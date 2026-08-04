import { create } from 'zustand';

import { EditState } from './types';

export const useEditStore = create<EditState>((set, get) => ({
    editingCellId: null,
    originalValue: null,
    draftValue: '',

    startEdit: (cellId, initialValue) =>
        set({
            editingCellId: cellId,
            originalValue: initialValue,
            draftValue: initialValue,
        }),

    updateDraft: (value) =>
        set({
            draftValue: value,
        }),

    saveEdit: (callback) => {
        const { draftValue } = get();
        callback(draftValue);
        set({
            editingCellId: null,
            originalValue: null,
        });
    },

    cancelEdit: () =>
        set({
            editingCellId: null,
            originalValue: null,
        }),
}));
