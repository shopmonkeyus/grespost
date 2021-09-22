import { source } from '../../source'
import { DOUBLE } from '../../types'

describe('number expression', () => {
  const table = source('src', {
    field: DOUBLE()
  })

  it('#add', () => {
    expect(table.field.add(5).toQuery()).toEqual(
      [
        '(src.field + $1)',
        [
          5
        ]
      ]
    )
  })

  it('#sub', () => {
    expect(table.field.sub(5).toQuery()).toEqual(
      [
        '(src.field - $1)',
        [
          5
        ]
      ]
    )
  })

  it('#mul', () => {
    expect(table.field.mul(5).toQuery()).toEqual(
      [
        '(src.field * $1)',
        [
          5
        ]
      ]
    )
  })

  it('#div', () => {
    expect(table.field.div(5).toQuery()).toEqual(
      [
        '(src.field / $1)',
        [
          5
        ]
      ]
    )
  })

  it('#mod', () => {
    expect(table.field.mod(5).toQuery()).toEqual(
      [
        '(src.field % $1)',
        [
          5
        ]
      ]
    )
  })

  it('#neg', () => {
    expect(table.field.neg().toQuery()).toEqual(
      [
        '(- src.field)',
        []
      ]
    )
  })

  it('#abs', () => {
    expect(table.field.abs().toQuery()).toEqual(
      [
        '(@ src.field)',
        []
      ]
    )
  })

  it('#pow', () => {
    expect(table.field.pow(5).toQuery()).toEqual(
      [
        '(src.field ^ $1)',
        [
          5
        ]
      ]
    )
  })

  it('#sqrt', () => {
    expect(table.field.sqrt().toQuery()).toEqual(
      [
        '(|/ src.field)',
        []
      ]
    )
  })

  it('#cbrt', () => {
    expect(table.field.cbrt().toQuery()).toEqual(
      [
        '(||/ src.field)',
        []
      ]
    )
  })
})
