export const getElementPosition = el => {
    let { left, bottom } = getComputedStyle(el);

    left = parseInt(left.replace(/\D/gi, ''));
    bottom = parseInt(bottom.replace(/\D/gi, ''));

    return { left, bottom };
};
