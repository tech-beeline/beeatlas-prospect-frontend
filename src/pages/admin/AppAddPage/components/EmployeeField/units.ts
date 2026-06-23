import styled from '@emotion/styled';

export const FormRow = styled.div<{ isFirst: boolean }>`
    display: flex;
    flex-direction: column;
    gap: 16px;

    margin-top: ${({ isFirst }) => (isFirst ? '-8px' : '0px')};
`;

export const GrowContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;

    flex: 1;
`;

export const AutocompleteContainer = styled.div`
    flex: 1;
`;
