import React from 'react';
import { useNavigate } from 'react-router-dom';

import * as S from './units';

// TODO: add types
export const SubItem = (props: any) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(props.to);
    };

    return (
        <S.Wrapper
            className="SubItemWrapper"
            isActive={props.to === location.pathname}
            onClick={handleClick}
        >
            {props.title}
        </S.Wrapper>
    );
};
