import { SELECT } from '../..'
import { BERNOULLI } from '../../../functions/sampling'
import { source } from '../../../source/table'
import { TEXT } from '../../../types'
import { stringifyFrom } from '../from'

describe('#from', () => {
  const some = source('some', {
    id: TEXT()
  })

  const foo = source('foo', {
    id: TEXT()
  })

  it('test 1', () => {
    expect(stringifyFrom([some, foo]).toQuery()).toEqual(['"some", foo', []])
  })

  it('test 1.1', () => {
    expect(stringifyFrom({
      only: true,
      source: some
    }).toQuery()).toEqual(['ONLY "some"', []])
  })

  it('test 2', () => {
    expect(stringifyFrom({
      only: true,
      source: some
    }).toQuery()).toEqual(['ONLY "some"', []])
  })

  it('test 3', () => {
    expect(stringifyFrom({
      only: true,
      source: foo,
      tablesample: BERNOULLI(0.5)
    }).toQuery()).toEqual(['ONLY foo TABLESAMPLE BERNOULLI($1)', [0.5]])
  })

  it('test 4', () => {
    expect(stringifyFrom({
      only: true,
      source: foo,
      tablesample: {
        method: BERNOULLI(0.5),
        repeatable: 42
      }
    }).toQuery()).toEqual(['ONLY foo TABLESAMPLE BERNOULLI($1) REPEATABLE($2)', [0.5, 42]])
  })

  it('test 5', () => {
    expect(stringifyFrom({
      lateral: true,
      source: SELECT({ from: foo }).as('foo')
    }).toQuery()).toEqual(['LATERAL ( SELECT * FROM foo ) AS foo', []])
  })

  it('test 6', () => {
    expect(stringifyFrom(SELECT({ from: foo }).as('foo', ['f1', 'f2'])).toQuery()).toEqual(['( SELECT * FROM foo ) AS foo ( f1, f2 )', []])
  })

  it('test 7', () => {
    const some = SELECT({ from: foo }).asCTE('some')
    expect(stringifyFrom(some.$.as('cte')).toQuery()).toEqual(['"some" AS cte', []])
  })

  it('test 8', () => {
    expect(stringifyFrom({
      source: foo,
      joins: [{
        type: 'INNER',
        source: some,
        on: foo.id.eq(some.id)
      }]
    }).toQuery()).toEqual(['foo INNER JOIN "some" ON foo.id = "some".id', []])
  })

  it('test 9', () => {
    expect(stringifyFrom({
      source: foo,
      joins: [{
        natural: true,
        type: 'LEFT',
        source: some,
        using: ['id']
      }]
    }).toQuery()).toEqual(['foo NATURAL LEFT JOIN "some" USING ( id )', []])
  })

  it('test 10', () => {
    const any = SELECT({ from: some }).as('any')
    expect(stringifyFrom({
      source: foo,
      joins: [{
        type: 'CROSS',
        source: any,
        on: [some.id.eq(any.id), 'AND', some.id.isNot(null)]
      }]
    }).toQuery()).toEqual(['foo CROSS JOIN ( SELECT * FROM "some" ) AS "any" ON ( "some".id = "any".id AND "some".id IS NOT NULL )', []])
  })
})
