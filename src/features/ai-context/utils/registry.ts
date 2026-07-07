import { ANALYTICAL_PAGE } from '../page-context/AnalyticalPage';
import { APP_VIEW_PAGE } from '../page-context/AppViewPage';
import { BI_LIBRARY_PAGE } from '../page-context/BILibraryPage';
import { BI_VIEW_PAGE } from '../page-context/BIViewPage';
import { CJ_LIBRARY_PAGE } from '../page-context/CJLibraryPage';
import { CJ_PAGE } from '../page-context/CJPage';
import { E2E_PAGE } from '../page-context/E2EPage';
import { FDM_PAGE } from '../page-context/FDMPage';
import { IMPACT_PAGE } from '../page-context/ImpactPage';
import { LIFE_SITUATIONS_PAGE } from '../page-context/LifeSituationsPage';
import { MAP_PAGE } from '../page-context/MapPage';
import { PATTERNS_PAGE } from '../page-context/PatternsPage';
import { PATTERN_VIEW_PAGE } from '../page-context/PatternViewPage';
import { PERSONAL_MAP_PAGE } from '../page-context/PersonalMapPage';
import { SEARCH_PAGE } from '../page-context/SearchPage';
import { TECHNOLOGY_VIEW_PAGE } from '../page-context/TechnologyViewPage';
import { TECH_RADAR_PAGE } from '../page-context/TechRadarPage';

export const PAGE_CONTEXTS = {
    [ANALYTICAL_PAGE.pageId]: ANALYTICAL_PAGE,
    [APP_VIEW_PAGE.pageId]: APP_VIEW_PAGE,
    [BI_LIBRARY_PAGE.pageId]: BI_LIBRARY_PAGE,
    [BI_VIEW_PAGE.pageId]: BI_VIEW_PAGE,
    [CJ_LIBRARY_PAGE.pageId]: CJ_LIBRARY_PAGE,
    [CJ_PAGE.pageId]: CJ_PAGE,
    [E2E_PAGE.pageId]: E2E_PAGE,
    [FDM_PAGE.pageId]: FDM_PAGE,
    [IMPACT_PAGE.pageId]: IMPACT_PAGE,
    [LIFE_SITUATIONS_PAGE.pageId]: LIFE_SITUATIONS_PAGE,
    [MAP_PAGE.pageId]: MAP_PAGE,
    [PATTERN_VIEW_PAGE.pageId]: PATTERN_VIEW_PAGE,
    [PATTERNS_PAGE.pageId]: PATTERNS_PAGE,
    [PERSONAL_MAP_PAGE.pageId]: PERSONAL_MAP_PAGE,
    [SEARCH_PAGE.pageId]: SEARCH_PAGE,
    [TECH_RADAR_PAGE.pageId]: TECH_RADAR_PAGE,
    [TECHNOLOGY_VIEW_PAGE.pageId]: TECHNOLOGY_VIEW_PAGE,
};
