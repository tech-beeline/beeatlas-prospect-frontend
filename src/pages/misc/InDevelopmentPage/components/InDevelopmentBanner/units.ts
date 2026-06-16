import styled from '@emotion/styled';

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    width: 100%;
`;

export const Image = styled.img`
    min-width: 500px;
    min-height: 500px;
    max-width: 500px;
    max-height: 500px;
`;

export const Text = styled.h5`
    font-weight: var(--font-weight-h5);
    font-size: var(--font-size-h5);
    line-height: var(--font-line-height-h5);

    margin-top: 32px;
    margin-bottom: 24px;
`;
