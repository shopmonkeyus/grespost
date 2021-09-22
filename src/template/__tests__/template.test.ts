import { operator, sql } from '..'
import { eident } from '../eident'
import { keyword } from '../keyword'

describe('template helper functions', () => {
  it('eident throws if argument not string', () => {
    expect(() => eident(1 as any)).toThrow()
  })

  it('keyword throws if cheks didn`t passed', () => {
    expect(() => keyword('some', ['ANY'])).toThrow()
  })

  it('operator throws if operator is not valid', () => {
    expect(() => operator('--')).toThrow()
    expect(() => operator('/*')).toThrow()
    expect(() => operator('aa')).toThrow()
    expect(() => operator('/+')).toThrow()
  })

  it('text and values', () => {
    expect(sql`some`.text).toEqual('some')
    expect(sql`some`.values).toEqual([])
  })
})
