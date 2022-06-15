import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from 'components/interaction';

export const TestPage = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/auth');
    };

    return (
        <>
            Welcome to the TestPage. Press the button for enter to system
            <br />
            <Button onClick={handleClick}>Auth</Button>
        </>
    );
};
