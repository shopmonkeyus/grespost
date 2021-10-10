import { SELECT } from '../..'
import { source } from '../../source'
import { CHAR, TEXT } from '../../types'

describe('any expression', () => {
  const table = source('src', {
    field: TEXT()
  })

  it('#as', () => {
    expect(table.field.as('NFC', ['some']).toSource().toQuery()).toEqual(
      [
        'src.field AS "NFC" ( "some" )',
        []
      ]
    )
    expect(table.field.as('NFC', ['some']).toQuery()).toEqual(
      [
        '"NFC"',
        []
      ]
    )
  })

  it('#toSource', () => {
    expect(table.field.toSource().toQuery()).toEqual(
      [
        'src.field',
        []
      ]
    )
  })

  it('#cast', () => {
    expect(table.field.cast(CHAR()).toQuery()).toEqual(
      [
        'src.field::CHAR',
        []
      ]
    )
  })

  it('#eq', () => {
    expect(table.field.eq('NFC').toQuery()).toEqual(
      [
        'src.field = $1',
        [
          'NFC'
        ]
      ]
    )
  })

  it('#ne', () => {
    expect(table.field.ne('NFC').toQuery()).toEqual(
      [
        'src.field != $1',
        [
          'NFC'
        ]
      ]
    )
  })

  it('#is', () => {
    expect(table.field.is('UNKNOWN').toQuery()).toEqual(
      [
        'src.field IS UNKNOWN',
        []
      ]
    )
    expect(table.field.is(null).toQuery()).toEqual(
      [
        'src.field IS NULL',
        []
      ]
    )
  })

  it('#isNot', () => {
    expect(table.field.isNot('UNKNOWN').toQuery()).toEqual(
      [
        'src.field IS NOT UNKNOWN',
        []
      ]
    )
    expect(table.field.isNot(null).toQuery()).toEqual(
      [
        'src.field IS NOT NULL',
        []
      ]
    )
  })

  it('#isDistinctFrom', () => {
    expect(table.field.isDistinctFrom('NFC').toQuery()).toEqual(
      [
        'src.field IS DISTINCT FROM $1',
        [
          'NFC'
        ]
      ]
    )
  })

  it('#isNotDistinctFrom', () => {
    expect(table.field.isNotDistinctFrom('NFC').toQuery()).toEqual(
      [
        'src.field IS NOT DISTINCT FROM $1',
        [
          'NFC'
        ]
      ]
    )
  })

  it('#gt', () => {
    expect(table.field.gt('NFC').toQuery()).toEqual(
      [
        'src.field > $1',
        [
          'NFC'
        ]
      ]
    )
  })

  it('#lt', () => {
    expect(table.field.lt('NFC').toQuery()).toEqual(
      [
        'src.field < $1',
        [
          'NFC'
        ]
      ]
    )
  })

  it('#gte', () => {
    expect(table.field.gte('NFC').toQuery()).toEqual(
      [
        'src.field >= $1',
        [
          'NFC'
        ]
      ]
    )
  })

  it('#lte', () => {
    expect(table.field.lte('NFC').toQuery()).toEqual(
      [
        'src.field <= $1',
        [
          'NFC'
        ]
      ]
    )
  })

  it('#gl', () => {
    expect(table.field.gl('NFC').toQuery()).toEqual(
      [
        'src.field <> $1',
        [
          'NFC'
        ]
      ]
    )
  })

  it('#between', () => {
    expect(table.field.between('NFC', 'some').toQuery()).toEqual(
      [
        'src.field BETWEEN $1 AND $2',
        [
          'NFC',
          'some'
        ]
      ]
    )
  })

  it('#notBetween', () => {
    expect(table.field.notBetween('NFC', 'some').toQuery()).toEqual(
      [
        'src.field NOT BETWEEN $1 AND $2',
        [
          'NFC',
          'some'
        ]
      ]
    )
  })

  it('#betweenSymetric', () => {
    expect(table.field.betweenSymetric('NFC', 'some').toQuery()).toEqual(
      [
        'src.field BETWEEN SYMETRIC $1 AND $2',
        [
          'NFC',
          'some'
        ]
      ]
    )
  })

  it('#notBetweenSymetric', () => {
    expect(table.field.notBetweenSymetric('NFC', 'some').toQuery()).toEqual(
      [
        'src.field NOT BETWEEN SYMETRIC $1 AND $2',
        [
          'NFC',
          'some'
        ]
      ]
    )
  })

  it('#in', () => {
    expect(table.field.in(SELECT({ fields: { one: 1 } })).toQuery()).toEqual(
      [
        'src.field IN (SELECT $1 AS one)',
        [
          1
        ]
      ]
    )
    expect(table.field.in('NFC', 'some', 'test').toQuery()).toEqual(
      [
        'src.field IN ($1, $2, $3)',
        [
          'NFC',
          'some',
          'test'
        ]
      ]
    )
  })

  it('#notIn', () => {
    expect(table.field.notIn(SELECT({ fields: { one: 1 } })).toQuery()).toEqual(
      [
        'src.field NOT IN (SELECT $1 AS one)',
        [
          1
        ]
      ]
    )
    expect(table.field.notIn('NFC', 'some', 'test').toQuery()).toEqual(
      [
        'src.field NOT IN ($1, $2, $3)',
        [
          'NFC',
          'some',
          'test'
        ]
      ]
    )
  })

  it('#contain', () => {
    expect(table.field.contain('NFC').toQuery()).toEqual(
      [
        'src.field @> $1',
        [
          'NFC'
        ]
      ]
    )
  })

  it('#contained', () => {
    expect(table.field.contained('NFC').toQuery()).toEqual(
      [
        'src.field <@ $1',
        [
          'NFC'
        ]
      ]
    )
  })
})
