import styled from '@emotion/styled';

import { Search } from 'components/ui';

export const FlexContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;

    height: 48px;

    margin: 24px 0px;
`;

export const SelectContainer = styled.div`
    flex: 1;
`;

export const SearchStyled = styled(Search)`
    max-width: 520px;

    margin-top: 24px;
    margin-bottom: 24px;
`;
