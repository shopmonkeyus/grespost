import { sql } from '..'
import { eident } from '../eident'

describe('template helper functions', () => {
  it('eident throws if argument not string', () => {
    expect(() => eident(1 as any)).toThrow()
  })

  it('keyword throws if cheks didn`t passed', () => {
    expect(() => sql.keyword('some', ['ANY'])).toThrow()
  })

  it('operator throws if operator is not valid', () => {
    expect(() => sql.operator('--')).toThrow()
    expect(() => sql.operator('/*')).toThrow()
    expect(() => sql.operator('aa')).toThrow()
    expect(() => sql.operator('/+')).toThrow()
  })

  it('text and values', () => {
    expect(sql`some`.text).toEqual('some')
    expect(sql`some`.values).toEqual([])
  })
})
