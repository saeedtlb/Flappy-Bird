export const getElementPosition = (el, property) =>
    parseInt(getComputedStyle(el)[property]);

export const random = (min, max) => Math.random() * (max - min) + min;

export const calculateGap = el =>
    getElementPosition(el, 'height') < 760 ? 450 : 700;
