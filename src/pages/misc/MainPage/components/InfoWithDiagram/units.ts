import styled from '@emotion/styled';

export const FlexContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    max-width: 294px;

    text-align: center;
`;

export const Diagram = styled.img`
    width: 180px;
    height: 239px;

    margin-bottom: 40px;
`;

export const Description = styled.p`
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-body1);
    line-height: var(--font-line-height-body1);

    margin-top: 12px;

    color: var(--color-text-inactive);
`;
