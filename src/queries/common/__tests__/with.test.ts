import { SELECT } from '../..'
import { NOW } from '../../../functions/datetime'
import { source } from '../../../source'
import { TIME } from '../../../types'
import { stringifyWith } from '../with'

describe('WITH Clause', () => {
  const table = source('table', {
    id: TIME()
  })

  const query = SELECT({ from: table })

  it('test #1', () => {
    expect(stringifyWith([query.asCTE('q')]).toQuery()).toEqual(['q AS ( SELECT * FROM "table" )', []])
  })

  it('with columns', () => {
    expect(stringifyWith([query.asCTE('q', ['why', 'ok'])]).toQuery()).toEqual(['q ( why, ok ) AS ( SELECT * FROM "table" )', []])
  })

  it('recursive', () => {
    expect(stringifyWith({
      recursive: true,
      ctes: [query.asCTE('q', ['why', 'ok'])]
    }).toQuery()).toEqual(['RECURSIVE q ( why, ok ) AS ( SELECT * FROM "table" )', []])
  })

  it('materialized', () => {
    expect(stringifyWith({
      recursive: true,
      ctes: [{
        materialized: true,
        query: query.asCTE('q')
      }, {
        materialized: false,
        query: query.asCTE('q1')
      }]
    }).toQuery()).toEqual(['RECURSIVE q AS MATERIALIZED ( SELECT * FROM "table" ), q1 AS NOT MATERIALIZED ( SELECT * FROM "table" )', []])
  })

  it('throws error if cteAlias not provided', () => {
    expect(() => stringifyWith([query])).toThrowError('Missing cteAlias in query. Use query.asCTE(\'alias\') to set cte alias.')
  })
})
