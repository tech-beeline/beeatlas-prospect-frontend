// import menuStaticData from './groups.json';

// interface IMenuItem {
//     id: number;
//     name: string;
//     guid: string;
//     descr: string;
//     parent: number;
//     alias: string;
//     level: number;
//     children?: any;
// }

export const test = (config: any[]) => {
    const startArr: any[] = config;

    let lastLevel = startArr[startArr.length - 1].level;

    let resultArr: any[] = [];

    while (lastLevel > 1) {
        const helpArr: any[] = resultArr;

        resultArr = [];

        startArr.forEach((item) => {
            if (item.level === lastLevel) {
                const newItem = startArr.find((find) => find.id === item.parent);

                if (!!newItem && resultArr.some((item) => item.id === newItem.id)) {
                    resultArr = resultArr.map((item1) =>
                        item1.id === item.parent
                            ? {
                                  ...item1,
                                  isOpen: false,
                                  children: [
                                      ...item1.children,
                                      helpArr.find((item2) => item2.id === item.id) || item,
                                  ],
                              }
                            : { ...item1, isOpen: false },
                    );
                } else {
                    !!newItem &&
                        resultArr.push({
                            ...newItem,
                            isOpen: false,
                            children: [helpArr.find((item1) => item1.id === item.id) || item],
                        });
                }
            }
        });

        lastLevel = lastLevel - 1;
    }

    return resultArr;
};

// export const formatMenuData = () => {
//     const arrLevel1: IMenuItem[] = [];
//     const arrLevel2: IMenuItem[] = [];
//     const arrLevel3: IMenuItem[] = [];

//     const res = menuStaticData.reduce((acc: IMenuItem[], item: IMenuItem) => {
//         return [...acc, { ...item, children: [], isOpen: false }];
//     }, []);

//     res.forEach((item) => {
//         if (item.level === 1) {
//             arrLevel1.push(item);
//         } else if (item.level === 2) {
//             arrLevel2.push(item);
//         } else {
//             arrLevel3.push(item);
//         }
//     });

//     // TODO: вынести - сделать для неизвестного множества уровней
//     arrLevel3.forEach((item) => {
//         arrLevel2.forEach((itm) => {
//             if (item.parent === itm.id) {
//                 itm.children.push(item);
//             }
//         });
//     });

//     arrLevel2.forEach((item) => {
//         arrLevel1.forEach((itm) => {
//             if (item.parent === itm.id) {
//                 itm.children.push(item);
//             }
//         });
//     });

//     return arrLevel1;
// };
