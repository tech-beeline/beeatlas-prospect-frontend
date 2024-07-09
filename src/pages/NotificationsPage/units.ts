import { Search } from '@beeline/design-system-react';
import styled from '@emotion/styled';

export const PageWrapper = styled.div`
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

export const ControlsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-top: 24px;
`;

export const ChipsContainer = styled.div`
    display: flex;
    gap: 12px;
`;

export const CardsContainer = styled.div`
    margin-top: 24px;

    overflow: hidden;

    border-radius: var(--size-border-radius-x6);
    border: 1px solid var(--color-divider);
`;

export const NotFoundContainer = styled.div`
    margin-top: 68px;
`;

export const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;

    margin-top: 32px;
`;
