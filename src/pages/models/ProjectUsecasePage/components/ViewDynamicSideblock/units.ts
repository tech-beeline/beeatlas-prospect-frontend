import styled from '@emotion/styled';

import { IconButton } from 'components/ui';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    max-height: 100vh;
    padding: 24px;
    overflow-y: auto;
`;

export const Header = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
`;

export const Title = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

export const CodeContainer = styled.div`
    position: relative;
    min-height: 480px;
    padding: 16px;
    border-radius: 12px;
    background-color: var(--color-control-background);
`;

export const CopyButton = styled(IconButton)`
    position: absolute;
    top: 16px;
    right: 16px;
`;

export const Code = styled.pre`
    margin: 0;
    padding-right: 36px;
    overflow-x: auto;
    white-space: pre-wrap;
    overflow-wrap: anywhere;

    font-size: var(--font-size-body2);
    line-height: var(--font-line-height-body2);
`;
