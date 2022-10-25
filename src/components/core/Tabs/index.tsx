import React from 'react';

import * as S from './units';

export { Tab } from './Tab';

export const Tabs = (props: any) => {
    return <S.Wrapper>{props.children}</S.Wrapper>;
};
