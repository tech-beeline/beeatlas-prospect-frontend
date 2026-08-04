import React, { forwardRef } from 'react';

import { VIRTUOSO_SCROLLER_ID } from './const';
import * as S from './units';

export const VirtuosoTableBody = forwardRef<
    HTMLTableSectionElement,
    React.HTMLAttributes<HTMLTableSectionElement>
>((props, ref) => <tbody {...props} ref={ref} />);

export const VirtuosoScroller = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    (props, ref) => <S.TableWrapper {...props} ref={ref} id={VIRTUOSO_SCROLLER_ID} />,
);
