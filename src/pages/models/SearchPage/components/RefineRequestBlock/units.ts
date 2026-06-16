import styled from '@emotion/styled';

import { Subtitle2 } from 'styles/units';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;

    margin-top: 60px;
`;

export const Image = styled.img`
    min-width: 150px;
    min-height: 150px;
    max-width: 150px;
    max-height: 150px;
`;

export const Text = styled(Subtitle2)`
    white-space: pre-line;

    text-align: center;
`;
