import styled from '@emotion/styled';

import { theme } from 'styles';

export const PageWrapper = styled.div`
    display: flex;
    justify-content: center;

    width: 100%;
    min-height: 100vh;
    padding: 124px 52px;

    background-color: ${theme.colors.backgroundLow};
    color: ${theme.colors.textActive};
`;

export const Container = styled.div`
    position: relative;

    width: 717px;
    height: 100%;
    min-width: 700px;

    text-align: justify;
`;

export const Iframe = styled.iframe`
    /* width: calc(100% + 250px); */
    width: 100%;

    /* transform: translateX(-250px); */
`;
