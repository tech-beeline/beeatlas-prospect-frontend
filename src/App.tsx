import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { DropdownContext } from '@beeline/design-system-react';

import { ErrorBoundary } from 'components/core';

import { NavigationRouter } from 'router';
import { StoreProvider } from 'stores/initStore';
import { GlobalStyles } from 'styles';

import '@beeline/design-tokens/css/tokens/globals/index.css';
import '@beeline/design-tokens/css/tokens/themes/light.css';
import '@beeline/design-tokens/css/tokens/themes/dark.css';
import '@beeline/design-tokens/css/iconfont/iconfont.css';
import '@beeline/design-tokens/css/font-face.css';

const App = () => {
    return (
        <>
            <StoreProvider>
                <ErrorBoundary>
                    <DropdownContext.Provider
                        value={{
                            applicationRootElementID: 'theme-class',
                            dropdownElementID: 'dsb__positioner',
                        }}
                    >
                        <Router>
                            <NavigationRouter />
                        </Router>
                    </DropdownContext.Provider>
                </ErrorBoundary>
            </StoreProvider>

            <GlobalStyles />
        </>
    );
};

export default App;
