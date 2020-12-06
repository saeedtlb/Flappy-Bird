export const getElementPosition = (el, property) =>
    parseInt(getComputedStyle(el)[property]);

export const random = (min, max) => Math.random() * (max - min) + min;

export const position = (bottom, gap) => {
    let y1, y2;
    if (bottom < 75) {
        const chance = Math.random() <= 0.5;
        y1 = chance ? bottom + gap : bottom;
        y2 = !chance ? bottom + gap : bottom;
    } else {
        y1 = bottom;
        y2 = bottom;
    }

    return { y1: -y1, y2: -y2 };
};

export const calculateGap = el => {
    let gap = null;

    const height = getElementPosition(el, 'height');
    const width = getElementPosition(el, 'width');

    if (height < 760) {
        if (width <= 450) {
            gap = 160;
        } else {
            gap = 100;
        }
    } else {
        gap = 50;
    }

    return gap;
};
