import { BIGINT, DOUBLE, INTEGER, NUMERIC, REAL, SERIAL, SMALLINT, SMALLSERIAL } from '../math'

describe('math types', () => {
  it('SMALLINT', () => {
    expect(SMALLINT().toQuery()).toEqual(['SMALLINT', []])
  })

  it('SMALLSERIAL', () => {
    expect(SMALLSERIAL().toQuery()).toEqual(['SMALLSERIAL', []])
  })

  it('INTEGER', () => {
    expect(INTEGER().toQuery()).toEqual(['INTEGER', []])
  })

  it('SERIAL', () => {
    expect(SERIAL().toQuery()).toEqual(['SERIAL', []])
  })

  it('BIGINT', () => {
    expect(BIGINT().toQuery()).toEqual(['BIGINT', []])
  })

  it('NUMERIC', () => {
    expect(NUMERIC().toQuery()).toEqual(['NUMERIC', []])
  })

  it('REAL', () => {
    expect(REAL().toQuery()).toEqual(['REAL', []])
  })

  it('DOUBLE', () => {
    expect(DOUBLE().toQuery()).toEqual(['DOUBLE PRECISION', []])
  })
})
