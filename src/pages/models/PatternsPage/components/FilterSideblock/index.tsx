import React, { FC, useState } from 'react';

import { CreateGroupForm, GroupFilters } from './components';
import { SideblockView } from './const';
import { IFilterSideblock } from './types';

export const FilterSideblock: FC<IFilterSideblock> = ({ onClose, isAdmin }) => {
    const [sideblockView, setSideblockView] = useState(SideblockView.FILTER);

    return (
        <>
            {sideblockView === SideblockView.FILTER && (
                <GroupFilters
                    isAdmin={isAdmin}
                    setSideblockView={setSideblockView}
                    onClose={onClose}
                />
            )}
            {sideblockView === SideblockView.FORM && (
                <CreateGroupForm setSideblockView={setSideblockView} onClose={onClose} />
            )}
        </>
    );
};
