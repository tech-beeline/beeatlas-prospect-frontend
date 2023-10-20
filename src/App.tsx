import React from 'react';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter as Router } from 'react-router-dom';
import { DropdownContext } from '@beeline/design-system-react';
import { useAuth } from 'features/auth';

import { ErrorBoundary } from 'components/core';

import { queryClient } from 'api/queries';
import { NavigationRouter } from 'router';
import { StoreProvider } from 'stores/initStore';
import { GlobalStyles, Theme, THEME_ELEMENT_ID } from 'styles';
import { Snackbar } from 'widgets/Snackbar';

import '@beeline/design-tokens/css/tokens/globals/index.css';
import '@beeline/design-tokens/css/tokens/themes/light.css';
import '@beeline/design-tokens/css/tokens/themes/dark.css';
import '@beeline/design-tokens/css/iconfont/iconfont.css';
import '@beeline/design-tokens/css/font-face.css';

const App = () => {
    useAuth();

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <StoreProvider>
                    <Theme>
                        <ErrorBoundary>
                            <DropdownContext.Provider
                                value={{
                                    applicationRootElementID: THEME_ELEMENT_ID,
                                    dropdownElementID: 'dsb__positioner',
                                }}
                            >
                                <Router>
                                    <NavigationRouter />
                                </Router>
                            </DropdownContext.Provider>
                        </ErrorBoundary>
                    </Theme>
                </StoreProvider>
                <Snackbar />
                <GlobalStyles />
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </>
    );
};

export default App;
