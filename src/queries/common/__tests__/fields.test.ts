import { INTEGER } from '../../..'
import { literal } from '../../../expressions'
import { stringifyFields } from '../fields'

describe('#stringifyFields', () => {
  it('test', () => {
    expect(stringifyFields({
      one: 1,
      two: literal(2).cast(INTEGER()).add(5),
      some: 3
    }).toQuery()).toEqual(['$1 AS one, ($2::INTEGER + $3) AS two, $4 AS "some"', [1, 2, 5, 3]])
  })
})
