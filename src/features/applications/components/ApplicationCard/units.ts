import styled from '@emotion/styled';

import { Icon } from 'components/ui';

export const Container = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 16px;

    padding: 24px 24px;

    border-radius: 12px;
    border: 1px solid var(--color-divider);

    transition: all 0.25s ease-out;

    &:hover {
        box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.08), 0px 2px 8px 0px rgba(0, 0, 0, 0.08);
    }
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const TitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

export const DatesContainer = styled.div`
    display: flex;
    gap: 32px;
`;

export const Metadata = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 24px;
`;

export const NumberContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
`;

export const LinkContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;

    cursor: pointer;
`;

export const IconStyled = styled(Icon)`
    color: var(--color-text-link);
`;

export const ButtonContainer = styled.div`
    margin-top: auto;
`;
