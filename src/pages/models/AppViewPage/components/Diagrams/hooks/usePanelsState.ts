import { useState } from 'react';

export const usePanelsState = () => {
    const [leftVisible, setLeftVisible] = useState(true);
    const [rightVisible, setRightVisible] = useState(true);

    return {
        leftVisible,
        rightVisible,

        showLeft: () => setLeftVisible(true),
        hideLeft: () => setLeftVisible(false),

        showRight: () => setRightVisible(true),
        hideRight: () => setRightVisible(false),
    };
};
