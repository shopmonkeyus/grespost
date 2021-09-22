import { source } from '../../source'
import { ARRAY, TEXT } from '../../types'

describe('array expression', () => {
  const table = source('src', {
    field: ARRAY(TEXT())
  })
  it('#overlap', () => {
    expect(table.field.overlap(['NFC']).toQuery()).toEqual(
      [
        'src.field && $1',
        [
          [
            'NFC'
          ]
        ]
      ]
    )
  })

  it('#unshift', () => {
    expect(table.field.unshift('NFC').toQuery()).toEqual(
      [
        '$1 || src.field',
        [
          'NFC'
        ]
      ]
    )
  })

  it('#push', () => {
    expect(table.field.push('NFC').toQuery()).toEqual(
      [
        'src.field || $1',
        [
          'NFC'
        ]
      ]
    )
  })

  it('#item', () => {
    expect(table.field.item(0).toQuery()).toEqual(['src.field[$1]', [0]])
    expect(table.field.item(0, 5).toQuery()).toEqual(['src.field[$1:$2]', [0, 5]])
  })
})
