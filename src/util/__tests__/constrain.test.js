import constrain from '../constrain';

it('returns the min if the number is smaller than it', () => {
    expect(constrain(0, 1, 10)).toBe(1);
});

it('returns the number if it is in range', () => {
    expect(constrain(5, 1, 10)).toBe(5);
});

it('returns the max if the number is above it', () => {
    expect(constrain(11, 1, 10)).toBe(10);
});
