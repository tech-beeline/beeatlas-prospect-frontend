import styled from '@emotion/styled';

export const BANNER_HEIGHT = 84;

export const SURVEY_URL = 'https://app.pthwy.ru/IMzxG ';

export const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 101;

    display: flex;
    justify-content: space-between;
    gap: 24px;

    width: 100%;
    height: ${BANNER_HEIGHT}px;
    padding: 18px 24px;

    background-color: var(--color-background-brand);
    color: var(--color-text-active);
`;

export const TextContent = styled.p`
    margin: 0;

    font-size: var(--font-size-body2);
    line-height: var(--font-line-height-body2);
`;

export const Link = styled.a`
    color: var(--color-text-link);
    text-decoration: underline;

    &:hover {
        color: var(--color-text-link-hover);
    }
`;
