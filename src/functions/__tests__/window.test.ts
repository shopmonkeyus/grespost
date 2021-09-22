import { INTEGER, source } from '../..'
import { ROW_NUMBER, RANK, DENSE_RANK, PERCENT_RANK, CUME_DIST, NTILE, LAG, LEAD, FIRST_VALUE, LAST_VALUE, NTH_VALUE } from '../window'

describe('window functions', () => {
  const src = source('src', {
    id: INTEGER()
  })

  it('row_number () → bigint', () => {
    expect(ROW_NUMBER({ filterWhere: src.id.eq(1), over: { name: 'some' } }).toQuery()).toEqual(
      [
        'ROW_NUMBER() FILTER ( WHERE src.id = $1 ) OVER ( "some" )',
        [1]
      ]
    )
  })

  it('rank () → bigint', () => {
    expect(RANK({ over: { partitionBy: [src.id], orderBy: [src.id] } }).toQuery()).toEqual(
      [
        'RANK() OVER ( PARTITION BY src.id ORDER BY src.id )',
        []
      ]
    )
  })

  it('dense_rank () → bigint', () => {
    expect(DENSE_RANK({ over: { frame: { type: 'ROWS', start: { type: 'FOLLOWING', offset: 1 }, exclude: 'CURRENT ROW' } } }).toQuery()).toEqual(
      [
        'DENSE_RANK() OVER ( ROWS $1 FOLLOWING EXCLUDE CURRENT ROW )',
        [1]
      ]
    )
  })

  it('percent_rank () → double precision', () => {
    expect(PERCENT_RANK({ over: { frame: { type: 'ROWS', start: { type: 'CURRENT ROW' }, end: { type: 'UNBOUNDED FOLLOWING' } } } }).toQuery()).toEqual(
      [
        'PERCENT_RANK() OVER ( ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING )',
        []
      ]
    )
  })

  it('cume_dist () → double precision', () => {
    expect(CUME_DIST().toQuery()).toEqual(
      [
        'CUME_DIST()',
        []
      ]
    )
  })

  it('ntile ( num_buckets integer ) → integer', () => {
    expect(NTILE('some', { over: { name: 'some' } }).toQuery()).toEqual(
      [
        'NTILE($1) OVER ( "some" )',
        [
          'some'
        ]
      ]
    )
  })

  it('lag ( value anyelement [, offset integer [, default anyelement ]] ) → anyelement', () => {
    expect(LAG('some', { over: { name: 'some' } }).toQuery()).toEqual(
      [
        'LAG($1) OVER ( "some" )',
        [
          'some'
        ]
      ]
    )
  })

  it('lead ( value anyelement [, offset integer [, default anyelement ]] ) → anyelement', () => {
    expect(LEAD('some', { over: { name: 'some' } }).toQuery()).toEqual(
      [
        'LEAD($1) OVER ( "some" )',
        [
          'some'
        ]
      ]
    )
  })

  it('first_value ( value anyelement ) → anyelement', () => {
    expect(FIRST_VALUE('some', { over: { name: 'some' } }).toQuery()).toEqual(
      [
        'FIRST_VALUE($1) OVER ( "some" )',
        [
          'some'
        ]
      ]
    )
  })

  it('last_value ( value anyelement ) → anyelement', () => {
    expect(LAST_VALUE('some', { over: { name: 'some' } }).toQuery()).toEqual(
      [
        'LAST_VALUE($1) OVER ( "some" )',
        [
          'some'
        ]
      ]
    )
  })

  it('nth_value ( value anyelement, n integer ) → anyelement', () => {
    expect(NTH_VALUE('some', 1, { over: { name: 'some' } }).toQuery()).toEqual(
      [
        'NTH_VALUE($1, $2) OVER ( "some" )',
        [
          'some',
          1
        ]
      ]
    )
  })
})
