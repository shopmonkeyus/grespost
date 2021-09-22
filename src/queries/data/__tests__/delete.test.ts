import { DELETE } from '../..'
import { source } from '../../../source'
import { UUID } from '../../../types'
import { SELECT } from '../select'

describe('delete query', () => {
  const table = source('table', {
    id: UUID()
  })

  it('test #1', () => {
    expect(DELETE({ from: table }).toQuery()).toEqual(['DELETE FROM "table"', []])
  })

  it('with', () => {
    const cte = SELECT({ from: table }).asCTE('cte')
    expect(DELETE({
      with: [cte],
      from: { only: true, table },
      where: table.id.eq(cte.id)
    }).toQuery()).toEqual(['WITH cte AS ( SELECT * FROM "table" ) DELETE FROM ONLY "table" WHERE "table".id = cte.id', []])
  })

  it('using', () => {
    expect(DELETE({
      from: table,
      using: table
    }).toQuery())
      .toEqual(['DELETE FROM "table" USING "table"', []])
  })

  it('where current of', () => {
    expect(DELETE({
      from: table,
      whereCurrentOf: 'cursor'
    }).toQuery()).toEqual(['DELETE FROM "table" WHERE CURRENT OF "cursor"', []])
  })

  it('returning *', () => {
    const del = DELETE({
      from: table,
      returning: '*'
    })
    expect(del.toQuery()).toEqual(['DELETE FROM "table" RETURNING *', []])
  })

  it('returning', () => {
    const del = DELETE({
      from: table,
      returning: {
        pk: table.id
      }
    })
    expect(del.toQuery()).toEqual(['DELETE FROM "table" RETURNING "table".id AS pk', []])
  })
})
