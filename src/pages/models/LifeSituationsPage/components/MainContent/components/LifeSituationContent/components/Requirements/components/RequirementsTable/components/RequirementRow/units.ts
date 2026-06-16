import styled from '@emotion/styled';

export const RequirementTitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

export const OverflowContainer = styled.p<{ clampNumber: number; ellipsisColor?: string }>`
    display: -webkit-box;
    -webkit-line-clamp: ${({ clampNumber }) => clampNumber};
    -webkit-box-orient: vertical;
    overflow: hidden;
    color: ${({ ellipsisColor = 'var(--color-text-primary)' }) => ellipsisColor};
`;
