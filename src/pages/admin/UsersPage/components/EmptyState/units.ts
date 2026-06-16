import styled from '@emotion/styled';

import { Subtitle2 } from 'styles/units';

export const FlexContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    margin-top: 160px;
`;

export const Image = styled.img`
    margin: 16px 0px;
`;

export const Text = styled(Subtitle2)`
    white-space: pre-line;

    text-align: center;
    color: var(--color-text-inactive);
`;
