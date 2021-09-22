import { COMBINE } from '..'
import { INTEGER, SELECT, TEXT } from '../..'
import { source } from '../../source'
import { CAST, CUBE, GROUPING_SETS, ROLLUP } from '../grouping'

describe('Grouping functions', () => {
  it('ROLLUP', () => {
    expect(ROLLUP(1, [2, 3]).toQuery()).toEqual(['ROLLUP($1, ( $2, $3 ))', [1, 2, 3]])
  })

  it('CUBE', () => {
    expect(CUBE(1, [2, 3]).toQuery()).toEqual(['CUBE($1, ( $2, $3 ))', [1, 2, 3]])
  })

  it('GROUPING_SETS', () => {
    expect(GROUPING_SETS(1, [2, 3]).toQuery()).toEqual(['GROUPING_SETS($1, ( $2, $3 ))', [1, 2, 3]])
  })

  const table = source('src', {
    id: TEXT()
  })

  it('COMBINE', () => {
    expect(COMBINE(
      SELECT({ fields: { id: table.id } }),
      'UNION',
      [
        SELECT({ fields: { id: table.id } }),
        'INTERSECT ALL',
        SELECT({ fields: { id: table.id } })
      ]
    ).toQuery()).toEqual(['SELECT src.id AS id UNION ( SELECT src.id AS id INTERSECT ALL SELECT src.id AS id )', []])
  })

  it('GROUPING_SETS', () => {
    expect(CAST(1, INTEGER()).toQuery()).toEqual(['CAST($1 AS INTEGER)', [1]])
  })
})
