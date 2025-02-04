import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';

import {
    Header,
    MenuCX,
    MenuDatabase,
    MenuModels,
    MenuPersonalArea,
    MenuProfile,
} from 'components/core';

import { useGetMyRolesQuery } from 'api/queries/profile';
import {
    AppInfoPage,
    AppsPage,
    ArchCommPage,
    BIAddPage,
    BILibraryPage,
    BIViewPage,
    CapabilitiesPage,
    CapabilityAddPage,
    CJLibraryPage,
    CJPage,
    ConsultationPage,
    CXPage,
    DataBasePage,
    FDMHistoryPage,
    FDMPage,
    HowToPage,
    ImportedDataPage,
    MainPage,
    MapAddPage,
    MapPage,
    ModelsPage,
    NotFoundPage,
    NotificationsPage,
    PackagePage,
    PersonalMapPage,
    RoleAddPage,
    RolesPage,
    SearchPage,
    ServicesPage,
    SubscriptionsPage,
    TechnologiesPage,
    TechnologyAddPage,
    TechPolicyPage,
    TechRadarPage,
    TemplatesPage,
    UsersPage,
} from 'pages';

import * as R from './const';
import * as S from './units';
import { RouteAdapter, withAdminRole } from './utils';

const PATHS_WITHOUT_HEADER = [
    `${R.CX_PATH}${R.CJ_PATH}${R.ADD_PATH}`,
    `${R.CX_PATH}${R.BI_PATH}${R.VIEW_PATH}`,
    `${R.CX_PATH}${R.BI_PATH}${R.ADD_PATH}`,
    `${R.MODELS_PATH}${R.MAP_PATH}${R.ADD_PATH}`,
];

