import { ITech } from 'api/technologies/types';

const quadrants = [
    { radial_min: -1, radial_max: -0.5, factor_x: -1, factor_y: -1 },
    { radial_min: -0.5, radial_max: 0, factor_x: 1, factor_y: -1 },
    { radial_min: 0, radial_max: 0.5, factor_x: 1, factor_y: 1 },
    { radial_min: 0.5, radial_max: 1, factor_x: -1, factor_y: 1 },
];

const rings = [{ radius: 15 }, { radius: 25 }, { radius: 35 }, { radius: 45 }];

let seed = 42;

const random = () => {
    const x = Math.sin(seed++) * 10000;

    return x - Math.floor(x);
};

const randomBetween = (min: number, max: number) => {
    return min + random() * (max - min);
};

const normalBetween = (min: number, max: number) => {
    return min + (random() + random()) * 0.5 * (max - min);
};

const polar = (cartesian: any) => {
    const x = cartesian.x;
    const y = cartesian.y;

    return {
        t: Math.atan2(y, x),
        r: Math.sqrt(x * x + y * y),
    };
};

const cartesian = (polar: any) => {
    return {
        x: polar.r * Math.cos(polar.t),
        y: polar.r * Math.sin(polar.t),
    };
};

const boundedInterval = (value: any, min: any, max: any) => {
    const low = Math.min(min, max);
    const high = Math.max(min, max);

    return Math.min(Math.max(value, low), high);
};

const boundedRing = (polar: any, r_min: any, r_max: any) => {
    return {
        t: polar.t,
        r: boundedInterval(polar.r, r_min, r_max),
    };
};

const boundedBox = (point: any, min: any, max: any) => {
    return {
        x: boundedInterval(point.x, min.x, max.x),
        y: boundedInterval(point.y, min.y, max.y),
    };
};

export const translate = (x: number, y: number) => {
    return 'translate(' + x + ',' + y + ')';
};

export const segment = (quadrant: number, ring: number, isOneRing?: boolean) => {
    const polar_min = {
        t: quadrants[quadrant].radial_min * Math.PI,
        r: isOneRing ? 0 : ring === 0 ? 0 : rings[ring - 1].radius,
    };

    const polar_max = {
        t: quadrants[quadrant].radial_max * Math.PI,
        r: isOneRing ? 45 : rings[ring].radius,
    };

    const cartesian_min = {
        x: (isOneRing ? 5 : 1.5) * quadrants[quadrant].factor_x,
        y: (isOneRing ? 5 : 1.5) * quadrants[quadrant].factor_y,
    };

    const cartesian_max = {
        x: rings[3].radius * quadrants[quadrant].factor_x,
        y: rings[3].radius * quadrants[quadrant].factor_y,
    };

    return {
        clipx: function (d: any) {
            const c = boundedBox(d, cartesian_min, cartesian_max);
            const p = boundedRing(
                polar(c),
                polar_min.r + (isOneRing ? 5 : 1.5),
                polar_max.r - (isOneRing ? 5 : 1.5),
            );
            d.x = cartesian(p).x;

            return d.x;
        },
        clipy: function (d: any) {
            const c = boundedBox(d, cartesian_min, cartesian_max);
            const p = boundedRing(
                polar(c),
                polar_min.r + (isOneRing ? 5 : 1.5),
                polar_max.r - (isOneRing ? 5 : 1.5),
            );
            d.y = cartesian(p).y;

            return d.y;
        },
        random: function () {
            return cartesian({
                t: randomBetween(polar_min.t, polar_max.t),
                r: normalBetween(polar_min.r, polar_max.r),
            });
        },
    };
};

export const getColor = (ring: number) => {
    switch (ring) {
        case 1:
            return 'var(--color-chart-green-active)';
        case 2:
            return 'var(--color-palette-amber-300)';
        case 3:
            return 'var(--color-chart-blue-active)';
        default:
            return 'var(--color-chart-grey-active)';
    }
};

export const itemFilterHandler = (
    item: ITech,
    search: string,
    filterValue: string | null,
    criticalValue: boolean,
) =>
    Boolean(
        item.label.toLowerCase().includes(search.toLowerCase()) &&
            (filterValue
                ? item.category.map((category) => category.name).includes(filterValue)
                : true) &&
            (criticalValue ? item.isCritical : true),
    );

export const openTechInLeftMenu = (id: number) => {
    const element = document.getElementById(`menu-item-${id}`);
    const menuBlock = element?.closest('.menuBlock');
    const expandButton = menuBlock?.querySelector('div');

    const scrollFunction = () => {
        element?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
        });
    };

    if (!(expandButton?.dataset.open === 'true')) {
        expandButton?.click();
        menuBlock?.addEventListener('transitionend', scrollFunction as EventListener, {
            once: true,
        });
        menuBlock?.addEventListener('transitioncancel', scrollFunction as EventListener, {
            once: true,
        });
    } else {
        element?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
        });
    }
};
