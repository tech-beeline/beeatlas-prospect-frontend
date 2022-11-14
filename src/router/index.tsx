import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';

import { Header, Menu } from 'components/core';

import {
    AppInfoPage,
    ArchCommPage,
    CalendarPage,
    ConsultationPage,
    DataBasePage,
    FDMPage,
    FDMResultPage,
    HowToPage,
    MainPage,
    ServicesPage,
    TemplatesPage,
} from 'pages';
import { Theme, theme } from 'styles';

import * as C from './const';
import { RouteAdapter } from './utils';

export const NavigationRouter = () => {
    return (
        <Theme>
            <Router>
                <Header />

                <QueryParamProvider ReactRouterRoute={RouteAdapter}>
                    <Routes>
                        <Route path={C.MAIN_PAGE_PATH} element={<MainPage />} />

                        <Route path={C.APP_INFO_PAGE_PATH} element={<AppInfoPage />} />

                        <Route path={C.FDM_PATH} element={<FDMPage />} />
                        <Route
                            path={`${C.FDM_PATH}${C.FDM_RESULT_ID_PATH}`}
                            element={<FDMResultPage />}
                        />

                        <Route
                            path={C.DATA_BASE_PATH}
                            element={
                                <div
                                    style={{
                                        paddingLeft: '256px',
                                        backgroundColor: theme.colors.backgroundLow,
                                    }}
                                >
                                    <Menu />
                                    <DataBasePage />
                                </div>
                            }
                        />
                        <Route
                            path={`${C.DATA_BASE_PATH}${C.ARCH_COMM_PATH}`}
                            element={
                                <div
                                    style={{
                                        paddingLeft: '256px',
                                        backgroundColor: theme.colors.backgroundLow,
                                    }}
                                >
                                    <Menu />
                                    <ArchCommPage />
                                </div>
                            }
                        />
                        <Route
                            path={`${C.DATA_BASE_PATH}${C.ARCH_COMM_PATH}${C.ARCH_HOW_TO_PATH}`}
                            element={
                                <div
                                    style={{
                                        paddingLeft: '256px',
                                        backgroundColor: theme.colors.backgroundLow,
                                    }}
                                >
                                    <Menu />
                                    <HowToPage />
                                </div>
                            }
                        />
                        <Route
                            path={`${C.DATA_BASE_PATH}${C.ARCH_COMM_PATH}${C.ARCH_CALENDAR_PATH}`}
                            element={
                                <div
                                    style={{
                                        paddingLeft: '256px',
                                        backgroundColor: theme.colors.backgroundLow,
                                    }}
                                >
                                    <Menu />
                                    <CalendarPage />
                                </div>
                            }
                        />
                        <Route
                            path={`${C.DATA_BASE_PATH}${C.ARCH_COMM_PATH}${C.ARCH_TEMPLATES_PATH}`}
                            element={
                                <div
                                    style={{
                                        paddingLeft: '256px',
                                        backgroundColor: theme.colors.backgroundLow,
                                    }}
                                >
                                    <Menu />
                                    <TemplatesPage />
                                </div>
                            }
                        />

                        <Route
                            path={`${C.DATA_BASE_PATH}${C.SERVICES_PATH}`}
                            element={
                                <div
                                    style={{
                                        paddingLeft: '256px',
                                        backgroundColor: theme.colors.backgroundLow,
                                    }}
                                >
                                    <Menu />
                                    <ServicesPage />
                                </div>
                            }
                        />
                        <Route
                            path={`${C.DATA_BASE_PATH}${C.SERVICES_PATH}${C.CONSULTATION_PATH}`}
                            element={<ConsultationPage />}
                        />
                    </Routes>
                </QueryParamProvider>
            </Router>
        </Theme>
    );
};
