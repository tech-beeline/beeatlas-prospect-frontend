import styled from '@emotion/styled';

import { Text } from 'components/core';

export const Card = styled.div<{ topLevel?: boolean; withinGrid?: boolean }>`
    display: flex;
    flex-direction: column;

    width: 100%;
    box-sizing: border-box;
    ${({ topLevel, withinGrid }) => {
        if (withinGrid) return '';
        if (topLevel) return 'min-width: 424px; max-width: 424px;';
        return 'max-width: 100%;';
    }}

    ${({ withinGrid }) => (withinGrid ? '' : 'height: fit-content;')}
    
    padding: 24px;

    border-radius: 12px;
    border: 1px solid var(--color-divider);

    cursor: pointer;

    transition: 0.25s;

    &:hover {
        box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.08), 0px 2px 8px 0px rgba(0, 0, 0, 0.08);
    }
`;

export const CardTitle = styled.div`
    font-weight: var(--font-weight-overline);
    font-size: var(--font-size-overline);
    line-height: var(--font-line-height-overline);

    color: var(--color-text-inactive);
`;

export const CardText = styled.div`
    font-weight: var(--font-weight-body2);
    font-size: var(--font-size-body2);
    line-height: var(--font-line-height-body2);

    word-break: break-word;
`;

export const CriteriaContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;

    margin-top: 24px;
`;

export const GroupCard = styled.div<{ topLevel?: boolean }>`
    display: flex;
    flex-direction: column;
    gap: 16px;

    height: fit-content;
    box-sizing: border-box;

    padding: 16px;

    border-radius: 12px;
    border: 1px solid var(--color-divider);

    ${({ topLevel = true }) =>
        topLevel
            ? 'min-width: 424px; max-width: 424px;'
            : 'width: 100%; min-width: 0; max-width: 100%;'}
`;

export const SubgroupCard = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;

    width: 100%;
    min-width: 0;
    height: fit-content;
    box-sizing: border-box;

    padding: 16px;

    border-radius: 12px;
    border: 1px solid var(--color-divider);
`;

export const GroupCardTitle = styled.div`
    font-weight: var(--font-weight-subtitle2);
    font-size: var(--font-size-subtitle2);
    line-height: var(--font-line-height-subtitle2);

    margin-bottom: 8px;

    word-break: break-word;
`;

export const TechCapabilityCard = styled.div`
    display: flex;
    flex-direction: column;

    width: 100%;

    padding: 24px;

    border-radius: 12px;
    border: 1px solid var(--color-divider);
`;

export const TechCapabilityTitleContainer = styled.div`
    display: flex;
    align-items: start;
    justify-content: space-between;
    gap: 16px;
`;

export const DescriptionText = styled(Text)`
    display: -webkit-box;
    -webkit-line-clamp: 10;
    -webkit-box-orient: vertical;

    overflow: hidden;
`;
