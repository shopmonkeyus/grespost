import { literal } from '../../expressions'
import { source } from '../../source/table'
import { ARRAY, BOOLEAN, INTEGER, TEXT } from '../../types'
import { ARR, ARRAY_APPEND, ARRAY_CAT, ARRAY_DIMS, ARRAY_FILL, ARRAY_LENGTH, ARRAY_LOWER, ARRAY_NDIMS, ARRAY_POSITION, ARRAY_POSITIONS, ARRAY_PREPEND, ARRAY_REMOVE, ARRAY_REPLACE, ARRAY_TO_STRING, ARRAY_UPPER, CARDINALITY, STRING_TO_ARRAY, UNNEST } from '../array'

describe('array functions', () => {
  it('array_append ( anyarray, anyelement ) → anyarray', () => {
    expect(ARRAY_APPEND([1, 2], 3).toQuery()).toEqual(
      [
        'ARRAY_APPEND($1, $2)',
        [
          [
            1,
            2
          ],
          3
        ]
      ]
    )
  })

  it('array_cat ( anyarray, anyarray ) → anyarray', () => {
    expect(ARRAY_CAT(ARR(1, 2, 3), ARR(4, 5)).toQuery()).toEqual(
      [
        'ARRAY_CAT(ARRAY[$1, $2, $3], ARRAY[$4, $5])',
        [
          1,
          2,
          3,
          4,
          5
        ]
      ]
    )
  })

  it('array_dims ( anyarray ) → text', () => {
    expect(ARRAY_DIMS(ARR([1, 2, 3], [4, 5, 6])).toQuery()).toEqual(
      [
        'ARRAY_DIMS(ARRAY[$1, $2])',
        [
          [
            1,
            2,
            3
          ],
          [
            4,
            5,
            6
          ]
        ]
      ]
    )
  })

  it('array_fill ( anyelement, integer[] [, integer[] ] ) → anyarray', () => {
    expect(ARRAY_FILL(11, ARR(2, 3).cast(ARRAY(INTEGER()))).toQuery()).toEqual(
      [
        'ARRAY_FILL($1, ARRAY[$2, $3]::INTEGER[])',
        [
          11,
          2,
          3
        ]
      ]
    )
  })

  it('array_length ( anyarray, integer ) → integer', () => {
    expect(ARRAY_LENGTH(ARR(1, 2, 3), 1).toQuery()).toEqual(
      [
        'ARRAY_LENGTH(ARRAY[$1, $2, $3], $4)',
        [
          1,
          2,
          3,
          1
        ]
      ]
    )
  })

  it('array_lower ( anyarray, integer ) → integer', () => {
    expect(ARRAY_LOWER(literal('[0:2]={1,2,3}').cast(ARRAY(INTEGER())), 1).toQuery()).toEqual(
      [
        'ARRAY_LOWER($1::INTEGER[], $2)',
        [
          '[0:2]={1,2,3}',
          1
        ]
      ]
    )
  })

  it('array_ndims ( anyarray ) → integer', () => {
    expect(ARRAY_NDIMS(ARR([1, 2, 3], [4, 5, 6])).toQuery()).toEqual(
      [
        'ARRAY_NDIMS(ARRAY[$1, $2])',
        [
          [
            1,
            2,
            3
          ],
          [
            4,
            5,
            6
          ]
        ]
      ]
    )
  })

  it('array_position ( anyarray, anyelement [, integer ] ) → integer', () => {
    expect(ARRAY_POSITION(ARR('SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'), 'MON').toQuery()).toEqual(
      [
        'ARRAY_POSITION(ARRAY[$1, $2, $3, $4, $5, $6, $7], $8)',
        [
          'SUN',
          'MON',
          'TUE',
          'WED',
          'THU',
          'FRI',
          'SAT',
          'MON'
        ]
      ]
    )
  })

  it('array_positions ( anyarray, anyelement ) → integer[]', () => {
    expect(ARRAY_POSITIONS(ARR('A', 'A', 'B', 'A'), 'A').toQuery()).toEqual(
      [
        'ARRAY_POSITIONS(ARRAY[$1, $2, $3, $4], $5)',
        [
          'A',
          'A',
          'B',
          'A',
          'A'
        ]
      ]
    )
  })

  it('array_prepend ( anyelement, anyarray ) → anyarray', () => {
    expect(ARRAY_PREPEND(1, ARR(2, 3)).toQuery()).toEqual(
      [
        'ARRAY_PREPEND($1, ARRAY[$2, $3])',
        [
          1,
          2,
          3
        ]
      ]
    )
  })

  it('array_remove ( anyarray, anyelement ) → anyarray', () => {
    expect(ARRAY_REMOVE(ARR(1, 2, 3, 2), 2).toQuery()).toEqual(
      [
        'ARRAY_REMOVE(ARRAY[$1, $2, $3, $4], $5)',
        [
          1,
          2,
          3,
          2,
          2
        ]
      ]
    )
  })

  it('array_replace ( anyarray, anyelement, anyelement ) → anyarray', () => {
    expect(ARRAY_REPLACE(ARR(1, 2, 5, 4), 5, 3).toQuery()).toEqual(
      [
        'ARRAY_REPLACE(ARRAY[$1, $2, $3, $4], $5, $6)',
        [
          1,
          2,
          5,
          4,
          5,
          3
        ]
      ]
    )
  })

  it('array_to_string ( array anyarray, delimiter text [, null_string text ] ) → text', () => {
    expect(ARRAY_TO_STRING(ARR(1, 2, 3, null, 5), ',', '*').toQuery()).toEqual(
      [
        'ARRAY_TO_STRING(ARRAY[$1, $2, $3, $4, $5], $6, $7)',
        [
          1,
          2,
          3,
          null,
          5,
          ',',
          '*'
        ]
      ]
    )
  })

  it('array_upper ( anyarray, integer ) → integer', () => {
    expect(ARRAY_UPPER(ARR(1, 8, 3, 7), 1).toQuery()).toEqual(
      [
        'ARRAY_UPPER(ARRAY[$1, $2, $3, $4], $5)',
        [
          1,
          8,
          3,
          7,
          1
        ]
      ]
    )
  })

  it('cardinality ( anyarray ) → integer', () => {
    expect(CARDINALITY(ARR([1, 2], [3, 4])).toQuery()).toEqual(
      [
        'CARDINALITY(ARRAY[$1, $2])',
        [
          [
            1,
            2
          ],
          [
            3,
            4
          ]
        ]
      ]
    )
  })

  it('string_to_array ( string text, delimiter text [, null_string text ] ) → text[]', () => {
    expect(STRING_TO_ARRAY('XX~~YY~~ZZ', '~~', 'YY').toQuery()).toEqual(
      [
        'STRING_TO_ARRAY($1, $2, $3)',
        [
          'XX~~YY~~ZZ',
          '~~',
          'YY'
        ]
      ]
    )
  })

  it('unnest ( anyarray ) → setof anyelement', () => {
    expect(UNNEST(ARR(1, 2)).toQuery()).toEqual(
      [
        'UNNEST(ARRAY[$1, $2])',
        [
          1,
          2
        ]
      ]
    )
  })
})
