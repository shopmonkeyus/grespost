import { EXISTS, ROW } from '..'
import { SELECT } from '../..'
import { source } from '../../source/table'
import { TEXT } from '../../types'
import { ALL, ANY, CASE, COALESCE, GREATEST, LEAST, NULLIF, NUM_NONNULLS, NUM_NULLS, SOME } from '../boolean'

describe('comparison functions', () => {
  const table = source('table', {
    id: TEXT()
  })

  it('NUM_NONNULLS', () => {
    expect(NUM_NONNULLS('a', 'b', 'c').toQuery()).toEqual(
      [
        'NUM_NONNULLS($1, $2, $3)',
        [
          'a',
          'b',
          'c'
        ]
      ]
    )
  })

  it('NUM_NULLS', () => {
    expect(NUM_NULLS('a', 'b', 'c').toQuery()).toEqual(
      [
        'NUM_NULLS($1, $2, $3)',
        [
          'a',
          'b',
          'c'
        ]
      ]
    )
  })

  it('CASE', () => {
    expect(CASE([{ when: table.id.eq('1'), then: 1 }, { when: table.id.eq('2'), then: 2 }], '5').toQuery()).toEqual(
      [
        'CASE WHEN "table".id = $1 THEN $2 WHEN "table".id = $3 THEN $4 ELSE $5 END',
        [
          '1',
          1,
          '2',
          2,
          '5'
        ]
      ]
    )
  })

  it('CASE1', () => {
    expect(CASE([{ when: table.id.eq('1'), then: 1 }]).toQuery()).toEqual(
      [
        'CASE WHEN "table".id = $1 THEN $2 END',
        [
          '1',
          1
        ]
      ]
    )
  })

  it('COALESCE', () => {
    expect(COALESCE('a', null, 'c').toQuery()).toEqual(
      [
        'COALESCE($1, $2, $3)',
        [
          'a',
          null,
          'c'
        ]
      ]
    )
  })

  it('NULLIF', () => {
    expect(NULLIF(null, 'null').toQuery()).toEqual(
      [
        'NULLIF($1, $2)',
        [
          null,
          'null'
        ]
      ]
    )
  })

  it('GREATEST', () => {
    expect(GREATEST(1, 2, 3).toQuery()).toEqual(
      [
        'GREATEST($1, $2, $3)',
        [
          1,
          2,
          3
        ]
      ]
    )
  })

  it('LEAST', () => {
    expect(LEAST(1, 2, 3).toQuery()).toEqual(
      [
        'LEAST($1, $2, $3)',
        [
          1,
          2,
          3
        ]
      ]
    )
  })

  it('ANY', () => {
    expect(ANY([1, 2, 3]).toQuery()).toEqual(['ANY($1)', [[1, 2, 3]]])
    expect(ANY(SELECT({ fields: { one: 1 } })).toQuery()).toEqual(['ANY(SELECT $1 AS one)', [1]])
  })

  it('SOME', () => {
    expect(SOME([1, 2, 3]).toQuery()).toEqual(['SOME($1)', [[1, 2, 3]]])
    expect(SOME(SELECT({ fields: { one: 1 } })).toQuery()).toEqual(['SOME(SELECT $1 AS one)', [1]])
  })

  it('ALL', () => {
    expect(ALL([1, 2, 3]).toQuery()).toEqual(['ALL($1)', [[1, 2, 3]]])
    expect(ALL(SELECT({ fields: { one: 1 } })).toQuery()).toEqual(['ALL(SELECT $1 AS one)', [1]])
  })

  it('EXISTS', () => {
    expect(EXISTS(SELECT({ fields: { one: 1 } })).toQuery()).toEqual(['EXISTS(SELECT $1 AS one)', [1]])
  })

  it('EXISTS', () => {
    expect(ROW(SELECT({ fields: { one: 1 } })).toQuery()).toEqual(['ROW(SELECT $1 AS one)', [1]])
  })
})
