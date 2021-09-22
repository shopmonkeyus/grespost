import { DROP_TABLE } from '../drop'
import { CHAR } from '../../../types'
import { source } from '../../../source'

describe('drop table query', () => {
  const table = source('table', {
    id: CHAR(),
    name: CHAR(10)
  })

  it('test #1', () => {
    expect(DROP_TABLE({
      names: [table, 'any']
    }).toQuery()).toEqual(['DROP TABLE "table", "any"', []])
  })

  it('with params', () => {
    expect(DROP_TABLE({
      ifExists: true,
      names: ['some', 'any'],
      constraint: 'CASCADE'
    }).toQuery()).toEqual(['DROP TABLE IF EXISTS "some", "any" CASCADE', []])
  })
})
