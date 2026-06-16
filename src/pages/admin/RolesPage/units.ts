import styled from '@emotion/styled';

export const PageWrapper = styled.div`
    padding: 0px 54px 54px;

    background-color: var(--color-background-base);
    color: var(--color-text-active);

    overflow-y: scroll;
`;

export const TitleFlex = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const RolesContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;

    width: 100%;
    padding: 8px 0;

    overflow-y: scroll;
`;

export const Role = styled.div`
    display: flex;

    width: 100%;
    max-width: 340px;
    min-width: 300px;
    height: 76px;

    padding: 24px;

    font-weight: var(--font-weight-bold);
    font-size: var(--font-size-h5);
    line-height: var(--font-line-height-h5);

    border: 1px solid;
    border-color: var(--color-divider);
    border-radius: var(--size-border-radius-x6);

    transition: all 0.25s ease-in-out;

    cursor: pointer;

    & > p {
        max-width: 100%;

        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    & > span {
        font-size: 24px;

        padding-top: 2px;

        opacity: 0;

        transition: all 0.25s ease-out;
    }

    &:hover {
        color: #1a73e8;

        border-radius: var(--size-border-radius-x12);
    }

    &:hover > span {
        transform: translateX(18px);

        opacity: 1;
    }

    &:hover > * {
        color: var(--color-text-link);
    }
`;
