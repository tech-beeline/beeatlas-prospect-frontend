import styled from '@emotion/styled';

export const FlexContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const FieldsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 32px;

    width: 100%;
`;

export const SubTitle = styled.h4`
    height: 24px;

    font-size: var(--font-size-body1);
    font-weight: var(--font-weight-medium);
    line-height: var(--font-line-height-body1);

    color: var(--color-text-active);
`;

export const SubTitleSmall = styled.h4`
    margin: 16px 0px;

    font-size: var(--font-size-subtitle3);
    font-weight: var(--font-weight-medium);
    line-height: var(--font-line-height-subtitle3);

    color: var(--color-text-active);
`;
