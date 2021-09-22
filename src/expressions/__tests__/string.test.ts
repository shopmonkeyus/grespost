import { source } from '../../source'
import { DOUBLE, TEXT } from '../../types'

describe('string expression', () => {
  const table = source('src', {
    field: TEXT()
  })

  it('#concat', () => {
    expect(table.field.concat('NFC').toQuery()).toEqual(
      [
        'src.field || $1',
        [
          'NFC'
        ]
      ]
    )
  })

  it('#isNormalized', () => {
    expect(table.field.isNormalized('NFC').toQuery()).toEqual(
      [
        'src.field IS NFC NORMALIZED',
        []
      ]
    )

    expect(table.field.isNormalized().toQuery()).toEqual(
      [
        'src.field IS NORMALIZED',
        []
      ]
    )
  })

  it('#isNotNormalized', () => {
    expect(table.field.isNotNormalized('NFC').toQuery()).toEqual(
      [
        'src.field IS NOT NFC NORMALIZED',
        []
      ]
    )

    expect(table.field.isNotNormalized().toQuery()).toEqual(
      [
        'src.field IS NOT NORMALIZED',
        []
      ]
    )
  })

  it('#like', () => {
    expect(table.field.like('NFC', 'some').toQuery()).toEqual(
      [
        'src.field LIKE $1 ESCAPE $2',
        [
          'NFC',
          'some'
        ]
      ]
    )

    expect(table.field.like('NFC').toQuery()).toEqual(
      [
        'src.field LIKE $1',
        [
          'NFC'
        ]
      ]
    )
  })

  it('#notLike', () => {
    expect(table.field.notLike('NFC', 'some').toQuery()).toEqual(
      [
        'src.field NOT LIKE $1 ESCAPE $2',
        [
          'NFC',
          'some'
        ]
      ]
    )

    expect(table.field.notLike('NFC').toQuery()).toEqual(
      [
        'src.field NOT LIKE $1',
        [
          'NFC'
        ]
      ]
    )
  })

  it('#similarTo', () => {
    expect(table.field.similarTo('NFC', 'some').toQuery()).toEqual(
      [
        'src.field SIMILAR TO $1 ESCAPE $2',
        [
          'NFC',
          'some'
        ]
      ]
    )

    expect(table.field.similarTo('NFC').toQuery()).toEqual(
      [
        'src.field SIMILAR TO $1',
        [
          'NFC'
        ]
      ]
    )
  })

  it('#notSimilarTo', () => {
    expect(table.field.notSimilarTo('NFC', 'some').toQuery()).toEqual(
      [
        'src.field NOT SIMILAR TO $1 ESCAPE $2',
        [
          'NFC',
          'some'
        ]
      ]
    )

    expect(table.field.notSimilarTo('NFC').toQuery()).toEqual(
      [
        'src.field NOT SIMILAR TO $1',
        [
          'NFC'
        ]
      ]
    )
  })

  it('#matchRegex', () => {
    expect(table.field.matchRegex('NFC').toQuery()).toEqual(
      [
        'src.field ~ $1',
        [
          'NFC'
        ]
      ]
    )
    expect(table.field.matchRegex('NFC', false).toQuery()).toEqual(
      [
        'src.field ~* $1',
        [
          'NFC'
        ]
      ]
    )
  })

  it('#notMatchRegex', () => {
    expect(table.field.notMatchRegex('NFC').toQuery()).toEqual(
      [
        'src.field !~ $1',
        [
          'NFC'
        ]
      ]
    )
    expect(table.field.notMatchRegex('NFC', false).toQuery()).toEqual(
      [
        'src.field !~* $1',
        [
          'NFC'
        ]
      ]
    )
  })
})
