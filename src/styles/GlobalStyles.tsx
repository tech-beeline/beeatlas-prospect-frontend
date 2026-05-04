import React from 'react';
import { css, Global } from '@emotion/react';

export const GlobalStyles = () => {
    return (
        <Global
            styles={css`
                *,
                *::before,
                *::after {
                    box-sizing: border-box;
                    -webkit-font-smoothing: antialiased;
                    -webkit-tap-highlight-color: transparent;
                    /* transition: all 0.25s ease-out; */
                }

                html,
                body,
                #root {
                    height: 100%;
                    /* background-color: var(--color-background-base); */
                }

                body,
                input,
                textarea,
                select,
                button {
                    font-synthesis: none;
                    -moz-font-feature-settings: 'kern';
                    -webkit-font-smoothing: antialiased;
                    -moz-osx-font-smoothing: grayscale;
                    text-rendering: optimizeSpeed;

                    transition: all 0.25s ease-out !important;
                }

                body {
                    margin: 0;
                    background-color: var(--color-background-base);
                    color: #212121;
                    font-family: 'Beeline Sans', sans-serif;
                    overflow-wrap: break-word;

                    * {
                        ::-webkit-scrollbar-thumb {
                            background-color: var(--color-utilities-scroll-hover);

                            border-radius: var(--size-border-radius-x8);
                        }

                        ::-webkit-scrollbar {
                            width: 8px;
                            height: 8px;
                        }
                    }
                }

                h1,
                h2,
                h3,
                h4,
                h5,
                h6,
                p {
                    margin: 0;
                }

                ol,
                ul,
                dl {
                    margin-top: 0;
                    margin-bottom: 0;
                }

                input,
                button,
                select,
                optgroup,
                textarea {
                    font-family: inherit;
                    font-size: inherit;
                    line-height: inherit;
                }

                pre {
                    margin: 0;
                    font-family: inherit;
                }

                label {
                    display: inline-block;
                }

                select {
                    word-wrap: normal;
                }

                img {
                    max-width: 100%;
                }

                input[type='radio'],
                input[type='checkbox'] {
                    padding: 0;
                }

                input[type='date'],
                input[type='time'],
                input[type='datetime-local'],
                input[type='month'] {
                    -webkit-appearance: listbox;
                }
                a.button {
                    height: 48px;
                    max-width: fit-content;
                    padding: 13px 20px;
                    background-color: #fdd835;
                    font-weight: 500;
                    white-space: nowrap;
                    transition: all 0.25s ease-out;
                    user-select: none;
                    border-radius: var(--size-border-radius-x6);
                    font-size: var(--font-size-body2);
                    line-height: 21px;
                    text-decoration: none;
                    color: #212121;
                }
                button {
                    border: none;
                    background: transparent;

                    margin: 0px;

                    /* inherit font & color from ancestor */
                    color: inherit;
                    font: inherit;

                    /* Normalize line-height. Cannot be changed from normal in Firefox 4+. */
                    line-height: normal;

                    /* Corrects font smoothing for webkit */
                    -webkit-font-smoothing: inherit;
                    -moz-osx-font-smoothing: inherit;

                    /* Corrects inability to style clickable input types in iOS */
                    -webkit-appearance: none;
                }

                button:focus,
                input:focus {
                    outline: none;
                }

                button:not(:disabled),
                [type='button']:not(:disabled),
                [type='reset']:not(:disabled),
                [type='submit']:not(:disabled) {
                    cursor: pointer;
                }

                button::-moz-focus-inner,
                [type='button']::-moz-focus-inner,
                [type='reset']::-moz-focus-inner,
                [type='submit']::-moz-focus-inner {
                    padding: 0;
                    border-style: none;
                }

                [contenteditable] {
                    outline: none;
                }

                a {
                    all: unset;
                }

                div[data-floating-ui-portal] {
                    z-index: 104;
                    position: relative;
                }

                /* @TODO: Убрать с обновлением UI-кита */
                .dsb_inline-edit-modal_positioner > .dsb_card {
                    padding: 8px;
                }

                /* @TODO: Убрать с обновлением UI-кита */
                .dsb_table {
                    border-radius: var(--size-border-radius-x6);
                }

                /* @TODO: Убрать с обновлением UI-кита */
                .dsb_pagination-cell__text-active {
                    background-color: #fdd835;
                    border-color: #fdd835;
                    color: rgba(9, 11, 22, 0.94);
                }
                .dsb_pagination-cell__text-active:hover:not(:disabled),
                .dsb_pagination-cell__text-active:active {
                    background-color: #fdd835;
                    border-color: #fdd835;
                }
                .dsb_pagination-cell__text-active:focus-visible {
                    background-color: #fdd835;
                }

                /* Для постоянного отображения скроллбара на MacOS */
                &.dsb__select__options {
                    overflow-y: auto;

                    &::-webkit-scrollbar-thumb {
                        background-color: var(--color-utilities-scroll-hover);

                        border-radius: var(--size-border-radius-x8);
                    }

                    &::-webkit-scrollbar {
                        width: 8px;
                        height: 8px;
                    }
                }

                /* @TODO: Неправильный цвет активного чипса в тёмной теме, убрать с новой версией UI-кита */
                .dsb_chip--active {
                    & > div > p {
                        color: rgba(9, 11, 22, 0.94);
                    }
                }
            `}
        />
    );
};
