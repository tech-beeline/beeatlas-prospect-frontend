import { IE2EPlantUmlFileVersion } from 'api/staging-service/types';

export interface IHistoryTable {
    versions: IE2EPlantUmlFileVersion[];
    isLoading: boolean;
    e2eCode: string;
}
