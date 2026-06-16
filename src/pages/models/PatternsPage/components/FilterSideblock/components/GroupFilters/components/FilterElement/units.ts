import styled from '@emotion/styled';

export const Container = styled.div<{ level: number }>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;

    border-radius: var(--size-border-radius-x6);

    padding: 12px 16px;

    padding-left: ${({ level }) => level * 20 + 16 + 'px'};

    & div:nth-child(2) {
        display: none;
    }

    &:hover {
        background-color: var(--color-background-base-hover);

        & div:nth-child(2) {
            display: flex;
        }
    }
`;

export const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
`;

export const IconButtonContainer = styled.div`
    width: 20px;
    height: 20px;
`;

export const ActionsContainer = styled.div`
    display: flex;
    gap: 8px;
`;
