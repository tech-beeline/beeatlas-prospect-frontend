import styled from '@emotion/styled';

import { Subtitle1, Subtitle2 } from 'styles/units';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    height: 100vh;
    padding: 64px 0;

    background-color: var(--color-background-base);
    color: var(--color-text-active);
`;

export const Image = styled.img`
    width: 480px;
    height: 400px;
`;

export const Text = styled(Subtitle1)`
    margin-top: 32px;
`;

export const SubText = styled(Subtitle2)`
    color: var(--color-text-inactive);
`;

export const ButtonContainer = styled.div`
    margin-top: 24px;
`;
