import { IProjectUsecaseDynamic } from 'api/usecase/types';

export interface IViewDynamicSideblockProps {
    dynamic: IProjectUsecaseDynamic | null;
    isOpen: boolean;
    onClose: () => void;
}
