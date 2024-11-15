import styled from '@emotion/styled';

export const PersonalMapsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 24px;

    @media (max-width: 900px) {
        grid-template-columns: 1fr;
    }

    padding: 24px 32px 32px 32px;

    overflow-y: auto;

    &::-webkit-scrollbar-thumb {
        background-color: var(--color-utilities-scroll-hover);

        border-radius: var(--size-border-radius-x8);
    }

    &::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }
`;

export const NotFoundContainer = styled.div`
    margin-top: 150px;
`;

export const MapCard = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;

    padding: 24px;

    border: 1px solid var(--color-divider);
    border-radius: var(--size-border-radius-x6);
`;

export const FlexContainer = styled.div`
    display: flex;
    align-items: start;
    justify-content: space-between;
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
