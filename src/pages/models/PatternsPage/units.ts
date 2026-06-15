import styled from '@emotion/styled';

import { Label } from 'components/ui';

export const PageWrapper = styled.div`
    position: relative;
    display: flex;

    width: 100%;
    height: 100%;

    background-color: var(--color-background-base);
    color: var(--color-text-active);
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;

    padding: 32px;

    width: 100%;
    max-width: 100%;

    overflow: auto;
`;

export const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const ControlsContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
`;

export const SearchContainer = styled.div`
    flex: 1;
`;

export const ChipsContainer = styled.div`
    display: flex;
    gap: 8px;
`;

export const CardsContainer = styled.div`
    display: grid;
    gap: 24px;
    grid-template-columns: repeat(3, minmax(100px, 1fr));

    max-width: 100%;

    @media only screen and (max-width: 1400px) {
        grid-template-columns: repeat(2, minmax(100px, 1fr));
    }
`;

export const BoldSpan = styled.span`
    font-weight: 500;
`;

export const NotFoundContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    height: 100%;
    max-width: 100%;
`;

export const LabelWithoutBorder = styled(Label)`
    border: none;
    padding: 0;
`;
