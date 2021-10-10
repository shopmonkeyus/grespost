import { SELECT } from '../select'
import { literal } from '../../../expressions'
import { NOW } from '../../../functions/datetime'
import { source } from '../../../source/table'
import { INTEGER, TEXT } from '../../../types'
import { VALUES } from '../values'

describe('SELECT', () => {
  const table = source('table', {
    id: TEXT()
  })

  it('test #1', () => {
    const t = table.$.as('t')
    expect(SELECT({ fields: { all: t.$.all() }, from: t }).toQuery())
      .toEqual(['SELECT t.* AS "all" FROM "table" AS t', []])
  })

  it('clean', () => {
    expect(SELECT({}).toQuery()).toEqual(['SELECT', []])
  })

  it('with', () => {
    const query = SELECT({ from: table }).asCTE('query')
    expect(SELECT({ with: [query], from: [{ source: query }] }).toQuery())
      .toEqual(['WITH query AS ( SELECT * FROM "table" ) SELECT * FROM query', []])
  })

  it('fields', () => {
    expect(SELECT({ fields: { f: NOW() } }).toQuery()).toEqual(['SELECT NOW() AS f', []])
    expect(SELECT({ fields: '*' }).toQuery()).toEqual(['SELECT *', []])
  })

  it('distinct', () => {
    expect(SELECT({ from: table, distinct: true }).toQuery())
      .toEqual(['SELECT DISTINCT * FROM "table"', []])
    expect(SELECT({ from: table, distinct: false }).toQuery())
      .toEqual(['SELECT ALL * FROM "table"', []])
    expect(SELECT({ from: table, distinct: [table.id] }).toQuery())
      .toEqual(['SELECT DISTINCT ON ( "table".id ) * FROM "table"', []])
  })

  it('where', () => {
    expect(SELECT({ from: table, where: table.id.eq('id') }).toQuery())
      .toEqual(['SELECT * FROM "table" WHERE "table".id = $1', ['id']])
    expect(SELECT({ from: table, where: [table.id.eq('id'), 'OR', table.id.eq('id2')] }).toQuery())
      .toEqual(['SELECT * FROM "table" WHERE ( "table".id = $1 OR "table".id = $2 )', ['id', 'id2']])
  })

  it('groupBy', () => {
    expect(SELECT({
      from: table,
      groupBy: [table.id, table.id]
    }).toQuery()).toEqual(['SELECT * FROM "table" GROUP BY "table".id, "table".id', []])

    expect(SELECT({
      from: table,
      groupBy: [[table.id, table.id]]
    }).toQuery()).toEqual(['SELECT * FROM "table" GROUP BY ( "table".id, "table".id )', []])

    expect(SELECT({
      from: table,
      groupBy: [[]]
    }).toQuery()).toEqual(['SELECT * FROM "table" GROUP BY (  )', []])
  })

  it('having', () => {
    expect(SELECT({
      from: table,
      having: table.id.eq('id')
    }).toQuery()).toEqual(['SELECT * FROM "table" HAVING "table".id = $1', ['id']])

    expect(SELECT({
      from: table,
      having: [table.id.eq('id'), 'OR', table.id.eq('id2')]
    }).toQuery()).toEqual(['SELECT * FROM "table" HAVING ( "table".id = $1 OR "table".id = $2 )', ['id', 'id2']])
  })

  it('order by', () => {
    expect(SELECT({
      from: table,
      orderBy: [
        table.id,
        { by: table.id, direction: 'ASC', nulls: 'FIRST' },
        { by: table.id, using: '<' }
      ]
    }).toQuery()).toEqual(['SELECT * FROM "table" ORDER BY "table".id, "table".id ASC NULLS FIRST, "table".id USING <', []])
  })

  it('limit', () => {
    expect(SELECT({
      from: table,
      limit: 10
    }).toQuery()).toEqual(['SELECT * FROM "table" LIMIT $1', [10]])

    expect(SELECT({
      from: table,
      limit: 'ALL'
    }).toQuery()).toEqual(['SELECT * FROM "table" LIMIT ALL', []])
  })

  it('offset', () => {
    expect(SELECT({
      from: table,
      offset: 10
    }).toQuery()).toEqual(['SELECT * FROM "table" OFFSET $1', [10]])

    expect(SELECT({
      from: table,
      offset: literal(10).cast(INTEGER())
    }).toQuery()).toEqual(['SELECT * FROM "table" OFFSET $1::INTEGER', [10]])

    expect(SELECT({
      from: table,
      offset: { start: 10, plurality: 'ROWS' }
    }).toQuery()).toEqual(['SELECT * FROM "table" OFFSET $1 ROWS', [10]])
  })

  it('fetch', () => {
    expect(SELECT({
      from: table,
      fetch: 10
    }).toQuery()).toEqual(['SELECT * FROM "table" FETCH FIRST $1 ROW ONLY', [10]])

    expect(SELECT({
      from: table,
      fetch: literal(10).cast(INTEGER())
    }).toQuery()).toEqual(['SELECT * FROM "table" FETCH FIRST $1::INTEGER ROW ONLY', [10]])

    expect(SELECT({
      from: table,
      fetch: { start: 'NEXT', count: 10, plurality: 'ROWS', withTies: true }
    }).toQuery()).toEqual(['SELECT * FROM "table" FETCH NEXT $1 ROWS WITH TIES', [10]])
  })

  it('for', () => {
    expect(SELECT({
      from: table,
      for: ['NO KEY UPDATE']
    }).toQuery()).toEqual(['SELECT * FROM "table" FOR NO KEY UPDATE', []])

    expect(SELECT({
      from: table,
      for: ['NO KEY UPDATE', { strength: 'SHARE', of: [table], waiting: 'SKIP LOCKED' }]
    }).toQuery()).toEqual(['SELECT * FROM "table" FOR NO KEY UPDATE SHARE OF "table" SKIP LOCKED', []])
  })
})
