import styled from '@emotion/styled';

import { TextField } from 'components/form';

export const SideblockContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    height: 100vh;
`;

export const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;

    padding: 24px;

    max-height: calc(100vh - 88px);

    overflow-y: auto;
`;

export const TitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const FlexContainer = styled.div<{ gapPX: number }>`
    display: flex;
    flex-direction: column;
    gap: ${({ gapPX }) => `${gapPX}px`};
`;

export const CheckboxContainer = styled.div`
    padding-left: 16px;
`;

export const ButtonsContainer = styled.div`
    display: flex;
    gap: 16px;
    align-items: center;

    padding: 16px 24px 24px;

    border-top: 1px solid var(--color-divider);
`;

export const ButtonWrapper = styled.div`
    flex: 1;
`;

export const MetricCard = styled.div<{ isPointer?: boolean }>`
    cursor: ${({ isPointer }) => (isPointer ? 'pointer' : 'default')};

    display: flex;
    flex-direction: column;
    gap: 16px;

    padding: 24px 16px;

    border: 1px solid var(--color-divider);
    border-radius: var(--size-border-radius-x6);

    background-color: var(--color-background-base);
`;

export const MetricCardTop = styled.div`
    display: flex;
    gap: 16px;
    align-items: center;
`;

export const TwoFieldsRow = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
`;

export const StyledTextField = styled(TextField)`
    .dsb_input-helper-text-block-wrapper {
        padding-bottom: 0;
    }
`;
