import { sql } from '../../template'
import { QueryDefinition } from '../query'

describe('#Query', () => {
  const query = new QueryDefinition(sql`SELECT *`, ['now'])

  it('regular', () => {
    expect(query.toQuery()).toEqual(['SELECT *', []])
    expect(query.toSource().toQuery()).toEqual(['( SELECT * )', []])
  })

  it('aliased', () => {
    const aliased = query.as('foo')

    expect(aliased.now.toQuery()).toEqual(['foo.now', []])

    expect(aliased.$.toQuery()).toEqual(['foo', []])
    expect(aliased.$.toSource().toQuery()).toEqual(['( SELECT * ) AS foo', []])
  })

  it('cte', () => {
    const cte = query.asCTE('cte')

    expect(cte.now.toQuery()).toEqual(['cte.now', []])

    expect(cte.$.toQuery()).toEqual(['cte', []])
    expect(cte.$.toSource().toQuery()).toEqual(['cte', []])

    const cte1 = query.asCTE('cte1')

    expect(cte1.now.toQuery()).toEqual(['cte1.now', []])

    expect(cte1.$.toQuery()).toEqual(['cte1', []])
    expect(cte1.$.toSource().toQuery()).toEqual(['cte1', []])
  })

  it('aliased cte', () => {
    const cte = query.asCTE('cte')

    const acte = cte.$.as('acte')

    expect(acte.now.toQuery()).toEqual(['acte.now', []])

    expect(acte.$.toQuery()).toEqual(['acte', []])
    expect(acte.$.toSource().toQuery()).toEqual(['cte AS acte', []])

    const bcte = cte.$.as('bcte')

    expect(bcte.now.toQuery()).toEqual(['bcte.now', []])

    expect(bcte.$.toQuery()).toEqual(['bcte', []])
    expect(bcte.$.toSource().toQuery()).toEqual(['cte AS bcte', []])
  })

  it('throws error if try to define $ column', () => {
    expect(() => new QueryDefinition(sql`SELECT *`, ['$']).as('some'))
      .toThrowError('Column name \'$\' is reserved in source definition')
  })
})
