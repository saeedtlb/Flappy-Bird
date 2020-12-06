export const getElementPosition = el => {
    let { left, bottom } = getComputedStyle(el);

    left = parseInt(left.replace(/\D/gi, ''));
    bottom = parseInt(bottom.replace(/\D/gi, ''));

    return { left, bottom };
};

export const random = (min, max) => Math.random() * (max - min) + min;

export const position = bottom => {
    const gap = 100;
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
