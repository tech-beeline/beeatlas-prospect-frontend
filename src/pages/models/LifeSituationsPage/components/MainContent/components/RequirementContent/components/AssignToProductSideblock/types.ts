import { INonFunctionalRequirement } from 'api/product/types';

export interface IAssignToProductSideblock {
    isOpen: boolean;
    onClose: () => void;
    nfrId: number;
    products: { nfrs: INonFunctionalRequirement[]; id: string; name: string; alias: string }[];
}
