export interface IParticipantFields {
    index: number;
    fieldsLength: number;
    alreadySelected: number[];
    remove: (index: number) => void;
}
