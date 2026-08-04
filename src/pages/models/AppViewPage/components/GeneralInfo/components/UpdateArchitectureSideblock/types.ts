export interface IUpdateArchitectureSideblock {
    isOpen: boolean;
    onClose: () => void;
    cmdb: string;
    setTempDisabled: (flag: boolean) => void;
}

export enum ArchitectureErrorTypes {
    EXTENSION = 'EXTENSION',
    VALIDATION = 'VALIDATIOn',
}

export interface IArchitectureError {
    type: ArchitectureErrorTypes;
    title: string;
    errorMessage?: string;
}
