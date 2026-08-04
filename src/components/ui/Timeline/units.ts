import { css } from '@emotion/react';
import styled from '@emotion/styled';

import type { AtomPosition, DirectionType, TimelineIconType } from './types';

const yellowActive = '#fdd835';
const neutralBackground = 'var(--color-status-neutral-background)';

const horizontalConnectorBase = css`
    content: '';
    display: block;
    position: absolute;
    height: 6px;
    top: 50%;
    transform: translateY(-50%);
`;

const verticalConnectorBase = css`
    content: '';
    display: block;
    position: absolute;
    width: 6px;
    left: 50%;
    transform: translateX(-50%);
`;

const atomContentHorizontalStyles = (
    $type: TimelineIconType,
    $position: AtomPosition,
    $collapsed?: boolean,
) => {
    const isCurrentOrError = $type === 'current' || $type === 'error';
    const isActive = $type === 'active';
    const isInactive = $type === 'inactive';
    const connectorColor = isActive ? yellowActive : neutralBackground;

    return css`
        &:after {
            ${horizontalConnectorBase}
            left: 12px;
            width: calc(100% - 12px);
            background-color: ${connectorColor};
        }

        &:before {
            ${horizontalConnectorBase}
            left: -2px;
            width: 4px;
            background-color: ${neutralBackground};
        }

        ${isCurrentOrError &&
        css`
            &:before {
                display: none;
            }

            ${$position === 'bottom' &&
            css`
                &:after {
                    display: none;
                }
            `}

            ${($position === 'top' || $position === 'middle') &&
            css`
                .dsb_icon,
                .beeline-icons {
                    transform: rotate(270deg);
                }

                &:after {
                    left: 28px;
                    background-color: ${neutralBackground};
                    width: calc(100% - 28px);
                }
            `}
        `}

        ${isActive &&
        css`
            &:after,
            &:before {
                background-color: ${yellowActive};
            }

            ${$position === 'top' &&
            css`
                &:before {
                    display: none;
                }
            `}

            ${($position === 'middle' || $position === 'bottom') &&
            css`
                margin-left: 2px;
            `}
        `}

        ${isInactive &&
        css`
            &:after,
            &:before {
                background-color: ${neutralBackground};
            }

            ${$position === 'top' &&
            css`
                &:before {
                    display: none;
                }
            `}

            ${($position === 'middle' || $position === 'bottom') &&
            css`
                margin-left: 2px;
            `}

            ${$position === 'bottom' &&
            css`
                &:after {
                    display: none;
                }
            `}
        `}

        ${$collapsed &&
        css`
            &:after {
                max-height: 0;
            }
        `}
    `;
};

const atomContentVerticalStyles = (
    $type: TimelineIconType,
    $position: AtomPosition,
    $collapsed?: boolean,
) => {
    const isCurrentOrError = $type === 'current' || $type === 'error';
    const isActive = $type === 'active';
    const isInactive = $type === 'inactive';
    const connectorColor = isActive ? yellowActive : neutralBackground;

    return css`
        &:after {
            ${verticalConnectorBase}
            top: 12px;
            background-color: ${connectorColor};
        }

        &:before {
            ${verticalConnectorBase}
            top: -2px;
            height: 4px;
            background-color: ${neutralBackground};
        }

        ${isActive &&
        css`
            &:after,
            &:before {
                background-color: ${yellowActive};
            }

            ${$position === 'top' &&
            css`
                &:after {
                    height: calc(100% - 12px);
                }

                &:before {
                    display: none;
                }
            `}

            ${$position === 'middle' &&
            css`
                margin-top: 2px;

                &:after {
                    height: calc(100% - 12px);
                }
            `}

            ${$position === 'bottom' &&
            css`
                margin-top: 2px;
            `}
        `}

        ${isInactive &&
        css`
            &:after,
            &:before {
                background-color: ${neutralBackground};
            }

            ${$position === 'top' &&
            css`
                &:after {
                    height: calc(100% - 12px);
                }

                &:before {
                    display: none;
                }
            `}

            ${$position === 'middle' &&
            css`
                margin-top: 2px;

                &:after {
                    top: 12px;
                    height: calc(100% - 12px);
                }
            `}

            ${$position === 'bottom' &&
            css`
                margin-top: 2px;
            `}
        `}

        ${isCurrentOrError &&
        ($position === 'top' || $position === 'middle') &&
        css`
            &:after {
                top: 28px;
                background-color: ${neutralBackground};
                height: calc(100% - 28px);
            }
        `}

        ${$collapsed &&
        isCurrentOrError &&
        ($position === 'top' || $position === 'middle') &&
        css`
            &:after {
                max-height: 0;
            }
        `}
    `;
};

export const TimelineRoot = styled.ol`
    min-width: 280px;
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
    list-style: none;
`;

export const Atom = styled.div<{ $direction: DirectionType }>`
    display: flex;
    justify-content: center;

    ${({ $direction }) =>
        $direction === 'horizontal'
            ? css`
                  min-width: 14px;
                  min-height: 28px;
                  max-height: 28px;
                  align-items: center;

                  &.dsb_atom__top,
                  &.dsb_atom__middle {
                      width: 100%;
                  }

                  &.dsb_atom__bottom {
                      width: auto;
                  }
              `
            : css`
                  min-width: 28px;
                  max-width: 28px;
              `}
`;

