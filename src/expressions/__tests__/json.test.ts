import { source } from '../../source'
import { JSONB } from '../../types'

describe('json expression', () => {
  const table = source('src', {
    field: JSONB()
  })

  it('#get', () => {
    expect(table.field.get('NFC').toQuery()).toEqual(
      [
        'src.field -> $1',
        [
          'NFC'
        ]
      ]
    )
  })

  it('#getText', () => {
    expect(table.field.getText('NFC').toQuery()).toEqual(
      [
        'src.field ->> $1',
        [
          'NFC'
        ]
      ]
    )
  })

  it('#getByPath', () => {
    expect(table.field.getByPath(['NFC']).toQuery()).toEqual(
      [
        'src.field #> $1',
        [
          [
            'NFC'
          ]
        ]
      ]
    )
  })

  it('#getTextByPath', () => {
    expect(table.field.getTextByPath(['NFC']).toQuery()).toEqual(
      [
        'src.field #>> $1',
        [
          [
            'NFC'
          ]
        ]
      ]
    )
  })

  it('#includes', () => {
    expect(table.field.includes('NFC').toQuery()).toEqual(
      [
        'src.field ? $1',
        [
          'NFC'
        ]
      ]
    )
  })

  it('#includesAny', () => {
    expect(table.field.includesAny(['NFC']).toQuery()).toEqual(
      [
        'src.field ?| $1',
        [
          [
            'NFC'
          ]
        ]
      ]
    )
  })

  it('#includesAll', () => {
    expect(table.field.includesAll(['NFC']).toQuery()).toEqual(
      [
        'src.field ?& $1',
        [
          [
            'NFC'
          ]
        ]
      ]
    )
  })

  it('#unset', () => {
    expect(table.field.unset('NFC').toQuery()).toEqual(
      [
        'src.field - $1',
        [
          'NFC'
        ]
      ]
    )
  })

  it('#unsetAll', () => {
    expect(table.field.unsetAll(['NFC']).toQuery()).toEqual(
      [
        'src.field - $1',
        [
          [
            'NFC'
          ]
        ]
      ]
    )
  })

  it('#unsetByPath', () => {
    expect(table.field.unsetByPath(['NFC']).toQuery()).toEqual(
      [
        'src.field #- $1',
        [
          [
            'NFC'
          ]
        ]
      ]
    )
  })

  it('#jsonPathExist', () => {
    expect(table.field.jsonPathExist('NFC').toQuery()).toEqual(
      [
        'src.field @? $1',
        [
          'NFC'
        ]
      ]
    )
  })

  it('#jsonPathCheck', () => {
    expect(table.field.jsonPathCheck('NFC').toQuery()).toEqual(
      [
        'src.field @@ $1',
        [
          'NFC'
        ]
      ]
    )
  })
})
