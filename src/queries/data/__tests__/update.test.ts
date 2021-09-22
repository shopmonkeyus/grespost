import { UPDATE } from '../update'
import { source } from '../../../source'
import { BIGINT, REAL } from '../../../types'
import { SELECT } from '../select'

describe('UPDATE query', () => {
  const table = source('table', {
    id: BIGINT(),
    field: REAL()
  })

  it('test #1', () => {
    expect(UPDATE({
      table: table,
      set: [table.id.eq(1)]
    }).toQuery()).toEqual(['UPDATE "table" SET "table".id = $1', [1]])
  })

  it('with', () => {
    const cte = SELECT({ from: table }).asCTE('cte')
    expect(UPDATE({
      with: [cte],
      table: { only: true, table },
      set: [table.id.eq(1)]
    }).toQuery()).toEqual(['WITH cte AS ( SELECT * FROM "table" ) UPDATE ONLY "table" SET "table".id = $1', [1]])
  })

  it('from', () => {
    const t = table.$.as('t')
    expect(UPDATE({
      table: table,
      set: [table.id.eq(t.id)],
      from: t
    }).toQuery()).toEqual(['UPDATE "table" SET "table".id = t.id FROM "table" AS t', []])
  })

  it('set', () => {
    const t = table.$.as('t')
    expect(UPDATE({
      table: table,
      set: {
        id: t.id,
        field: 1.5
      },
      from: t
    }).toQuery()).toEqual(['UPDATE "table" SET id = t.id, field = $1 FROM "table" AS t', [1.5]])
  })

  it('where', () => {
    expect(UPDATE({
      table: table,
      set: [table.id.eq(1)],
      where: table.id.eq(1)
    }).toQuery()).toEqual(['UPDATE "table" SET "table".id = $1 WHERE "table".id = $2', [1, 1]])
  })

  it('cursor', () => {
    expect(UPDATE({
      table: table,
      set: [table.id.eq(1)],
      whereCurrentOf: 'cursor'
    }).toQuery()).toEqual(['UPDATE "table" SET "table".id = $1 WHERE CURRENT OF "cursor"', [1]])
  })

  it('returning', () => {
    const query = UPDATE({
      table: table,
      set: [table.id.eq(1)],
      returning: '*'
    })
    expect(query.toQuery()).toEqual(['UPDATE "table" SET "table".id = $1 RETURNING *', [1]])
  })

  it('returning fields', () => {
    const query = UPDATE({
      table: table,
      set: [table.id.eq(1)],
      returning: {
        pk: table.id
      }
    })
    expect(query.toQuery()).toEqual(['UPDATE "table" SET "table".id = $1 RETURNING "table".id AS pk', [1]])
  })
})
