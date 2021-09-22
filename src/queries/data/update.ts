import { AnyExpression, condition, Condition } from '../../expressions'
import { FromConfig, stringifyFrom, stringifyTable } from '../common/from'
import { FieldsConfig, stringifyFields } from '../common/fields'
import { identifier, sql, sv, Template } from '../../template'
import { stringifyWith, WithConfig } from '../common/with'
import { QueryDefinition, Source } from '../../source'
import { MapToExpression } from '..'

type InferUpdateReturning<T extends UpdateConfig> =
  undefined extends T['returning'] ? {}
    : T['returning'] extends '*'
    ? T['table'] extends (Source<infer R> | { table: Source<infer R> }) ? R : never
    : MapToExpression<T['returning']>

export function UPDATE <T extends UpdateConfig> (config: T) {
  type Ret = InferUpdateReturning<T>
  const ret = config.returning ? Object.keys(config.returning) : []
  return new QueryDefinition<{ [K in keyof Ret]: Ret[K] extends AnyExpression ? Ret[K] : never }>(stringifyUpdate(config), ret)
}

export interface UpdateConfig {
  with?: WithConfig
  table: Source | { only?: boolean, table: Source }
  set: AnyExpression[] | Record<string, any>
  from?: FromConfig
  where?: Condition
  whereCurrentOf?: string
  returning?: FieldsConfig | '*'
}

// [ <with> ]
// UPDATE { [ ONLY ] table [ * ] [ AS alias ] }
//     SET { set [, ...] }
//     [ FROM { <source> [, ...] } ]
//     [ WHERE condition | WHERE CURRENT OF cursor ]
//     [ RETURNING { expression [ AS alias ] [, ...] } ]
export const stringifyUpdate = (config: UpdateConfig): Template => {
  const WITH = config.with ? sql`WITH ${stringifyWith(config.with)} ` : sql``
  const TABLE = stringifyTable(config.table)
  const SET = sql`SET ${stringifySet(config.set)}`
  const FROM = config.from ? sql` FROM ${stringifyFrom(config.from)}` : sql``
  const WHERE = config.where ? sql` WHERE ${condition(config.where)}` : sql``
  const CURSOR = config.whereCurrentOf ? sql` WHERE CURRENT OF ${identifier(config.whereCurrentOf)}` : sql``
  const RETURNING = config.returning ? config.returning === '*' ? sql` RETURNING *` : sql` RETURNING ${stringifyFields(config.returning)}` : sql``

  return sql`${WITH}UPDATE ${TABLE} ${SET}${FROM}${WHERE}${CURSOR}${RETURNING}`
}

export const stringifySet = (config: AnyExpression[] | Record<string, any>) => {
  if (Array.isArray(config)) return sv(config)
  return sv(Object.entries(config).map(([key, value]) => sql`${identifier(key)} = ${value}`))
}
