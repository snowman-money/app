import { abbreviateNumber } from '@/helpers/abbreviate-number';

describe('abbreviate-number', () => {
    it('HAPPY: should abbreviate number 13221606.372578545', () => {
        const result = abbreviateNumber(13221606.372578545);
        expect(result).toBe('13.2M');
    });

    it('HAPPY: should abbreviate number 0', () => {
        const result = abbreviateNumber(0);
        expect(result).toBe('0');
    });
});
