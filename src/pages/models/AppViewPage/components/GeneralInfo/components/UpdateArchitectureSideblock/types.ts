export interface IUpdateArchitectureSideblock {
    isOpen: boolean;
    onClose: () => void;
    cmdb: string;
    setTempDisabled: (flag: boolean) => void;
}
