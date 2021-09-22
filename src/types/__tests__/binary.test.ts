import { BIT, VARBIT } from '../other/binary'

describe('binary type', () => {
  it('BIT', () => {
    expect(BIT().toQuery()).toEqual(['BIT', []])
  })

  it('BIT(n)', () => {
    expect(BIT(10).toQuery()).toEqual(['BIT($1)', [10]])
  })

  it('VARBIT', () => {
    expect(VARBIT().toQuery()).toEqual(['VARBIT', []])
  })

  it('VARBIT(n)', () => {
    expect(VARBIT(10).toQuery()).toEqual(['VARBIT($1)', [10]])
  })
})
