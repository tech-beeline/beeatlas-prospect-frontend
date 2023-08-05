import styled from '@emotion/styled';

import { theme } from 'styles';

//  Подходит для страницы аутентификации. Вероятно на других нужно будет сделать иначе
export const PageWrapper = styled.div`
    /* display: flex;
    align-items: center;
    flex-direction: column; */

    padding: 0 96px 60px 96px;
    height: 100%;

    background-color: var(--color-background-base);
    color: ${theme.colors.textActive};
`;
