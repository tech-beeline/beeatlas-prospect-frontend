import styled from '@emotion/styled';

export const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: var(--app-height);
    overflow: hidden;
    color: var(--color-text-active);
    background-color: var(--color-background-base);
`;

export const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    height: 64px;
    padding: 12px 24px;

    border-bottom: 1px solid var(--color-divider);
`;

export const FlexSideContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`;

export const Name = styled.div`
    width: max-content;
    max-width: 500px;
    height: var(--font-line-height-body2);

    font-weight: var(--font-weight-regular);
    font-size: var(--font-size-body2);
    line-height: var(--font-line-height-body2);

    color: var(--color-text-active);

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

export const Desription = styled.div`
    width: max-content;

    height: var(--font-line-height-body2);

    font-weight: var(--font-weight-regular);
    font-size: var(--font-size-body3);
    line-height: var(--font-line-height-body3);

    color: var(--color-text-inactive);

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

export const SelectWrapper = styled.div`
    height: 40px;
    width: 360px;
`;

export const Content = styled.div`
    flex: 1 1 auto;
    position: relative;
    height: 100%;
    width: 100%;
    & > div {
        width: 100% !important;
        height: 100% !important;
    }

    & .bjs-breadcrumbs {
        position: absolute;
        top: 5px;
        left: 10px;
        list-style-type: none;
        display: flex;
        gap: 24px;
        border-radius: 12px;
        font-size: var(--font-size-body3);
        padding: 0;

        > li {
            padding: 12px;
            color: var(--color-button-plain);

            &:not(:last-child) {
                cursor: pointer;
            }
        }

        > li {
            &:last-child {
                color: var(--color-text-inactive);
            }
        }
    }
`;

export const FileMetadataContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    max-width: 358px;
    width: 100%;
`;

export const FileNameWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

export const NameContainer = styled.div`
    max-width: 700px;

    overflow: hidden;
`;
