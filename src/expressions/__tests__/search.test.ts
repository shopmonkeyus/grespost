import { source } from '../../source'
import { TSQUERY, TSVECTOR } from '../../types'

describe('text search expression', () => {
  const table = source('src', {
    vector: TSVECTOR(),
    query: TSQUERY()
  })

  it('#match', () => {
    expect(table.vector.match('NFC').toQuery()).toEqual(
      [
        'src.vector @@ $1',
        [
          'NFC'
        ]
      ]
    )
  })

  it('#also', () => {
    expect(table.query.also('NFC').toQuery()).toEqual(
      [
        'src.query && $1',
        [
          'NFC'
        ]
      ]
    )
  })

  it('#either', () => {
    expect(table.query.either('NFC').toQuery()).toEqual(
      [
        'src.query || $1',
        [
          'NFC'
        ]
      ]
    )
  })

  it('#no', () => {
    expect(table.query.no().toQuery()).toEqual(
      [
        '!! src.query',
        []
      ]
    )
  })

  it('#successive', () => {
    expect(table.query.successive('NFC').toQuery()).toEqual(
      [
        'src.query <-> $1',
        [
          'NFC'
        ]
      ]
    )
  })
})
