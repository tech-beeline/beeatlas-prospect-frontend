import { Search } from '@beeline/design-system-react';
import styled from '@emotion/styled';

export const PageWrapper = styled.div`
    position: relative;

    display: flex;
    justify-content: center;

    width: 100%;

    padding: 32px;

    background-color: var(--color-background-base);
    color: var(--color-text-active);
`;

export const Container = styled.div`
    width: 712px;
`;

export const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`;

export const Title = styled.h4`
    font-weight: var(--font-weight-h4);
    font-size: var(--font-size-h4);
    line-height: var(--font-line-height-h4);
`;

export const FiltersContainer = styled.div`
    display: flex;
    gap: 16px;

    margin-top: 24px;
`;

export const SearchStyled = styled(Search)`
    flex: 1;
`;

export const ChipsContainer = styled.div`
    display: flex;
    gap: 12px;

    margin-top: 24px;
`;

export const CardsContainer = styled.div`
    margin-top: 24px;

    overflow: hidden;

    border-radius: var(--size-border-radius-x6);
    border: 1px solid var(--color-divider);
`;

export const ActionsRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 20px;

    padding: 8px 16px;

    border-bottom: 1px solid var(--color-divider);
`;

export const ButtonsContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

export const CustomButton = styled.button<{ disabled?: boolean }>`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 8px;

    height: 40px;
    padding: 8px 12px;

    border-radius: var(--size-border-radius-x6);

    color: ${({ disabled }) =>
        disabled ? 'var(--color-text-disabled)' : 'var(--color-text-active)'};

    cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};

    pointer-events: ${({ disabled }) => (disabled ? 'none' : 'all')};

    user-select: none;

    &:hover {
        background-color: var(--color-background-base-hover);
    }

    &:active {
        background-color: var(--color-background-base-focused);
    }

    span {
        color: ${({ disabled }) =>
            disabled ? 'var(--color-text-disabled)' : 'var(--color-text-inactive)'};
    }
`;

export const NotFoundContainer = styled.div`
    padding: 180px 0px;
`;

export const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;

    margin-top: 32px;
`;

export const BoldSpan = styled.span`
    font-weight: var(--font-weight-subtitle3);
`;
