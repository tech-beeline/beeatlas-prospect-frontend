import React from 'react';
import { Icons } from '@beeline/design-tokens/js/iconfont/icons';

import * as ROUTER from 'router/const';

import { Item } from './Item';
import * as S from './units';

export const MenuPersonalArea = () => {
    // const [activeItem, setActiveItem] = useState('');

    // const navigate = useNavigate();
    // const location = useLocation();

    // useEffect(() => {
    //     // !activeMenuItem && setActiveMenuItem(location.pathname);
    //     // if (location.pathname !== activeMenuItem) {
    //     //     setActiveMenuItem('');
    //     // }

    //     console.log('location', location.pathname);
    // }, [location]);

    return (
        <S.Wrapper className="MenuPersonalAreaWrapper">
            <Item
                iconName={Icons.Group}
                title="Управление ролями"
                url={ROUTER.PERSONAL_AREA_PATH}
            />

            {/* <Item
                iconName={Icons.Calendar}
                title="Календарь заседаний"
                url={`${ROUTER.DATA_BASE_PATH}${ROUTER.TECH_POLICY_PATH}`}
                disabled
            /> */}

            <Item
                // iconName={Icons.Radar}
                title="Технорадар"
                url={`${ROUTER.DATA_BASE_PATH}${ROUTER.SERVICES_PATH}`}
                disabled
                isRadar
            />
        </S.Wrapper>
    );
};
