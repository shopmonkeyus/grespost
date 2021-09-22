import { source } from '../../source'
import { INTEGER } from '../../types'

describe('integral expression', () => {
  const table = source('src', {
    field: INTEGER()
  })

  it('#and', () => {
    expect(table.field.and(1).toQuery()).toEqual(
      [
        'src.field & $1',
        [
          1
        ]
      ]
    )
  })

  it('#or', () => {
    expect(table.field.or(1).toQuery()).toEqual(
      [
        'src.field | $1',
        [
          1
        ]
      ]
    )
  })

  it('#xor', () => {
    expect(table.field.xor(1).toQuery()).toEqual(
      [
        'src.field # $1',
        [
          1
        ]
      ]
    )
  })

  it('#not', () => {
    expect(table.field.not().toQuery()).toEqual(
      [
        '~ src.field',
        []
      ]
    )
  })

  it('#lshift', () => {
    expect(table.field.lshift(1).toQuery()).toEqual(
      [
        'src.field << $1',
        [
          1
        ]
      ]
    )
  })

  it('#rshift', () => {
    expect(table.field.rshift(1).toQuery()).toEqual(
      [
        'src.field >> $1',
        [
          1
        ]
      ]
    )
  })
})
