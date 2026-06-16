import styled from '@emotion/styled';

import { Rating } from 'components/ui';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    height: 100%;
`;

export const MainContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;

    padding: 20px 16px;
`;

export const FlexWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
`;

export const Footer = styled.div`
    padding: 16px;

    border-top: 1px solid var(--color-divider);
`;

export const RatingStyled = styled(Rating)`
    & > div > div > span {
        width: 48px !important;
        font-size: 48px !important;

        color: var(--color-background-brand-pressed);
    }
`;

export const TextAreaContainer = styled.div`
    width: 100%;
`;

export const NotFoundContainer = styled.div`
    margin-top: 100px;
`;
