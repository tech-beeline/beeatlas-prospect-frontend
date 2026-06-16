import { ISearchResult } from 'api/capability/types';

export enum PersonalMapElementType {
    GROUP = 'GROUP',
    SUBGROUP = 'SUBGROUP',
    CAPABILITY = 'CAPABILITY',
}

export interface IPersonalMapCapability extends ISearchResult {
    elementId: string;
    elementType: PersonalMapElementType.CAPABILITY;
}

export interface IPersonalMapSubgroup {
    elementId: string;
    elementType: PersonalMapElementType.SUBGROUP;
    name: string;
    children: IPersonalMapCapability[];
    groupId?: number;
}

export interface IPersonalMapGroup {
    elementId: string;
    elementType: PersonalMapElementType.GROUP;
    name: string;
    children: (IPersonalMapSubgroup | IPersonalMapCapability)[];
    groupId?: number;
}

export type IPersonalMapElement = IPersonalMapCapability | IPersonalMapSubgroup | IPersonalMapGroup;
