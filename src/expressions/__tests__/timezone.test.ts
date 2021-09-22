import { source } from '../../source'
import { TIMESTAMP } from '../../types'

describe('text search expression', () => {
  const table = source('src', {
    field: TIMESTAMP()
  })

  it('#tz', () => {
    expect(table.field.tz('UTC').toQuery()).toEqual(
      [
        'src.field AT TIME ZONE $1',
        [
          'UTC'
        ]
      ]
    )
  })
})
