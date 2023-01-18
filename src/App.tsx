import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { DropdownContext } from '@beeline/lk-ui';
import { theme } from '@beeline/lk-ui/core/theme';
import { ThemeProvider } from '@emotion/react';

import { ErrorBoundary } from 'components/core';

import { NavigationRouter } from 'router';
import { StoreProvider } from 'stores/initStore';
import { GlobalStyles } from 'styles';

import '@beeline/design-tokens/css/tokens/globals/fonts.css';
import '@beeline/lk-ui/core/css/index.css';
import '@beeline/lk-ui/core/css/themes/light.css';
import '@beeline/lk-ui/core/css/themes/dark.css';
import '@beeline/lk-ui/core/css/font-face.css';
import '@beeline/lk-ui/core/css/iconfont.css';
import '@beeline/lk-ui/core/css/globals.css';

const App = () => {
    return (
        <>
            <StoreProvider>
                <ErrorBoundary>
                    <ThemeProvider theme={theme}>
                        {/* <PopupsContext.Provider> */}
                        <DropdownContext.Provider
                            value={{
                                applicationRootElementID: 'test',
                                dropdownElementID: 'lk-ui__dropdown-root',
                            }}
                        >
                            <Router>
                                <NavigationRouter />
                            </Router>
                        </DropdownContext.Provider>
                        {/* </PopupsContext.Provider> */}
                    </ThemeProvider>
                </ErrorBoundary>
            </StoreProvider>

            <GlobalStyles />
        </>
    );
};

export default App;
