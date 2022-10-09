import React from 'react';
import { Icons } from '@beeline/lk-ui';

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
                subItems={[
                    <SubItem
                        title="Общая информация"
                        to="/data-base/arch-comm"
                        parentURL="data-base"
                        key="1"
                    />,
                    <SubItem title="Как подготовиться" key="2" />,
                    <SubItem title="Календарь заседаний" key="3" />,
                    <SubItem title="Шаблоны материалов" key="4" />,
                ]}
            />

            <Item iconName={Icons.PagesMultiple} title="Техполитика" />

            <Item iconName={Icons.Services} title="Услуги" />
        </S.Wrapper>
    );
};
