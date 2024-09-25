import { Tooltip } from 'react-tooltip';
import { Button } from '@beeline/design-system-react';
import styled from '@emotion/styled';

export const PageWrapper = styled.div`
    height: 100vh;

    background-color: var(--color-background-base);
`;

export const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    height: 64px;
    padding: 20px 24px;

    border-bottom: 1px solid var(--color-divider);
`;

export const FlexSideContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`;

export const Name = styled.div`
    max-width: 500px;
    height: var(--font-line-height-body2);

    font-weight: var(--font-weight-regular);
    font-size: var(--font-size-body2);
    line-height: var(--font-line-height-body2);

    color: var(--color-text-active);

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

export const Desription = styled.div`
    max-width: 500px;
    height: var(--font-line-height-body2);

    font-weight: var(--font-weight-regular);
    font-size: var(--font-size-body3);
    line-height: var(--font-line-height-body3);

    color: var(--color-text-inactive);

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

export const IconWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 40px;
    height: 40px;

    border: 1px solid var(--color-divider);
    border-radius: var(--size-border-radius-x6);

    cursor: pointer;
`;

export const FlexWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const SideBlockTitle = styled.div`
    color: var(--color-text-active);

    font-weight: var(--font-weight-bold);
    font-size: var(--font-size-h5);
    line-height: var(--font-line-height-h5);
`;

export const TextFieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 32px;

    width: 100%;
    padding-top: 24px;
`;

export const ButtonContainer = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;

    display: flex;
    justify-content: flex-end;
    gap: 10px;

    width: 100%;
    height: 96px;
    padding: 24px 16px;
`;

export const ButtonStyled = styled(Button)`
    pointer-events: auto !important;
`;

export const NotFoundContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    height: calc(100vh - 64px);

    padding-bottom: 100px;
`;

export const TooltipContainer = styled(Tooltip)`
    max-width: 300px;
    width: max-content;
    padding: 16px;

    background-color: var(--color-background-inverse);
    color: var(--color-text-active-inverse);

    border-radius: var(--size-border-radius-x8);

    font-weight: var(--font-weight-regular);
    font-size: var(--font-size-caption);
    line-height: var(--font-line-height-caption);
    text-align: start;
    white-space: pre-line;

    user-select: none;

    z-index: 30;
`;
