import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import * as S from './units';

// TODO: add types
export const SubItem = (props: any) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(props.to);
    };

    useEffect(() => {
        // !activeMenuItem && setActiveMenuItem(location.pathname);
        // if (location.pathname !== activeMenuItem) {
        //     setActiveMenuItem('');
        // }

        console.log('location', location.pathname);
    }, [location]);

    return (
        <S.Wrapper isActive={props.to === location.pathname} onClick={handleClick}>
            {props.title}
        </S.Wrapper>
    );
};
