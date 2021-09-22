import { VALUES } from '../values'

describe('values query', () => {
  it('from array', () => {
    expect(VALUES([[1, 2, 3]]).toQuery())
      .toEqual(['VALUES ( $1, $2, $3 )', [1, 2, 3]])
  })

  it('from record', () => {
    expect(VALUES([{ id: 1, num: 5 }, { id: 2 }]).toQuery())
      .toEqual(['VALUES ( $1, $2 ), ( $3, $4 )', [1, 5, 2, null]])
  })

  it('from pairs', () => {
    expect(VALUES({ columns: ['id'], values: [[1], [undefined]] }).toQuery())
      .toEqual(['VALUES ( $1 ), ( $2 )', [1, null]])
  })
})
