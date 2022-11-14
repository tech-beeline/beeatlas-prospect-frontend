import { Select } from '@beeline/lk-ui';
import styled from '@emotion/styled';

import { BorderContainer } from 'components/containers';

import { theme } from 'styles';

export const PageWrapper = styled.div`
    /* height: 100vh; */
    padding: 72px 52px;

    background-color: ${theme.colors.backgroundLow};
    color: ${theme.colors.textActive};
`;

export const SelectContainer = styled.div`
    display: flex;
    gap: 24px;

    margin-top: 32px;
`;

export const BorderContainerStyled = styled(BorderContainer)`
    flex-direction: column;
    gap: 32px;
`;

export const H3 = styled.h3`
    display: flex;
    align-items: center;
    gap: 16px;

    font-weight: 400;
    font-size: 34px;
    line-height: 44px;

    width: max-content;
    margin: 40px 0 12px;

    transition: color 0.25s ease-out;

    cursor: pointer;
    /* 
    & > * {
        transition: color 0.25s ease-out;
    } */

    /* &:hover > *,
    &:hover {
        color: ${theme.colors.textLink};
    } */
`;

export const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;

    margin-top: 24px;
`;

export const SelectStyled = styled(Select)`
    height: 40px;
`;
