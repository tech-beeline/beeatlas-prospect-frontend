import { INonFunctionalRequirementFullData, IProductPattern } from 'api/product/types';

export interface IRequirementRow {
    nfr: INonFunctionalRequirementFullData;
    productPatterns: IProductPattern[];
    setRequirementToDelete: (requirement: INonFunctionalRequirementFullData) => void;
}
