import styled from '@emotion/styled';

export const PersonalMapsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 24px;

    @media (max-width: 900px) {
        grid-template-columns: 100%;
    }

    padding: 24px 32px 32px 32px;

    max-width: 100%;

    overflow-y: auto;
`;

export const NotFoundContainer = styled.div`
    margin-top: 150px;
`;

export const MapCard = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    padding: 24px;

    max-width: 100%;

    border: 1px solid var(--color-divider);
    border-radius: var(--size-border-radius-x6);
`;

export const FlexContainer = styled.div`
    display: flex;
    align-items: start;
    justify-content: space-between;

    margin-bottom: 12px;
`;

export const TitleContainer = styled.div`
    width: calc(100% - 48px);
    max-width: calc(100% - 48px);
`;

export const DatesContainer = styled.div`
    display: flex;

    margin-top: 12px;
`;

export const GrowContainer = styled.div`
    flex-grow: 1;
`;

export const BoldSpan = styled.span`
    font-weight: 500;
`;
