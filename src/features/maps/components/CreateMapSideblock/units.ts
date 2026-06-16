import styled from '@emotion/styled';

export const FlexContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    width: 320px;
    min-height: 100vh;
`;

export const ContentContainer = styled.div`
    padding: 20px 16px;

    max-height: calc(100vh - 96px);

    overflow-y: auto;
`;

export const FlexWrapper = styled.div`
    position: relative;

    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const SideBlockTitle = styled.div`
    font-weight: var(--font-weight-bold);
    font-size: var(--font-size-h5);
    line-height: var(--font-line-height-h5);
`;

export const TextFieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;

    width: 100%;
    padding-top: 24px;
`;

export const RadioGroupContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 10px;

    border-top: 1px solid var(--color-divider);
    width: 100%;
    height: 96px;
    padding: 24px 16px;
`;
