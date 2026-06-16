import { IBPMNFileVersion } from 'api/cj/types';

export interface IVersion {
    version: IBPMNFileVersion;
    cjId: string | null;
}
