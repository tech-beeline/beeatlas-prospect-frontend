import React, { FC, useState } from 'react';

import { CreateGroupForm, GroupFilters } from './components';
import { SideblockView } from './const';
import { IFilterSideblock, IPatternGroupToEdit } from './types';

export const FilterSideblock: FC<IFilterSideblock> = ({
    onClose,
    isAdmin,
    onGroupsChange,
    selectedGroups,
}) => {
    const [sideblockView, setSideblockView] = useState(SideblockView.FILTER);
    const [groupToEdit, setGroupToEdit] = useState<IPatternGroupToEdit | null>(null);

    return (
        <>
            {sideblockView === SideblockView.FILTER && (
                <GroupFilters
                    isAdmin={isAdmin}
                    setGroupToEdit={setGroupToEdit}
                    setSideblockView={setSideblockView}
                    onClose={onClose}
                    onGroupsChange={onGroupsChange}
                    selectedGroups={selectedGroups}
                />
            )}
            {sideblockView === SideblockView.FORM && (
                <CreateGroupForm
                    groupToEdit={groupToEdit}
                    setGroupToEdit={setGroupToEdit}
                    setSideblockView={setSideblockView}
                    onClose={onClose}
                />
            )}
        </>
    );
};
