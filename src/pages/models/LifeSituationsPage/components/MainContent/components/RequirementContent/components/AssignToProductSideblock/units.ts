import styled from '@emotion/styled';

import { Text } from 'components/core';

export const SideblockContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    height: 100vh;
`;

export const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;

    padding: 20px 16px;
`;

export const TitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const DescriptionText = styled(Text)`
    margin: 0;
`;

export const ButtonsContainer = styled.div`
    display: flex;
    gap: 16px;
    align-items: center;

    padding: 16px 16px 24px;

    border-top: 1px solid var(--color-divider);
`;
