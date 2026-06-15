import styled from '@emotion/styled';

const iconBase = `
    font-family: 'BeelineIcons';
    font-weight: normal;
    font-style: normal;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    text-transform: none;
    letter-spacing: normal;
    word-wrap: normal;
    white-space: nowrap;
    direction: ltr;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    -moz-osx-font-smoothing: grayscale;
    font-feature-settings: 'liga';
`;

const typographyBase = `
    font-family: 'Beeline Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-style: normal;
    margin: 0;
`;

export const Root = styled.div`
    width: min-content;

    &.dsb_rating-disabled {
        opacity: 0.48;
        pointer-events: none;
    }

    &.dsb_rating-readonly {
        pointer-events: none;
    }
`;

export const Score = styled.div`
    text-align: center;
`;

export const ScoreText = styled.span`
    ${typographyBase}
    display: block;
    text-align: center;
    margin-bottom: 16px;
    font-size: var(--font-size-h4, 20px);
    font-weight: var(--font-weight-h4, 500);
    line-height: var(--font-line-height-h4, 24px);
    letter-spacing: var(--font-letter-spacing-h4, 0.2px);
    color: var(--color-text-active);
`;

export const Select = styled.div`
    display: flex;
    flex-direction: row;

    &.dsb_rating__select-star {
        gap: 8px;
        height: 48px;
    }

    &.dsb_rating__select-number {
        gap: 2px;

        & > .dsb_rating__select__item {
            flex: 1;
        }
    }
`;

export const SelectItem = styled.div`
    cursor: pointer;
`;

export const StarIcon = styled.span<{ $selected: boolean }>`
    ${iconBase}
    width: 48px;
    height: 48px;
    font-size: 40px;
    line-height: 48px;
    text-align: center;
    color: ${({ $selected }) => ($selected ? '#fdc435' : 'inherit')};

    &:hover {
        font-size: 48px;
        transition: font-size 0.1s ease-in-out;
    }
`;

export const NumberItem = styled.div<{ $selected: boolean }>`
    flex: 1;
    border-radius: 8px;
    min-width: 24px;
    height: 40px;
    background-color: ${({ $selected }) =>
        $selected ? '#fdd835' : 'var(--color-status-neutral-background)'};
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background-color: ${({ $selected }) =>
            $selected ? '#fdd835' : 'var(--color-control-background-hover)'};
    }
`;

export const NumberText = styled.span<{ $selected: boolean }>`
    ${typographyBase}
    font-size: var(--font-size-body3, 13px);
    font-weight: var(--font-weight-body3, 400);
    line-height: var(--font-line-height-body3, 16px);
    letter-spacing: var(--font-letter-spacing-body3, 0.2px);
    color: ${({ $selected }) => ($selected ? 'rgba(9, 11, 22, 0.94)' : 'var(--color-text-active)')};
`;

export const Caption = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
    margin-top: 8px;
    max-width: 100%;
`;

export const CaptionText = styled.span`
    ${typographyBase}
    display: flex;
    align-items: flex-start;
    justify-content: center;
    margin-top: 8px;
    max-width: 100%;
    font-size: var(--font-size-body3, 13px);
    font-weight: var(--font-weight-body3, 400);
    line-height: var(--font-line-height-body3, 16px);
    letter-spacing: var(--font-letter-spacing-body3, 0.2px);
    color: var(--color-text-inactive);

    &:first-of-type {
        text-align: left;
    }

    &:last-of-type {
        text-align: right;
    }
`;
