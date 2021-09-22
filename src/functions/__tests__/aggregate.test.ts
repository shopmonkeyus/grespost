import { source } from '../../source/table'
import { BOOLEAN, INTEGER, TEXT } from '../../types'
import { ARRAY_AGG, AVG, BIT_AND, BIT_OR, BOOL_AND, BOOL_OR, COUNT, EVERY, JSON_AGG, JSONB_AGG, JSON_OBJECT_AGG, JSONB_OBJECT_AGG, MAX, MIN, STRING_AGG, SUM } from '../aggregate'

describe('aggregate functions', () => {
  const table = source('table', {
    id: TEXT(),
    num: INTEGER(),
    bool: BOOLEAN()
  })

  it('array_agg ( anynonarray ) → anyarray', () => {
    expect(ARRAY_AGG(table.id, {
      distinct: true,
      orderBy: [table.id],
      withinGroup: [table.id],
      filterWhere: table.id.isNot(null)
    }).toQuery()).toEqual(
      [
        'ARRAY_AGG(DISTINCT "table".id ORDER BY "table".id) WITHIN GROUP ( ORDER BY "table".id ) FILTER ( WHERE "table".id IS NOT $1 )',
        [null]
      ]
    )
  })

  it('array_agg ( anyarray ) → anyarray', () => {
    expect(ARRAY_AGG(table.id, { distinct: false }).toQuery()).toEqual(
      [
        'ARRAY_AGG(ALL "table".id)',
        []
      ]
    )
  })

  it('avg ( smallint ) → numeric', () => {
    expect(AVG(table.num, {}).toQuery()).toEqual(
      [
        'AVG("table".num)',
        []
      ]
    )
  })

  it('avg ( integer ) → numeric', () => {
    expect(AVG(table.num).toQuery()).toEqual(
      [
        'AVG("table".num)',
        []
      ]
    )
  })

  it('avg ( bigint ) → numeric', () => {
    expect(AVG(table.num).toQuery()).toEqual(
      [
        'AVG("table".num)',
        []
      ]
    )
  })

  it('avg ( numeric ) → numeric', () => {
    expect(AVG(table.num).toQuery()).toEqual(
      [
        'AVG("table".num)',
        []
      ]
    )
  })

  it('avg ( real ) → double precision', () => {
    expect(AVG(table.num).toQuery()).toEqual(
      [
        'AVG("table".num)',
        []
      ]
    )
  })

  it('avg ( double precision ) → double precision', () => {
    expect(AVG(table.num).toQuery()).toEqual(
      [
        'AVG("table".num)',
        []
      ]
    )
  })

  it('avg ( interval ) → interval', () => {
    expect(AVG(table.num).toQuery()).toEqual(
      [
        'AVG("table".num)',
        []
      ]
    )
  })

  it('bit_and ( smallint ) → smallint', () => {
    expect(BIT_AND(table.num).toQuery()).toEqual(
      [
        'BIT_AND("table".num)',
        []
      ]
    )
  })

  it('bit_and ( integer ) → integer', () => {
    expect(BIT_AND(table.num).toQuery()).toEqual(
      [
        'BIT_AND("table".num)',
        []
      ]
    )
  })

  it('bit_and ( bigint ) → bigint', () => {
    expect(BIT_AND(table.num).toQuery()).toEqual(
      [
        'BIT_AND("table".num)',
        []
      ]
    )
  })

  it('bit_and ( bit ) → bit', () => {
    expect(BIT_AND(table.num).toQuery()).toEqual(
      [
        'BIT_AND("table".num)',
        []
      ]
    )
  })

  it('bit_or ( smallint ) → smallint', () => {
    expect(BIT_OR(table.num).toQuery()).toEqual(
      [
        'BIT_OR("table".num)',
        []
      ]
    )
  })

  it('bit_or ( integer ) → integer', () => {
    expect(BIT_OR(table.num).toQuery()).toEqual(
      [
        'BIT_OR("table".num)',
        []
      ]
    )
  })

  it('bit_or ( bigint ) → bigint', () => {
    expect(BIT_OR(table.num).toQuery()).toEqual(
      [
        'BIT_OR("table".num)',
        []
      ]
    )
  })

  it('bit_or ( bit ) → bit', () => {
    expect(BIT_OR(table.num).toQuery()).toEqual(
      [
        'BIT_OR("table".num)',
        []
      ]
    )
  })

  it('bool_and ( boolean ) → boolean', () => {
    expect(BOOL_AND(table.bool).toQuery()).toEqual(
      [
        'BOOL_AND("table".bool)',
        []
      ]
    )
  })

  it('bool_or ( boolean ) → boolean', () => {
    expect(BOOL_OR(table.bool).toQuery()).toEqual(
      [
        'BOOL_OR("table".bool)',
        []
      ]
    )
  })

  it('count ( * ) → bigint', () => {
    expect(COUNT(table.num).toQuery()).toEqual(
      [
        'COUNT("table".num)',
        []
      ]
    )
    expect(COUNT('*').toQuery()).toEqual(
      [
        'COUNT(*)',
        []
      ]
    )
  })

  it('count ( "any" ) → bigint', () => {
    expect(COUNT(table.num).toQuery()).toEqual(
      [
        'COUNT("table".num)',
        []
      ]
    )
  })

  it('every ( boolean ) → boolean', () => {
    expect(EVERY(table.bool).toQuery()).toEqual(
      [
        'EVERY("table".bool)',
        []
      ]
    )
  })

  it('json_agg ( anyelement ) → json', () => {
    expect(JSON_AGG(table.num).toQuery()).toEqual(
      [
        'JSON_AGG("table".num)',
        []
      ]
    )
  })

  it('jsonb_agg ( anyelement ) → jsonb', () => {
    expect(JSONB_AGG(table.id).toQuery()).toEqual(
      [
        'JSONB_AGG("table".id)',
        []
      ]
    )
  })

  it('json_object_agg ( key "any", value "any" ) → json', () => {
    expect(JSON_OBJECT_AGG(table.id, table.num).toQuery()).toEqual(
      [
        'JSON_OBJECT_AGG("table".id, "table".num)',
        []
      ]
    )
  })

  it('jsonb_object_agg ( key "any", value "any" ) → jsonb', () => {
    expect(JSONB_OBJECT_AGG(table.id, table.num).toQuery()).toEqual(
      [
        'JSONB_OBJECT_AGG("table".id, "table".num)',
        []
      ]
    )
  })

  it('max ( see text ) → same as input type', () => {
    expect(MAX(table.num).toQuery()).toEqual(
      [
        'MAX("table".num)',
        []
      ]
    )
  })

  it('min ( see text ) → same as input type', () => {
    expect(MIN(table.num).toQuery()).toEqual(
      [
        'MIN("table".num)',
        []
      ]
    )
  })

  it('string_agg ( value text, delimiter text ) → text', () => {
    expect(STRING_AGG(table.id, ':').toQuery()).toEqual(
      [
        'STRING_AGG("table".id, $1)',
        [
          ':'
        ]
      ]
    )
  })

  it('string_agg ( value bytea, delimiter bytea ) → bytea', () => {
    expect(STRING_AGG(table.id, ':').toQuery()).toEqual(
      [
        'STRING_AGG("table".id, $1)',
        [
          ':'
        ]
      ]
    )
  })

  it('sum ( smallint ) → bigint', () => {
    expect(SUM(table.num).toQuery()).toEqual(
      [
        'SUM("table".num)',
        []
      ]
    )
  })

  it('sum ( integer ) → bigint', () => {
    expect(SUM(table.num).toQuery()).toEqual(
      [
        'SUM("table".num)',
        []
      ]
    )
  })

  it('sum ( bigint ) → numeric', () => {
    expect(SUM(table.num).toQuery()).toEqual(
      [
        'SUM("table".num)',
        []
      ]
    )
  })

  it('sum ( numeric ) → numeric', () => {
    expect(SUM(table.num).toQuery()).toEqual(
      [
        'SUM("table".num)',
        []
      ]
    )
  })

  it('sum ( real ) → real', () => {
    expect(SUM(table.num).toQuery()).toEqual(
      [
        'SUM("table".num)',
        []
      ]
    )
  })

  it('sum ( double precision ) → double precision', () => {
    expect(SUM(table.num).toQuery()).toEqual(
      [
        'SUM("table".num)',
        []
      ]
    )
  })

  it('sum ( interval ) → interval', () => {
    expect(SUM(table.num).toQuery()).toEqual(
      [
        'SUM("table".num)',
        []
      ]
    )
  })

  it('sum ( money ) → money', () => {
    expect(SUM(table.num).toQuery()).toEqual(
      [
        'SUM("table".num)',
        []
      ]
    )
  })
})
