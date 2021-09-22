import { LOWER } from '../../../functions/string'
import { source } from '../../../source'
import { keyword } from '../../../template'
import { VARCHAR } from '../../../types'
import { stringifyCreateIndex } from '../create'

describe('create index query', () => {
  const table = source('table', {
    id: VARCHAR(),
    name: VARCHAR(10)
  })

  it('test #1', () => {
    expect(stringifyCreateIndex({
      table: table,
      columns: [{ name: 'id' }]
    }).toQuery()).toEqual(['CREATE INDEX ON "table" ( id )', []])
  })

  it('named', () => {
    expect(stringifyCreateIndex({
      name: 'idx',
      table: table,
      columns: [{ name: 'id' }]
    }).toQuery()).toEqual(['CREATE INDEX idx ON "table" ( id )', []])
  })

  it('only table', () => {
    expect(stringifyCreateIndex({
      name: 'idx',
      table: { only: true, table },
      columns: [{ name: 'id' }]
    }).toQuery()).toEqual(['CREATE INDEX idx ON ONLY "table" ( id )', []])
  })

  it('unique', () => {
    expect(stringifyCreateIndex({
      unique: true,
      table: table,
      columns: [{ name: 'id' }]
    }).toQuery()).toEqual(['CREATE UNIQUE INDEX ON "table" ( id )', []])
  })

  it('concurently', () => {
    expect(stringifyCreateIndex({
      unique: true,
      concurently: true,
      table: table,
      columns: [{ name: 'id' }]
    }).toQuery()).toEqual(['CREATE UNIQUE INDEX CONCURRENTLY ON "table" ( id )', []])
  })

  it('if not exists', () => {
    expect(stringifyCreateIndex({
      unique: true,
      concurently: true,
      ifNotExists: true,
      table: table,
      columns: [{ name: 'id' }]
    }).toQuery()).toEqual(['CREATE UNIQUE INDEX CONCURRENTLY IF NOT EXISTS ON "table" ( id )', []])
  })

  it('using', () => {
    expect(stringifyCreateIndex({
      unique: true,
      concurently: true,
      ifNotExists: true,
      table: table,
      using: 'BRIN',
      columns: [{ name: 'id' }]
    }).toQuery()).toEqual(['CREATE UNIQUE INDEX CONCURRENTLY IF NOT EXISTS ON "table" USING BRIN ( id )', []])
  })

  it('expression', () => {
    expect(stringifyCreateIndex({
      table: table,
      using: keyword('IDX'),
      columns: [{ expression: LOWER(table.id) }]
    }).toQuery()).toEqual(['CREATE INDEX ON "table" USING IDX ( ( LOWER("table".id) ) )', []])
  })

  it('collation', () => {
    expect(stringifyCreateIndex({
      table: table,
      columns: [{
        name: table.id,
        collation: 'en_US'
      }]
    }).toQuery()).toEqual(['CREATE INDEX ON "table" ( "table".id COLLATE "en_US" )', []])
  })

  it('opclass', () => {
    expect(stringifyCreateIndex({
      table: table,
      columns: [{
        name: table.id,
        opclass: 'some',
        opconfig: {
          foo: 1
        }
      }]
    }).toQuery()).toEqual(['CREATE INDEX ON "table" ( "table".id "some" ( foo = $1 ) )', [1]])
  })

  it('sort nulls', () => {
    expect(stringifyCreateIndex({
      table: table,
      columns: [{
        name: table.id,
        sort: 'ASC',
        nulls: 'FIRST'
      }]
    }).toQuery()).toEqual(['CREATE INDEX ON "table" ( "table".id ASC NULLS FIRST )', []])
  })

  it('include', () => {
    expect(stringifyCreateIndex({
      table: table,
      columns: [table.id],
      include: [table.name, 'some.any']
    }).toQuery()).toEqual(['CREATE INDEX ON "table" ( "table".id ) INCLUDE ( "table"."name", "some"."any" )', []])
  })

  it('with', () => {
    expect(stringifyCreateIndex({
      table: table,
      columns: [table.id],
      with: {
        deduplicate_items: true
      }
    }).toQuery()).toEqual(['CREATE INDEX ON "table" ( "table".id ) WITH ( deduplicate_items = $1 )', [true]])
  })

  it('tablespace', () => {
    expect(stringifyCreateIndex({
      table: table,
      columns: ['id'],
      tablespace: 'tblspc'
    }).toQuery()).toEqual(['CREATE INDEX ON "table" ( id ) TABLESPACE tblspc', []])
  })

  it('where', () => {
    expect(stringifyCreateIndex({
      table: table,
      columns: [table.id],
      where: table.id.isNot(null)
    }).toQuery()).toEqual(['CREATE INDEX ON "table" ( "table".id ) WHERE "table".id IS NOT $1', [null]])
  })
})
