import styled from '@emotion/styled';

import { theme } from 'styles';

export const PageWrapper = styled.div`
    display: flex;

    padding-left: 56px;
`;

export const Wrapper = styled.div`
    display: flex;
    justify-content: center;

    width: 100%;
    min-height: 100vh;
    padding: 124px 52px;

    background-color: ${theme.colors.backgroundLow};
    color: ${theme.colors.textActive};
`;

export const Container = styled.div`
    /* width: 717px; */
    height: 100%;
    /* min-width: 700px; */

    /* text-align: justify; */
`;

export const H4 = styled.h4`
    font-weight: 500;
    font-size: 26px;
    line-height: 32px;
    letter-spacing: 0.2px;

    margin-bottom: 8px;
`;

export const JustText = styled.p`
    font-weight: 400;
    font-size: 15px;
    line-height: 18px;
    letter-spacing: 0.2px;
`;

export const GrayText = styled.p`
    font-weight: 400;
    font-size: 17px;
    line-height: 22px;
    letter-spacing: 0.2px;
    white-space: pre-line;

    color: ${theme.colors.textInactive};
`;

export const SearchContainer = styled.form`
    display: flex;
    justify-content: space-between;
    gap: 16px;

    width: 100%;
`;

export const ResultContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;

    margin-top: 32px;
`;

export const NoFoundBlock = styled.div`
    width: 410px;
    height: 44px;
    margin-top: 30px;

    font-weight: 500;
    font-size: 17px;
    line-height: 22px;
    letter-spacing: 0.2px;
    text-align: center;
`;

export const TreeContainer = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    flex-basis: 0;
    gap: 24px;

    margin: 24px 0;

    /* & > *:nth-child(1n) {
        order: 1;
    }

    & > *:nth-child(2n) {
        order: 2;
    } */
`;
