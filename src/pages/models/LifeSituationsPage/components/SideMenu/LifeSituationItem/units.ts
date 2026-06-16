import styled from '@emotion/styled';

export const Container = styled.div<{ selected: boolean }>`
    box-sizing: border-box;

    display: flex;
    align-items: center;
    gap: 16px;

    min-height: 48px;
    padding: 6px 16px;

    cursor: pointer;

    background-color: ${({ selected }) =>
        selected ? 'var(--color-background-base-selected)' : 'var(--color-background-base)'};

    border-radius: var(--size-border-radius-x6);
`;

export const Title = styled.span`
    flex: 1;
`;

export const ChildContainer = styled.div<{ selected: boolean }>`
    box-sizing: border-box;

    display: flex;
    align-items: center;

    min-height: 48px;
    margin-left: 60px;
    padding: 6px 16px;

    cursor: pointer;

    border-radius: var(--size-border-radius-x6);

    background-color: ${({ selected }) =>
        selected ? 'var(--color-background-base-selected)' : 'var(--color-background-base)'};
`;

export const IconButtonContainer = styled.div`
    width: 20px;
    height: 20px;
`;
