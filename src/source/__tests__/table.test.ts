import { source } from '..'
import { BIT, UUID } from '../../types'

describe('table source definition', () => {
  it('test #1', () => {
    const table = source('"table"', {})
    expect(table.$.toQuery()).toEqual(['"""table"""', []])
  })

  it('test #2', () => {
    const table = source('src', {}).$.as('a', ['id'])
    expect(table.$.toSource().toQuery()).toEqual(['src AS "a" ( id )', []])
  })

  it('throws when try to define $ column', () => {
    expect(() => source('"table"', { $: BIT() })).toThrow()
  })
})
