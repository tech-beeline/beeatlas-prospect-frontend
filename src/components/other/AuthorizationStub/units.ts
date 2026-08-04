import styled from '@emotion/styled';

import { Progress } from 'components/ui/Progress';

export const PageWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    height: 100vh;
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;

    width: 260px;
`;

export const ProgressStyled = styled(Progress)`
    width: 100%;
`;
