import styled from '@emotion/styled';

import { Search } from 'components/ui';

export const PageWrapper = styled.div`
    display: flex;
    justify-content: center;

    width: 100%;

    max-height: calc(100vh - 64px);
    padding: 32px 266px;

    background-color: var(--color-background-base);
    color: var(--color-text-active);
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;

    width: 100%;
    min-width: 712px;
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
    gap: 24px;

    margin-top: 24px;
    margin-bottom: 24px;
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

    border-radius: var(--size-border-radius-x6);
    border: 1px solid var(--color-divider);

    overflow: auto;
`;

export const NotFoundContainer = styled.div`
    margin-top: 68px;
`;

export const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;

    margin-top: 32px;
`;
