import styled from '@emotion/styled';

export const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const BannerContainer = styled.div`
    margin: 24px 0px;
`;

export const FlexContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const LinkSpan = styled.span`
    color: var(--color-text-link);

    cursor: pointer;

    :hover {
        text-decoration: underline;
    }
`;
