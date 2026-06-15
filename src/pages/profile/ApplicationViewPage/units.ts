import styled from '@emotion/styled';

import { Icon } from 'components/ui';

export const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    height: 100vh;

    color: var(--color-text-active);
    background-color: var(--color-background-base);
`;

export const Header = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;

    width: 100%;
    height: 64px;
    padding: 20px 24px;

    border-bottom: 1px solid var(--color-divider);
`;

export const Content = styled.div`
    display: flex;
    justify-content: center;

    flex: 1;

    width: 100%;

    overflow-y: scroll;

    padding-bottom: 32px;

    &::-webkit-scrollbar-thumb {
        background-color: var(--color-utilities-scroll-hover);

        border-radius: var(--size-border-radius-x8);
    }

    &::-webkit-scrollbar {
        width: 8px;
    }
`;

export const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;

    padding: 32px 0px 0px;

    width: 100%;
    max-width: 910px;
`;

export const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`;

export const InfoContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: start;
`;

export const MetadataContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 32px;
`;

export const LinkContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 4px;

    align-self: flex-start;

    cursor: pointer;
`;

export const IconStyled = styled(Icon)`
    color: var(--color-text-link);
`;

export const CommentsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;

    padding: 24px;

    border: 1px solid var(--color-divider);
    border-radius: 12px;
`;

export const NoComments = styled.div`
    display: flex;
    justify-content: center;
`;

export const EmptyDiv = styled.div`
    min-height: 8px;
`;

export const Footer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 90px;
    padding: 0px 32px;

    border-top: 1px solid var(--color-divider);
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 16px;

    width: 100%;
    max-width: 910px;
`;
