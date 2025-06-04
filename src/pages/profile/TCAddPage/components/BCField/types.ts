export interface IBCField {
    index: number;
    disabled: boolean;

    append: (values: { id: number }) => void;
    remove: (index: number) => void;
}
