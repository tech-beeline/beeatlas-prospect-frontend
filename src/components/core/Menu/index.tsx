import React from 'react';
import { Icons } from '@beeline/lk-ui';

import * as C from 'router/const';

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
                url={C.ARCH_COMM_PATH}
                subItems={[
                    <SubItem
                        title="Общая информация"
                        to={`${C.DATA_BASE_PATH}${C.ARCH_COMM_PATH}`}
                        parentURL={C.DATA_BASE_PATH}
                        key="1"
                    />,
                    <SubItem
                        title="Как подготовиться"
                        to={`${C.DATA_BASE_PATH}${C.ARCH_COMM_PATH}${C.ARCH_HOW_TO_PATH}`}
                        parentURL={C.DATA_BASE_PATH}
                        key="2"
                    />,
                    <SubItem title="Календарь заседаний" key="3" />,
                    <SubItem
                        title="Шаблоны материалов"
                        to={`${C.DATA_BASE_PATH}${C.ARCH_COMM_PATH}${C.ARCH_TEMPLATES_PATH}`}
                        parentURL={C.DATA_BASE_PATH}
                        key="4"
                    />,
                ]}
            />

            <Item iconName={Icons.PagesMultiple} title="Техполитика" />

            <Item iconName={Icons.Services} title="Услуги" url={C.SERVICES_PATH} />
        </S.Wrapper>
    );
};
