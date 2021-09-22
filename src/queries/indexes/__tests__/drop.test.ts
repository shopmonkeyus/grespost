import { stringifyDropIndex } from '../drop'

describe('drop index query', () => {
  it('test #1', () => {
    expect(stringifyDropIndex({
      names: ['some', 'any']
    }).toQuery()).toEqual(['DROP INDEX "some", "any"', []])
  })

  it('with params', () => {
    expect(stringifyDropIndex({
      concurently: true,
      ifExists: true,
      names: ['some', 'any'],
      constraint: 'CASCADE'
    }).toQuery()).toEqual(['DROP INDEX CONCURRENTLY IF EXISTS "some", "any" CASCADE', []])
  })
})