export const AtomContent = styled.div<{
    $type: TimelineIconType;
    $position: AtomPosition;
    $direction: DirectionType;
    $collapsed?: boolean;
}>`
    position: relative;
    width: inherit;

    ${({ $type }) =>
        $type === 'error' &&
        css`
            .dsb_icon,
            .beeline-icons {
                color: #ffffff;
            }
        `}

    ${({ $direction, $type, $position, $collapsed }) =>
        $direction === 'horizontal'
            ? atomContentHorizontalStyles($type, $position, $collapsed)
            : atomContentVerticalStyles($type, $position, $collapsed)}
`;

export const AtomIcon = styled.div<{ $type: TimelineIconType }>`
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;

    .beeline-icons {
        color: rgba(0, 0, 0, 0.87);
    }

    ${({ $type }) => {
        switch ($type) {
            case 'current':
                return css`
                    background-color: ${yellowActive};
                    min-width: 28px;
                    min-height: 28px;
                    width: 28px;
                    height: 28px;
                `;
            case 'error':
                return css`
                    background-color: var(--color-status-error);
                    min-width: 28px;
                    min-height: 28px;
                    width: 28px;
                    height: 28px;
                `;
            case 'active':
                return css`
                    background-color: ${yellowActive};
                    min-width: 14px;
                    min-height: 14px;
                    width: 14px;
                    height: 14px;
                `;
            default:
                return css`
                    background-color: ${neutralBackground};
                    min-width: 14px;
                    min-height: 14px;
                    width: 14px;
                    height: 14px;
                `;
        }
    }}
`;

export const HorizontalRoot = styled.li`
    display: flex;
    min-width: 480px;
    flex-direction: column;
    list-style: none;
`;

export const HorizontalBody = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 17px;
`;

export const HorizontalBodyTitle = styled.div`
    .dsb_timeline-body-title-name {
        text-transform: uppercase;
    }
`;

export const HorizontalBodyTitleStages = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: inherit;
    max-width: inherit;
    word-break: break-all;
`;

export const HorizontalAtomRow = styled.div`
    display: flex;
    flex-direction: row;
`;

export const HorizontalBottom = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 8px;
    margin-bottom: 12px;

    .dsb_timeline-bottom-text {
        color: var(--color-text-inactive);
    }

    .dsb_timeline-bottom-text__error {
        color: var(--color-status-error);
    }

    .dsb_timeline-bottom-count-page {
        width: max-content;
        margin-left: 4px;
        color: var(--color-text-inactive);
    }
`;

export const VerticalRoot = styled.div``;

export const VerticalItem = styled.li`
    display: flex;
    flex-direction: row;
    width: 100%;
    list-style: none;

    .dsb-timeline-body-title__inactive {
        color: var(--color-text-disabled);
    }

    .dsb-timeline-body-title-name {
        word-break: break-word;
    }

    .dsb-timeline-body-title-name__inactive {
        color: var(--color-text-disabled);
    }

    .dsb-timeline-body-title-signature {
        margin-left: 8px;
        white-space: nowrap;
    }

    .dsb-timeline-body-title-signature__inactive {
        color: var(--color-text-disabled);
    }

    .dsb-timeline-body-text {
        color: var(--color-text-inactive);
    }

    .dsb-timeline-body-text__error {
        color: var(--color-status-error);
    }

    .dsb-timeline-body-text__inactive {
        color: var(--color-text-disabled);
    }
`;

export const VerticalBody = styled.div`
    width: inherit;
    display: flex;
    flex-direction: column;
    margin-left: 12px;
    margin-bottom: 24px;
`;

export const VerticalBodyTitle = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 8px;
    width: inherit;
    max-width: inherit;
    word-break: break-all;
`;

export const VerticalBodyAction = styled.div`
    margin-top: 12px;
`;

export const CurrentStepRoot = styled.div`
    &:last-child ${VerticalBody} {
        margin-bottom: 0;
    }
`;

export const FutureStepRoot = styled.div`
    &:last-child ${VerticalBody} {
        margin-bottom: 0;
    }
`;

export const CollapseRoot = styled.div`
    display: flex;
    flex-direction: column;
`;

export const CollapseBody = styled.div`
    display: flex;
    flex-direction: row;
`;

export const CollapseBodyTitle = styled.div`
    display: flex;
    flex-direction: row;
    cursor: pointer;
    margin-bottom: 24px;
`;

export const CollapseBodyTitleText = styled.span<{ $collapsed?: boolean }>`
    margin-left: 10px;
    margin-right: 4px;
    color: var(--color-text-link);
`;

export const CollapseBodyTitleIcon = styled.span<{ $collapsed?: boolean }>`
    color: var(--color-text-link);

    ${({ $collapsed }) =>
        $collapsed &&
        css`
            transform: rotate(180deg);
        `}
`;

export const CollapseContent = styled.div<{ $collapsed?: boolean }>`
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-sizing: border-box;
    height: auto;

    ${({ $collapsed }) =>
        $collapsed &&
        css`
            visibility: hidden;
            height: 0;
        `}
`;
