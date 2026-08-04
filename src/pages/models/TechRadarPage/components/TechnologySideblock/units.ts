import styled from '@emotion/styled';

import { Text } from 'components/core';

export const Container = styled.div`
    padding: 20px 16px;

    max-height: calc(100vh - 64px);
    min-width: 320px;

    overflow-y: auto;
`;

export const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const ButtonsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-top: 32px;
`;

export const InfoContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

export const NameContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;

    margin-top: 24px;
`;

export const LablesContainer = styled.div`
    display: flex;
    gap: 8px;

    margin-top: 8px;
`;

export const DescriptionHeader = styled(Text)`
    margin-top: 12px;
`;

export const SubtitleMargin = styled.div`
    margin-top: 24px;
`;

export const LastChanges = styled(Text)`
    margin-top: 12px;
`;

export const AppsContainer = styled.div<{ open: boolean }>`
    display: flex;
    flex-direction: column;
    gap: 24px;

    height: ${({ open }) => (open ? 'auto' : '0px')};

    margin-top: ${({ open }) => (open ? '24px' : '0px')};

    overflow: hidden;

    transition: all 0.25s;
`;

export const BoldSpan = styled.span`
    font-weight: 500;
`;
