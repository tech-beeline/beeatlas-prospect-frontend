import { Select } from '@beeline/lk-ui';
import styled from '@emotion/styled';

import { BorderContainer } from 'components/containers';

export const PageWrapper = styled.div`
    /* height: 100vh; */
    padding: 72px 52px;

    background-color: var(--color-background-base);
    color: var(--color-text-active);
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

    font-weight: var(--font-weight-regular);
    font-size: var(--font-size-h3);
    line-height: var(--font-line-height-h3);

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
        color: var(--color-text-link);
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
