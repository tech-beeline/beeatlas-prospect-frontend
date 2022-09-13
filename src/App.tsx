import React, { useState } from 'react';
// import { dark, light } from '@beeline/lk-ui';
import { theme } from '@beeline/lk-ui/core/theme';
import { ThemeProvider } from '@emotion/react';

// import styled from '@emotion/styled';
import { ErrorBoundary } from 'components/core';

import { NavigationRouter } from 'router';
import { StoreProvider } from 'stores/initStore';
import { GlobalStyles } from 'styles';

// import '@beeline/lk-ui/core/css/font-face.css';
// import '@beeline/lk-ui/core/css/iconfont.css';
// import '@beeline/lk-ui/core/css/index.css';
import '@beeline/design-tokens/css/tokens/globals/fonts.css';
import '@beeline/lk-ui/core/css/index.css';
import '@beeline/lk-ui/core/css/themes/light.css';
import '@beeline/lk-ui/core/css/themes/dark.css';
import '@beeline/lk-ui/core/css/font-face.css';
import '@beeline/lk-ui/core/css/iconfont.css';
import '@beeline/lk-ui/core/css/globals.css';

// const LightTheme = styled.div`
//     :root {
//         ${light};
//     }

//     .inverseTheme {
//         ${dark[':root']};
//     }
// `;

// const Theme = styled.div`
//     &.light {
//         :root {
//             ${light};
//         }

//         .inverseTheme {
//             ${dark[':root']};
//         }
//     }

//     &.dark {
//         :root {
//             ${dark};
//         }

//         .inverseTheme {
//             ${light[':root']};
//         }
//     }
// `;

const App = () => {
    const [themeValue, setTheme] = useState('light');

    // console.log(setTheme);

    // const l = document.querySelector('.lightTheme')?.style.height;

    // console.log(l);

    const handleTheme = () => {
        if (themeValue === 'light') {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    };

    return (
        <>
            <StoreProvider>
                <ErrorBoundary>
                    <ThemeProvider theme={theme}>
                        {/* {themeValue === light ? <LightTheme /> : <DarkTheme />} */}

                        <div className={themeValue === 'light' ? 'lightTheme' : 'darkTheme'}>
                            <button onClick={handleTheme}>test</button>

                            <NavigationRouter />
                        </div>
                    </ThemeProvider>
                </ErrorBoundary>
            </StoreProvider>

            <GlobalStyles />
        </>
    );
};

export default App;
