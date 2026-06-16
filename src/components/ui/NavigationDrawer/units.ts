import styled from '@emotion/styled';

export const Backdrop = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.48);
`;

export const DrawerRoot = styled.div`
    width: 56px;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    transition: width 250ms ease-in-out;
    background-color: var(--color-background-base);

    &.dsb-navigation-drawer--expanded {
        width: 256px;
    }

    &.dsb-navigation-drawer-mobile {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 0;

        &.dsb-navigation-drawer--expanded {
            width: 312px;
        }
    }

    .dsb_typography__nativeLink:hover {
        text-decoration: none;
    }
`;

export const DrawerContainer = styled.nav`
    display: flex;
    flex-direction: column;
    padding-top: 24px;
    height: 100%;

    .trigger-button {
        padding-bottom: 24px;
        padding-left: 16px;
        transition: padding-left 0.25s ease-in-out;
    }

    .list {
        display: flex;
        flex: 1;
        flex-direction: column;
        width: 100%;
        padding-right: 0;
        overflow: hidden;
    }

    .list__wrapper {
        display: flex;
        flex-direction: column;
        gap: 4px;
        padding-bottom: 24px;
    }

    .list__wrapper-title {
        padding: 0;
        height: 0;
        overflow: hidden;
        transition: all 150ms ease-in-out;
    }

    .list__wrapper-item {
        display: flex;
        align-items: center;
        position: relative;
        padding: 12px 16px;
        column-gap: 16px;
        cursor: pointer;
        border: none;
        border-top-right-radius: 12px;
        border-bottom-right-radius: 12px;
        background-color: transparent;
        height: 48px;
        min-height: 48px;
        box-sizing: border-box;
        transition-property: all;
        transition-duration: 150ms;
        transition-timing-function: ease-in-out;

        &:hover {
            background-color: var(--color-background-base-hover);
        }

        &:hover:active {
            border-color: var(--color-border-focus);
            background-color: var(--color-background-base-pressed);
        }

        &:disabled {
            cursor: auto;
            opacity: 0.48;
            user-select: none;

            &:hover {
                border-color: transparent;
                background-color: transparent;
            }
        }

        &.list__wrapper-item--child {
            border-radius: 12px;

            &.list__wrapper-item--active {
                .indicator {
                    display: none;
                }

                .icon,
                .typography,
                &:hover .icon,
                &:hover .typography,
                &:active .icon,
                &:active .typography {
                    color: var(--color-text-inactive);
                }
            }
        }

        .icon {
            color: var(--color-text-inactive);
            transition: color 150ms ease-in-out;
        }

        .expand-icon {
            color: var(--color-text-inactive);
            opacity: 0;
            transition: opacity 200ms ease-out, transform 150ms ease-in-out, color 150ms ease-in-out;
            margin-left: auto;

            &.expand-icon--expanded {
                transform: rotate(180deg);
            }
        }

        .typography {
            color: var(--color-text-inactive);
            transition: color 150ms ease-in-out;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            line-height: 1.2;
            max-height: 2.4em;
            width: 100%;
            min-width: 0;
        }

        &.list__wrapper-item--active:not(.list__wrapper-item--child) {
            .indicator {
                height: 48px;
                border-top-right-radius: 3px;
                border-bottom-right-radius: 3px;
                border-left: 4px solid #fdd835;
                position: absolute;
                left: 0;
            }

            .icon,
            .expand-icon {
                color: var(--color-text-active);
            }

            .typography {
                color: var(--color-text-active);
                font-weight: 500;
            }
        }
    }

    .list__wrapper-item-text {
        transition: opacity 200ms ease-out, transform 250ms ease-out;
        transform: translateX(50px);
        opacity: 0;
        max-width: 100%;
        text-align: left;
        display: flex;
        flex: 1;
        min-width: 0;
        will-change: transform, opacity;
        contain: layout paint;
    }

    .list__wrapper-children {
        display: flex;
        flex-direction: column;
        width: 100%;
        overflow: hidden;
        transition: max-height 300ms ease-in-out, opacity 200ms ease-in-out;
        max-height: 1000px;
        opacity: 1;

        &.list__wrapper-children--collapsed {
            max-height: 0;
            opacity: 0;
        }
    }

    .list__divider {
        width: 100%;
        padding: 20px 16px;
        box-sizing: border-box;
    }

    .list-top {
        flex-direction: column;
        flex: 1 1 auto;
    }

    .list-bottom {
        flex-direction: column;
        flex: 0 0 auto;
    }

    .dsb-navigation-drawer--expanded & {
        .trigger-button {
            padding-left: 32px;
        }

        .list {
            padding-right: 16px;
        }

        .list__wrapper {
            box-sizing: border-box;
            align-items: start;
        }

        .list__wrapper-title {
            box-sizing: content-box;
            width: 100%;
            display: flex;
            align-items: center;
            white-space: nowrap;
            height: 16px;
            padding: 12px 32px;
        }

        .list__wrapper-item {
            width: 240px;
            box-sizing: border-box;
            padding-left: 32px;
            padding-right: 16px;

            &.list__wrapper-item--child {
                border-radius: 12px;
                margin-left: 16px;
                padding-left: 56px;
                width: calc(100% - 16px);

                &.list__wrapper-item--active {
                    background-color: var(--color-background-base-hover);

                    .indicator {
                        display: none;
                    }

                    .icon,
                    .typography,
                    &:hover .icon,
                    &:hover .typography {
                        color: var(--color-text-active);
                        font-weight: 500;
                    }
                }
            }

            .expand-icon {
                opacity: 1;
            }
        }

        .list__wrapper-item-text {
            transform: translateX(0);
            opacity: 1;
            width: 100%;
        }
    }
`;

export const ListContent = styled.div``;

export const ListTop = styled.div``;

export const ListBottom = styled.div``;

export const TriggerButton = styled.div``;

export const NavigationItemSkeletonRoot = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 32px;
    height: 48px;
    box-sizing: border-box;
    width: 100%;

    .navigation-item-skeleton__icon {
        flex-shrink: 0;
    }

    .navigation-item-skeleton__text {
        flex: 1;
        min-width: 0;
    }

    &.navigation-item-skeleton--child {
        margin-left: 16px;
        padding-left: 16px;
        width: calc(100% - 16px);
    }

    .dsb-navigation-drawer:not(.dsb-navigation-drawer--expanded) & {
        padding-left: 16px;
        padding-right: 16px;
    }
`;

export const fadeInKeyframes = `
    @keyframes navigationItemFadeInUp {
        from {
            opacity: 0;
            transform: translateY(8px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

export const GlobalNavigationDrawerStyles = styled.div`
    ${fadeInKeyframes}

    .navigation-item-fade-in {
        animation: navigationItemFadeInUp 0.3s ease-out forwards;
    }
`;
