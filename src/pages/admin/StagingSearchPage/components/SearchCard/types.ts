import { IArtifactSearchResult, IPipelineArtifactType } from 'api/staging-service/types';

export interface ISearchCard {
    searchResult: IArtifactSearchResult;
    artifactTypes: IPipelineArtifactType[];
}
