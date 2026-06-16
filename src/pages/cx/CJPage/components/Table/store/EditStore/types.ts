export interface EditState {
    editingCellId: string | null;
    originalValue: string | null;
    draftValue: string;

    startEdit: (cellId: string, initialValue: string) => void;
    updateDraft: (value: string) => void;
    saveEdit: (callback: (newValue: string) => void) => void;
    cancelEdit: () => void;
}
