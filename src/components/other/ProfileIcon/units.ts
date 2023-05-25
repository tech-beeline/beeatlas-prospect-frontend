import styled from '@emotion/styled';

import { theme } from 'styles';

export const Wrapper = styled.div`
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;

    width: 40px;
    height: 40px;
    min-width: 40px;
    min-height: 40px;

    color: ${theme.colors.success};
    background-color: ${theme.colors.backgroundSuccess};

    font-weight: 500;
    font-size: 15px;
    line-height: 20px;

    border-radius: ${theme.borderRadius};

    user-select: none;
    cursor: pointer;
`;
