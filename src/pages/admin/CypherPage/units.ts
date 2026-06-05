import styled from '@emotion/styled';

import { Text } from 'components/core';
import { IconButton } from 'components/ui';

export const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: var(--size-spacing-x6);

    width: 100%;
    padding: var(--size-spacing-x8);

    background-color: var(--color-background-base);
    color: var(--color-text-active);
`;

export const Subtitle = styled(Text)`
    font-weight: var(--font-weight-medium);
`;

export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;

    padding: 24px;

    border: 1px solid var(--color-border);
    border-radius: var(--size-border-radius-x6);
`;

export const TitleWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const ToggleIconButton = styled(IconButton)<{ expanded: boolean }>`
    transform: ${({ expanded }) => (expanded ? 'rotate(0deg)' : 'rotate(180deg)')};
    transition: transform 0.2s ease;
`;

export const ActionRow = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
`;

export const SectionBlock = styled.div`
    display: flex;
    flex-direction: column;
    gap: var(--size-spacing-x3);
`;

export const ChipsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: var(--size-spacing-x3);
`;

export const TabsRow = styled.div`
    padding: 0 16px;
    border-bottom: 1px solid var(--color-border);
`;
