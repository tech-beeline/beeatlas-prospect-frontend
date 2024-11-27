import styled from '@emotion/styled';

export const Wrapper = styled.div`
    width: 715px;
    padding: 24px;

    border: 1px solid var(--color-divider);
    border-radius: var(--size-border-radius-x6);

    /* overflow: hidden; */
`;

export const Title = styled.div`
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-body2);
    line-height: var(--font-line-height-body2);
    letter-spacing: var(--font-letter-spacing-body3);

    color: var(--color-text-link);

    cursor: pointer;
`;

export const Text = styled(Title)`
    font-weight: var(--font-weight-regular);
    white-space: pre-wrap;

    color: var(--color-text-active);

    cursor: inherit;

    overflow: hidden;
`;

export const TitleSecond = styled.p`
    font-weight: var(--font-weight-regular);
    font-size: var(--font-size-body3);
    line-height: var(--font-line-height-body3);
    letter-spacing: var(--font-letter-spacing-body3);

    color: var(--color-text-inactive);
`;

export const DomenText = styled(Title)`
    font-weight: var(--font-weight-regular);
`;

export const FlexBlock = styled.div`
    margin-top: 24px;

    display: flex;
    justify-content: space-between;
    align-items: center;
`;
