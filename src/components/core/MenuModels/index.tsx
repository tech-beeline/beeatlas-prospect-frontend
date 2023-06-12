import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@beeline/design-system-react';
import { Icons } from '@beeline/design-tokens/js/iconfont/icons';

import { CustomRadarLogo } from 'components/other';

import * as ROUTER from 'router/const';

import * as S from './units';

export const MenuModels = () => {
    // const [activeLeftItem, setActiveLeftItem] = useState<Nullable<number>>(null);

    // const navigate = useNavigate();

    // useEffect(() => {
    //     activeLeftItem === 0 && navigate(`${ROUTER.MODELS_PATH}${ROUTER.SEARCH_PATH}`);

    //     activeLeftItem === 1 && navigate(`${ROUTER.MODELS_PATH}${ROUTER.FDM_PATH}`);

    //     activeLeftItem === 2 && navigate(`${ROUTER.MODELS_PATH}${ROUTER.TECH_RADAR_PATH}`);
    // }, [activeLeftItem]);

    // isActive={location.pathname?.includes(tab.url)}

    return (
        <S.Wrapper className="MenuModelsWrapper">
            <S.LinkStyled
                to={`${ROUTER.MODELS_PATH}${ROUTER.SEARCH_PATH}`}
                isActive={location.pathname?.includes(ROUTER.SEARCH_PATH)}
            >
                <S.Tab
                    className="MenuModelsTab"
                    // onClick={() => setActiveLeftItem(0)}
                    isActive={location.pathname?.includes(ROUTER.SEARCH_PATH)}
                >
                    <Icon iconName={Icons.Search} />
                </S.Tab>
            </S.LinkStyled>

            <Link to={`${ROUTER.MODELS_PATH}${ROUTER.FDM_PATH}`}>
                <S.Tab
                    className="MenuModelsTab"
                    // onClick={() => setActiveLeftItem(1)}
                    isActive={location.pathname?.includes(ROUTER.FDM_PATH)}
                >
                    <Icon iconName={Icons.NetworkAlt} />
                </S.Tab>
            </Link>

            <Link to={`${ROUTER.MODELS_PATH}${ROUTER.TECH_RADAR_PATH}`}>
                <S.Tab
                    className="MenuModelsTab"
                    // onClick={() => setActiveLeftItem(2)}
                    isActive={location.pathname?.includes(ROUTER.TECH_RADAR_PATH)}
                >
                    {/* <Icon iconName={Icons.Radar} /> */}
                    <CustomRadarLogo
                        isActive={location.pathname?.includes(ROUTER.TECH_RADAR_PATH)}
                    />
                </S.Tab>
            </Link>

            {/* <S.Tab onClick={() => setActiveLeftItem(2)} isActive={activeLeftItem === 2}>
            <Icon iconName={Icons.DashboardDots} />
        </S.Tab> */}
        </S.Wrapper>
    );
};
