/* global describe, expect, it  */
import URN from '@/utils/URN';

const urns = [
  'urn:cts:greekLit:tlg0012.tlg001.msA:',
  'urn:cts:greekLit:tlg0012.tlg001.msA:1',
  'urn:cts:greekLit:tlg0012.tlg001.msA:1.2',
  'urn:cts:greekLit:tlg0012.tlg001.msA:1.2.3',
  'urn:cts:greekLit:tlg0012.tlg001.msA:1.2.300-400',
  'urn:cts:greekLit:tlg0012.tlg001.msA:1.2.3.4',
  'urn:cts:greekLit:tlg0012.tlg001.msA:1.2.3.4.5-4.6',
  'urn:cts:greekLit:tlg0012.tlg001.msA:1.2.3.4.5-7.8',
  'urn:cts:greekLit:tlg0012.tlg001.msA:1.2.3.5',
  'urn:cts:greekLit:tlg0012.tlg001.msA:1.2.3.6',
  'urn:cts:greekLit:tlg0012.tlg001.msA:1.2.3.7',
];

describe('URN.js', () => {
  it.each([
    [urns[0], 'urn:cts:greekLit:tlg0012.tlg001.msA:'],
    [urns[7], 'urn:cts:greekLit:tlg0012.tlg001.msA:'],
  ])('parses the URN node correctly excluding ranges', (urn, result) => {
    expect(new URN(urn).version).toEqual(result);
  });
});
