import styled from '@emotion/styled';

import { Label } from 'components/ui';

export const FormStyled = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;

    flex: 1;
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 32px;

    flex: 1;

    width: 100%;
    max-width: 910px;
    padding: 32px 0px;
`;

export const RadioContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;

    padding: 12px 0px;

    margin-top: 12px;
`;

export const SelectGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
`;

export const SelectContainer = styled.div`
    flex: 1;
`;

export const FileContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const ImageContainer = styled.img`
    border-radius: var(--size-border-radius-x6);

    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.08), 0px 2px 8px 0px rgba(0, 0, 0, 0.08);
`;

export const FileListContainer = styled.div`
    width: fit-content;
`;

export const LabelWithoutBorder = styled(Label)`
    border: none;
    padding: 0;
`;
