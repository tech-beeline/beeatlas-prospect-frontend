export interface IChannelField {
    index: number;
    fieldsLength: number;
    alreadySelected: number[];
    add: () => void;
    remove: (index: number) => void;
    options: { id: number; name: string }[];
    fullscreen?: boolean;
}
