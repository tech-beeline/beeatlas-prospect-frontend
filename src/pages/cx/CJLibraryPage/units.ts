import styled from '@emotion/styled';

import { Subtitle1 } from 'styles/units';

export const PageWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    position: relative;

    width: 100%;
    height: 100%;
    background-color: var(--color-background-base);
    color: var(--color-text-active);
`;

export const ContentWrapper = styled.div`
    width: 100%;
    padding: 36px 32px;
    overflow: auto;
`;

export const TitleWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const FiltersContainer = styled.div<{ columns: number }>`
    display: grid;
    grid-template-columns: repeat(${({ columns }) => columns}, minmax(0, 1fr));
    gap: 24px;

    margin: 24px 0;
`;

export const ActionsContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
    justify-content: space-between;
    min-width: 0;
`;

export const ToggleContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    min-width: 0;
`;

export const ButtonContainer = styled.div`
    display: flex;

    gap: 24px;
`;

export const CardContainer = styled.div<{ columns: number }>`
    display: grid;
    grid-template-columns: repeat(${({ columns }) => columns}, minmax(0, 1fr));
    gap: 24px;

    margin-top: 24px;
`;

export const CardColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const NotFoundContainer = styled.div`
    margin-top: 100px;
`;

export const CJCard = styled.div`
    padding: 24px;

    border: 1px solid var(--color-divider);
    border-radius: var(--size-border-radius-x6);
`;

export const FlexContainer = styled.div`
    position: relative;

    display: flex;
    justify-content: space-between;
`;

export const Title = styled(Subtitle1)`
    margin-top: 16px;

    color: var(--color-text-link);

    cursor: pointer;
`;

export const Number = styled.div`
    margin-top: 4px;

    color: var(--color-text-disabled);
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-body3);
    line-height: var(--font-line-height-body3);
    letter-spacing: var(--font-letter-spacing-body3);
`;

export const Description = styled.div`
    margin-top: 16px;

    font-weight: var(--font-weight-body2);
    font-size: var(--font-size-body2);
    line-height: var(--font-line-height-body2);
`;
