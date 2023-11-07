export interface IParticipantFields {
    index: number;
    fieldsLength: number;
    alreadySelected: number[];
    add: () => void;
    remove: (index: number) => void;
    fullscreen?: boolean;
}
