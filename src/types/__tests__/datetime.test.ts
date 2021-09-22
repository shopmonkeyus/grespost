import { TIME, TIMESTAMP, TIMESTAMPTZ, TIMETZ } from '..'

describe('datetime types', () => {
  it('TIME', () => {
    expect(TIME().toQuery()).toEqual(['TIME', []])
  })

  it('TIME(n)', () => {
    expect(TIME(10).toQuery()).toEqual(['TIME($1)', [10]])
  })

  it('TIMETZ', () => {
    expect(TIMETZ().toQuery()).toEqual(['TIMETZ', []])
  })

  it('TIMETZ(n)', () => {
    expect(TIMETZ(10).toQuery()).toEqual(['TIMETZ($1)', [10]])
  })

  it('TIMESTAMP', () => {
    expect(TIMESTAMP().toQuery()).toEqual(['TIMESTAMP', []])
  })

  it('TIMESTAMP(n)', () => {
    expect(TIMESTAMP(10).toQuery()).toEqual(['TIMESTAMP($1)', [10]])
  })

  it('TIMESTAMPTZ', () => {
    expect(TIMESTAMPTZ().toQuery()).toEqual(['TIMESTAMPTZ', []])
  })

  it('TIMESTAMPTZ(n)', () => {
    expect(TIMESTAMPTZ(10).toQuery()).toEqual(['TIMESTAMPTZ($1)', [10]])
  })
})
