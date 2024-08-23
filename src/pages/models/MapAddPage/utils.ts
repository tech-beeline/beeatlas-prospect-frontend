import { cloneDeep } from 'lodash';

import { IPersonalMapGroup } from './types';

export const deleteElementInMapDataByIds = (
    mapData: IPersonalMapGroup[],
    ids: string[],
): IPersonalMapGroup[] => {
    const deepCopy = cloneDeep(mapData);

    return deepCopy
        .filter((element) => !ids.includes(element.elementId))
        .map((element) => ({
            ...element,
            ...(element.children
                ? { children: deleteElementInMapDataByIds(element.children as [], ids) }
                : {}),
        })) as IPersonalMapGroup[];
};