export const NavigationRouter = () => {
    const { data: rolesData, isLoading } = useGetMyRolesQuery();

    const isAdmin =
        rolesData?.some((role) => role.alias === 'ADMINISTRATOR' && role.deleted === false) ??
        false;

    const location = useLocation();

    const isAdminPanel = location.pathname?.includes(R.ADMIN_PATH);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, [location]);

    return (
        <>
            {!PATHS_WITHOUT_HEADER.some((path) => location.pathname?.includes(path)) && (
                <Header isAdminPanel={isAdminPanel} isAdmin={isAdmin} />
            )}

            <QueryParamProvider ReactRouterRoute={RouteAdapter}>
                <Routes>
                    <Route
                        path={R.MAIN_PAGE_PATH}
                        element={
                            <S.RouteWithDrawer>
                                <S.ContentWrapper>
                                    <MainPage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        }
                    />

                    <Route path={R.APP_INFO_PAGE_PATH} element={<AppInfoPage />} />

                    {withAdminRole({
                        path: `${R.ADMIN_PATH}${R.USERS_PATH}`,
                        element: (
                            <S.RouteWithDrawer>
                                <MenuPersonalArea />
                                <S.ContentWrapper>
                                    <UsersPage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        ),
                        isAdmin,
                        isLoading,
                    })}

                    {withAdminRole({
                        path: `${R.ADMIN_PATH}${R.USERS_PATH}${R.ROLES_PATH}`,
                        element: (
                            <S.RouteWithDrawer>
                                <MenuPersonalArea />
                                <S.ContentWrapper>
                                    <RolesPage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        ),
                        isAdmin,
                        isLoading,
                    })}

                    {withAdminRole({
                        path: `${R.ADMIN_PATH}${R.USERS_PATH}${R.ROLES_PATH}${R.ADD_PATH}`,
                        element: (
                            <S.RouteWithDrawer>
                                <MenuPersonalArea />
                                <S.ContentWrapper>
                                    <RoleAddPage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        ),
                        isAdmin,
                        isLoading,
                    })}

                    {withAdminRole({
                        path: `${R.ADMIN_PATH}${R.IMPORTED_DATA_PATH}`,
                        element: (
                            <S.RouteWithDrawer>
                                <MenuPersonalArea />
                                <S.ContentWrapper>
                                    <ImportedDataPage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        ),
                        isAdmin,
                        isLoading,
                    })}

                    {withAdminRole({
                        path: `${R.ADMIN_PATH}${R.IMPORTED_DATA_PATH}${R.PACKAGE_PATH}`,
                        element: (
                            <S.RouteWithDrawer>
                                <MenuPersonalArea />
                                <S.ContentWrapper>
                                    <PackagePage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        ),
                        isAdmin,
                        isLoading,
                    })}

                    {withAdminRole({
                        path: `${R.ADMIN_PATH}${R.TECHNOLOGIES_PATH}`,
                        element: (
                            <S.RouteWithDrawer>
                                <MenuPersonalArea />
                                <S.ContentWrapper>
                                    <TechnologiesPage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        ),
                        isAdmin,
                        isLoading,
                    })}

                    {withAdminRole({
                        path: `${R.ADMIN_PATH}${R.TECHNOLOGIES_PATH}${R.ADD_PATH}`,
                        element: (
                            <S.RouteWithDrawer>
                                <MenuPersonalArea />
                                <S.ContentWrapper>
                                    <TechnologyAddPage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        ),
                        isAdmin,
                        isLoading,
                    })}

                    {withAdminRole({
                        path: `${R.ADMIN_PATH}${R.CAPABILITIES_PATH}`,
                        element: (
                            <S.RouteWithDrawer>
                                <MenuPersonalArea />
                                <S.ContentWrapper>
                                    <CapabilitiesPage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        ),
                        isAdmin,
                        isLoading,
                    })}

                    {withAdminRole({
                        path: `${R.ADMIN_PATH}${R.CAPABILITIES_PATH}${R.ADD_PATH}`,
                        element: (
                            <S.RouteWithDrawer>
                                <MenuPersonalArea />
                                <S.ContentWrapper>
                                    <CapabilityAddPage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        ),
                        isAdmin,
                        isLoading,
                    })}

                    <Route
                        path={R.MODELS_PATH}
                        element={
                            <S.RouteWithDrawer>
                                <MenuModels />
                                <S.ContentWrapper>
                                    <ModelsPage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        }
                    />

                    <Route
                        path={`${R.MODELS_PATH}${R.SEARCH_PATH}`}
                        element={
                            <S.RouteWithDrawer>
                                <MenuModels />
                                <S.ContentWrapper>
                                    <SearchPage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        }
                    />

                    <Route
                        path={`${R.MODELS_PATH}${R.FDM_PATH}`}
                        element={
                            <S.RouteWithDrawer>
                                <MenuModels />
                                <S.ContentWrapper>
                                    <FDMPage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        }
                    />
                    <Route
                        path={`${R.MODELS_PATH}${R.FDM_PATH}${R.HISTORY_PATH}`}
                        element={
                            <S.RouteWithDrawer>
                                <MenuModels />
                                <S.ContentWrapper>
                                    <FDMHistoryPage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        }
                    />

                    <Route
                        path={`${R.MODELS_PATH}${R.TECH_RADAR_PATH}`}
                        element={
                            <S.RouteWithDrawer>
                                <MenuModels />
                                <S.ContentWrapper hideXOverflow>
                                    <TechRadarPage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        }
                    />

                    <Route
                        path={`${R.MODELS_PATH}${R.MAP_PATH}`}
                        element={
                            <S.RouteWithDrawer>
                                <MenuModels />
                                <S.ContentWrapper>
                                    <MapPage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        }
                    />

                    <Route
                        path={`${R.MODELS_PATH}${R.MAP_PATH}${R.PERSONAL_PATH}/:id`}
                        element={
                            <S.RouteWithDrawer>
                                <MenuModels />
                                <S.ContentWrapper>
                                    <PersonalMapPage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        }
                    />

                    <Route
                        path={`${R.MODELS_PATH}${R.MAP_PATH}${R.ADD_PATH}`}
                        element={<MapAddPage />}
                    />

                    <Route
                        path={`${R.MODELS_PATH}${R.APPS_PATH}`}
                        element={
                            <S.RouteWithDrawer>
                                <MenuModels />
                                <S.ContentWrapper>
                                    <AppsPage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        }
                    />

                    <Route
                        path={`${R.MODELS_PATH}${R.E2E_PATH}`}
                        element={
                            <S.RouteWithDrawer>
                                <MenuModels />
                                <S.ContentWrapper>
                                    <S.IFrameStyled src="https://dashboard-prod-eafdmmart.apps.yd-m3-k21.vimpelcom.ru/e2e" />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        }
                    />

                    <Route
                        path={R.DATA_BASE_PATH}
                        element={
                            <S.RouteWithDrawer>
                                <MenuDatabase />
                                <S.ContentWrapper>
                                    <DataBasePage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        }
                    />

                    <Route
                        path={`${R.DATA_BASE_PATH}${R.ARCH_COMM_PATH}`}
                        element={
                            <S.RouteWithDrawer>
                                <MenuDatabase />
                                <S.ContentWrapper>
                                    <ArchCommPage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        }
                    />

                    <Route
                        path={`${R.DATA_BASE_PATH}${R.ARCH_COMM_PATH}${R.ARCH_HOW_TO_PATH}`}
                        element={
                            <S.RouteWithDrawer>
                                <MenuDatabase />
                                <S.ContentWrapper>
                                    <HowToPage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        }
                    />

                    <Route
                        path={`${R.DATA_BASE_PATH}${R.ARCH_COMM_PATH}${R.ARCH_TEMPLATES_PATH}`}
                        element={
                            <S.RouteWithDrawer>
                                <MenuDatabase />
                                <S.ContentWrapper>
                                    <TemplatesPage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        }
                    />

                    <Route
                        path={`${R.DATA_BASE_PATH}${R.TECH_POLICY_PATH}`}
                        element={
                            <S.RouteWithDrawer>
                                <MenuDatabase />
                                <S.ContentWrapper>
                                    <TechPolicyPage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        }
                    />

                    <Route
                        path={`${R.DATA_BASE_PATH}${R.SERVICES_PATH}`}
                        element={
                            <S.RouteWithDrawer>
                                <MenuDatabase />
                                <S.ContentWrapper>
                                    <ServicesPage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        }
                    />
                    <Route
                        path={`${R.DATA_BASE_PATH}${R.SERVICES_PATH}${R.CONSULTATION_PATH}`}
                        element={
                            <S.RouteWithDrawer>
                                <S.ContentWrapper>
                                    <ConsultationPage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        }
                    />

                    <Route
                        path={R.CX_PATH}
                        element={
                            <S.RouteWithDrawer>
                                <MenuCX />
                                <S.ContentWrapper>
                                    <CXPage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        }
                    />

                    <Route
                        path={`${R.CX_PATH}${R.CJ_PATH}`}
                        element={
                            <S.RouteWithDrawer>
                                <MenuCX />
                                <S.ContentWrapper>
                                    <CJLibraryPage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        }
                    />

                    <Route path={`${R.CX_PATH}${R.CJ_PATH}${R.ADD_PATH}`} element={<CJPage />} />

                    <Route
                        path={`${R.CX_PATH}${R.BI_PATH}`}
                        element={
                            <S.RouteWithDrawer>
                                <MenuCX />
                                <S.ContentWrapper>
                                    <BILibraryPage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        }
                    />

                    <Route
                        path={`${R.CX_PATH}${R.BI_PATH}${R.VIEW_PATH}`}
                        element={<BIViewPage />}
                    />

                    <Route path={`${R.CX_PATH}${R.BI_PATH}${R.ADD_PATH}`} element={<BIAddPage />} />

                    <Route
                        path={`${R.NOTIFICATIONS_PATH}`}
                        element={
                            <S.RouteWithDrawer>
                                <S.ContentWrapper>
                                    <NotificationsPage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        }
                    />

                    {/* <Route
                        path={`${R.PROFILE_PATH}${R.INFO_PATH}`}
                        element={
                            <S.RouteWithDrawer>
                                <MenuProfile />
                                <S.ContentWrapper>
                                    <InDevelopmentPage title="Профиль" />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        }
                    /> */}

                    <Route
                        path={`${R.PROFILE_PATH}${R.SUBSCRIPTIONS_PATH}`}
                        element={
                            <S.RouteWithDrawer>
                                <MenuProfile />
                                <S.ContentWrapper>
                                    <SubscriptionsPage />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        }
                    />

                    {/* <Route
                        path={`${R.PROFILE_PATH}${R.APPLICATIONS_PATH}`}
                        element={
                            <S.RouteWithDrawer>
                                <MenuProfile />
                                <S.ContentWrapper>
                                    <InDevelopmentPage title="Мои заявки" />
                                </S.ContentWrapper>
                            </S.RouteWithDrawer>
                        }
                    /> */}

                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </QueryParamProvider>
        </>
    );
};
