import { AnyExpression, condition, Condition } from '../../expressions'
import { identifier, keyword, sql, sv, Template } from '../../template'
import { FieldsConfig, stringifyFields } from '../common/fields'
import { stringifyWith, WithConfig } from '../common/with'
import { Query, QueryDefinition, Source, Table } from '../../source'
import { stringifySet } from './update'
import { MapToExpression } from '../'

type InferInsertReturning<T extends InsertConfig> =
  undefined extends T['returning'] ? {}
  : T['returning'] extends '*' ? T['into'] extends Source<infer R> ? R : never : MapToExpression<T['returning']>

export function INSERT <T extends InsertConfig> (config: T) {
  type Ret = InferInsertReturning<T>
  const ret = config.returning ? Object.keys(config.returning) : []
  return new QueryDefinition<{ [K in keyof Ret]: Ret[K] extends AnyExpression ? Ret[K] : never }>(stringifyInsert(config), ret)
}

export interface InsertConfig {
  with?: WithConfig
  into: Table
  overriding?: 'SYSTEM' | 'USER'
  values: 'DEFAULT' | Query | { [K in keyof this['into']['$']['types']]: this['into']['$']['types'][K]['argument'] }[] | {
    columns?: string[],
    values: any[][]
  }
  onConflict?: {
    targets?: {
      names: (string | string[])[]
      where?: Condition
    },
    constraint?: string
    action: 'DO NOTHING' | {
      set: AnyExpression[] | Record<string, any>
      where?: Condition
    }
  }
  returning?: FieldsConfig | '*'
}

// [ WITH [ RECURSIVE ] with_query [, ...] ]
// INSERT INTO table_name [ AS alias ] [ ( column_name [, ...] ) ]
//     [ OVERRIDING { SYSTEM | USER } VALUE ]
//     { DEFAULT VALUES | VALUES ( { expression | DEFAULT } [, ...] ) [, ...] | query }
//     [ ON CONFLICT [ conflict_target ] conflict_action ]
//     [ RETURNING * | output_expression [ [ AS ] output_name ] [, ...] ]
export const stringifyInsert = (config: InsertConfig): Template => {
  const WITH = config.with ? sql`WITH ${stringifyWith(config.with)} ` : sql``
  const INTO = sql`INTO ${config.into.$.toSource()}`
  const OVERRIDING = config.overriding ? sql` OVERRIDING ${keyword(config.overriding, ['SYSTEM', 'USER'])} VALUE` : sql``
  const [COLUMNS, VALUES] = stringifyInsertValues(config.values)
  const CONFLICT = config.onConflict ? sql` ON CONFLICT ${stringifyOnConflict(config.onConflict)}` : sql``
  const RETURNING = config.returning ? config.returning === '*' ? sql` RETURNING *` : sql` RETURNING ${stringifyFields(config.returning)}` : sql``

  return sql`${WITH}INSERT ${INTO}${COLUMNS}${OVERRIDING} ${VALUES}${CONFLICT}${RETURNING}`
}

export function stringifyInsertValues (config: Exclude<InsertConfig['values'], undefined>): Template[] {
  if (config === 'DEFAULT') return [sql``, sql`DEFAULT VALUES`]
  if ('$' in config) return [sql``, config.$]
  if (Array.isArray(config)) {
    const columns = [...config.reduce<Set<string>>((acc, row) => {
      Object.keys(row).forEach(key => acc.add(key))
      return acc
    }, new Set<string>())]
    const values = config.reduce<Template[]>((acc, row) => {
      acc.push(sql`( ${sv(columns.map(key => row[key] === undefined ? null : row[key]))} )`)
      return acc
    }, [])
    return [sql` ( ${sv(columns.map(el => identifier(el)))} )`, sql`VALUES ${sv(values)}`]
  }
  return [
    config.columns ? sql` ( ${sv(config.columns.map((el: string) => identifier(el)))} )` : sql``,
    sql`VALUES ${sv(config.values.map((el: any[]) => sql`( ${sv(el)} )`))}`
  ]
}

export function stringifyOnConflict (config: Exclude<InsertConfig['onConflict'], undefined>): Template {
  const TARGET = config.targets ? sql`${stringifyConflictTarget(config.targets)} ` : sql``
  const CONSTRAINT = config.constraint ? sql`ON CONSTRAINT ${identifier(config.constraint)} ` : sql``
  const ACTION = stringifyOnConflictAction(config.action)
  return sql`${TARGET}${CONSTRAINT}${ACTION}`
}

export function stringifyConflictTarget (config: Exclude<Exclude<InsertConfig['onConflict'], undefined>['targets'], undefined>): Template {
  const { names, where } = config
  const TARGETS = sql`( ${sv(names.map(el => Array.isArray(el) ? sql`( ${sv(el.map(it => identifier(it)))} )` : identifier(el)))} )`
  const WHERE = where ? sql` WHERE ${condition(where)}` : sql``
  return sql`${TARGETS}${WHERE}`
}

function stringifyOnConflictAction (config: Exclude<InsertConfig['onConflict'], undefined>['action']): Template {
  if (config === 'DO NOTHING') return sql`DO NOTHING`
  const { set, where } = config
  const SET = stringifySet(set)
  const WHERE = where ? sql` WHERE ${condition(where)}` : sql``
  return sql`DO UPDATE SET ${SET}${WHERE}`
}
