import { BERNOULLI, SYSTEM } from '../sampling'

describe('sampling functions', () => {
  it('BERNOULI', () => {
    expect(BERNOULLI(0.5).toQuery()).toEqual(
      [
        'BERNOULLI($1)',
        [
          0.5
        ]
      ])
  })

  it('SYSTEM', () => {
    expect(SYSTEM(0.5).toQuery()).toEqual(
      [
        'SYSTEM($1)',
        [
          0.5
        ]
      ]
    )
  })
})
