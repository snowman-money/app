export const abbreviateNumber = (value: number) => {
    let newValue = value;
    const suffixes = ['', 'K', 'M', 'B', 'T'];
    let suffixNum = 0;
    while (newValue >= 1000) {
        newValue /= 1000;
        suffixNum++;
    }

    let result =
        newValue.toString().length > 2
            ? Number(newValue).toPrecision(3)
            : Number(newValue).toPrecision();

    result += suffixes[suffixNum];
    return result;
};
