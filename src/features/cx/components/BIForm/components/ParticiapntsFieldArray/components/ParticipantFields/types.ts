export interface IParticipantFields {
    index: number;
    options: { id: number; name: string }[];
    fieldsLength: number;
    alreadySelected: number[];
    add: () => void;
    remove: (index: number) => void;
    fullscreen?: boolean;
}
