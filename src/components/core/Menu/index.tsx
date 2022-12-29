import React from 'react';
import { Icons } from '@beeline/lk-ui';

import * as ROUTER from 'router/const';

import { Item } from './Item';
import { SubItem } from './SubItem';
import * as S from './units';

export const Menu = () => {
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
        <S.Wrapper>
            <Item
                iconName={Icons.Group}
                title="Арх. комитет"
                url={ROUTER.ARCH_COMM_PATH}
                subItems={[
                    <SubItem
                        title="Общая информация"
                        to={`${ROUTER.DATA_BASE_PATH}${ROUTER.ARCH_COMM_PATH}`}
                        parentURL={ROUTER.DATA_BASE_PATH}
                        key="1"
                    />,
                    <SubItem
                        title="Как подготовиться"
                        to={`${ROUTER.DATA_BASE_PATH}${ROUTER.ARCH_COMM_PATH}${ROUTER.ARCH_HOW_TO_PATH}`}
                        parentURL={ROUTER.DATA_BASE_PATH}
                        key="2"
                    />,
                    // <SubItem
                    //     title="Календарь заседаний"
                    //     to={`${C.DATA_BASE_PATH}${C.ARCH_COMM_PATH}${C.ARCH_CALENDAR_PATH}`}
                    //     parentURL={C.DATA_BASE_PATH}
                    //     key="3"
                    // />,
                    <SubItem
                        title="Шаблоны материалов"
                        to={`${ROUTER.DATA_BASE_PATH}${ROUTER.ARCH_COMM_PATH}${ROUTER.ARCH_TEMPLATES_PATH}`}
                        parentURL={ROUTER.DATA_BASE_PATH}
                        key="4"
                    />,
                ]}
            />

            <Item
                iconName={Icons.PagesMultiple}
                title="Техполитика"
                url={`${ROUTER.DATA_BASE_PATH}${ROUTER.TECH_POLICY_PATH}`}
            />

            <Item
                iconName={Icons.Services}
                title="Услуги"
                url={`${ROUTER.DATA_BASE_PATH}${ROUTER.SERVICES_PATH}`}
            />
        </S.Wrapper>
    );
};
