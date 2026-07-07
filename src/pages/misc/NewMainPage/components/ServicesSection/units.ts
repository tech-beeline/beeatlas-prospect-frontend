import styled from '@emotion/styled';

export const Section = styled.section`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const ServicesGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 24px;

    @media only screen and (max-width: 1390px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media only screen and (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

export const ServiceCategoryCard = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;

    padding: 24px;

    border: 1px solid var(--color-divider);
    border-radius: var(--size-border-radius-x6);
    background-color: var(--color-background-medium);
`;

export const ServiceItemsList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;
