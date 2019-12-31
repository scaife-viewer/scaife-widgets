/* global describe, expect, it  */
import iconMap from '@/utils/iconMap';

describe('iconMap', () => {
  it.each([
    ['chevron-left', 'chevron-left'],
    ['chevron-right', 'chevron-right'],
  ])('matches inclusive-range patterns via regex', (pattern, expected) => {
    const result = iconMap[pattern];
    expect(result).toMatchObject({ iconName: expected });
  });
  it.each([
    ['', undefined],
    ['foo', undefined],
  ])('matches inclusive-range patterns via regex', (pattern, expected) => {
    const result = iconMap[pattern];
    expect(result).toEqual(expected);
  });
});
