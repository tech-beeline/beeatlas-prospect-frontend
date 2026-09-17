import styled from '@emotion/styled';

import { Card } from 'components/ui';

export const List = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const CardStyled = styled(Card)`
    &.dsb_card {
        display: flex;
        flex-direction: column;
        gap: 24px;
        padding: 24px;
    }
`;

export const Question = styled.div`
    display: flex;
    flex-direction: column;
`;
