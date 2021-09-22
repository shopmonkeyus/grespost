import { BIT, SMALLINT } from '../../../types'
import { source } from '../../../source'
import { INSERT } from '../../'
import { SELECT } from '../select'

describe('Insert Query', () => {
  const table = source('table', {
    id: SMALLINT(),
    bit: BIT()
  })

  it('test #1', () => {
    const ins = INSERT({
      into: table,
      values: {
        columns: ['id', 'bit'],
        values: [[1, 0], [2, 1], [3, 0]]
      }
    })
    expect(ins.toQuery()).toEqual(['INSERT INTO "table" ( id, "bit" ) VALUES ( $1, $2 ), ( $3, $4 ), ( $5, $6 )', [1, 0, 2, 1, 3, 0]])
  })

  it('test #2', () => {
    const ins = INSERT({
      into: table,
      values: {
        values: [[1, 0], [2, 1], [3, 0]]
      }
    })
    expect(ins.toQuery()).toEqual(['INSERT INTO "table" VALUES ( $1, $2 ), ( $3, $4 ), ( $5, $6 )', [1, 0, 2, 1, 3, 0]])
  })

  it('with', () => {
    const cte = SELECT({ from: table }).asCTE('cte')
    const ins = INSERT({
      with: [cte],
      into: table,
      values: cte
    })
    expect(ins.toQuery())
      .toEqual(['WITH cte AS ( SELECT * FROM "table" ) INSERT INTO "table" cte', []])
  })

  it('overriding', () => {
    const ins = INSERT({
      into: table,
      overriding: 'SYSTEM',
      values: 'DEFAULT'
    })
    expect(ins.toQuery()).toEqual(['INSERT INTO "table" OVERRIDING SYSTEM VALUE DEFAULT VALUES', []])
  })

  it('record values', () => {
    const ins = INSERT({
      into: table,
      values: [{
        id: 1,
        bit: 0
      }, {
        id: 2
      }]
    })
    expect(ins.toQuery()).toEqual(['INSERT INTO "table" ( id, "bit" ) VALUES ( $1, $2 ), ( $3, $4 )', [1, 0, 2, null]])
  })

  it('on conflict', () => {
    const ins = INSERT({
      into: table,
      values: 'DEFAULT',
      onConflict: {
        targets: {
          names: ['id', ['bit']]
        },
        action: 'DO NOTHING'
      }
    })
    expect(ins.toQuery()).toEqual(['INSERT INTO "table" DEFAULT VALUES ON CONFLICT ( id, ( "bit" ) ) DO NOTHING', []])
  })

  it('on conflict where', () => {
    const ins = INSERT({
      into: table,
      values: 'DEFAULT',
      onConflict: {
        targets: {
          names: ['id', ['bit']],
          where: table.bit.eq('0')
        },
        action: 'DO NOTHING'
      }
    })
    expect(ins.toQuery()).toEqual(['INSERT INTO "table" DEFAULT VALUES ON CONFLICT ( id, ( "bit" ) ) WHERE "table"."bit" = $1 DO NOTHING', ['0']])
  })

  it('on conflict on constraint', () => {
    const ins = INSERT({
      into: table,
      values: 'DEFAULT',
      onConflict: {
        constraint: 'id',
        action: {
          set: [table.id.eq(2)],
          where: table.id.eq(1)
        }
      }
    })
    expect(ins.toQuery()).toEqual(['INSERT INTO "table" DEFAULT VALUES ON CONFLICT ON CONSTRAINT id DO UPDATE SET "table".id = $1 WHERE "table".id = $2', [2, 1]])
  })

  it('on conflict on constraint set record', () => {
    const ins = INSERT({
      into: table,
      values: 'DEFAULT',
      onConflict: {
        constraint: 'id',
        action: {
          set: {
            id: 2
          }
        }
      }
    })
    expect(ins.toQuery()).toEqual(['INSERT INTO "table" DEFAULT VALUES ON CONFLICT ON CONSTRAINT id DO UPDATE SET id = $1', [2]])
  })

  it('on conflict on constraint set record where', () => {
    const ins = INSERT({
      into: table,
      values: 'DEFAULT',
      onConflict: {
        constraint: 'id',
        action: {
          set: {
            id: 2
          },
          where: table.id.eq(1)
        }
      }
    })
    expect(ins.toQuery()).toEqual(['INSERT INTO "table" DEFAULT VALUES ON CONFLICT ON CONSTRAINT id DO UPDATE SET id = $1 WHERE "table".id = $2', [2, 1]])
  })

  it('returning', () => {
    const ins = INSERT({
      into: table,
      values: 'DEFAULT',
      returning: '*'
    })
    expect(ins.toQuery()).toEqual(['INSERT INTO "table" DEFAULT VALUES RETURNING *', []])
  })

  it('returning fields', () => {
    const ins = INSERT({
      into: table,
      values: 'DEFAULT',
      returning: { id: table.id }
    })
    expect(ins.toQuery()).toEqual(['INSERT INTO "table" DEFAULT VALUES RETURNING "table".id AS id', []])
  })
})
