import React from 'react';
import { css, Global } from '@emotion/react';

// TODO: вероятно вынести шрифты отдельно

export const GlobalStyles = () => {
    return (
        <Global
            styles={css`
                @font-face {
                    font-family: 'Beeline';
                    src: url('/public/fonts/Beeline_Sans-Regular.woff2') format('woff2');
                    font-weight: 400;
                }
                @font-face {
                    font-family: 'Beeline';
                    src: url('/public/fonts/Beeline_Sans-Medium.woff2') format('woff2');
                    font-weight: 500;
                }
                @font-face {
                    font-family: 'Beeline';
                    src: url('/public/fonts/Beeline_Sans-Bold.woff2') format('woff2');
                    font-weight: 700;
                }
                @font-face {
                    font-family: 'Beeline';
                    src: url('/public/fonts/Beeline_Sans-Black.woff2') format('woff2');
                    font-weight: 800;
                }

                *,
                *::before,
                *::after {
                    box-sizing: border-box;
                    -webkit-font-smoothing: antialiased;
                    -webkit-tap-highlight-color: transparent;
                }

                html,
                body,
                #root {
                    height: 100%;
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
                }

                body {
                    margin: 0;
                    background-color: #ffffff;
                    color: #212121;
                    font-family: 'Beeline', sans-serif;
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
                    transition: all 0.2s ease-in-out;
                    user-select: none;
                    border-radius: 12px;
                    font-size: 17px;
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
            `}
        />
    );
};
