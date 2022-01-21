import { AnyExpression, condition, Condition, Expression, ToType, UnknownLiteral } from '../../expressions'
import { QueryDefinition, Source } from '../../source'
import { sql, Template } from '../../template'
import { MathArg } from '../../types'
import { FieldsConfig, stringifyFields } from '../common/fields'
import { FromConfig, stringifyFrom } from '../common/from'
import { stringifyWith, WithConfig } from '../common/with'

const returning = (config: SelectConfig): string[] => {
  if (config.fields) return Object.keys(config.fields)
  const from = Array.isArray(config.from) ? config.from[0] : config.from
  return from ? Object.keys('$' in from ? from : from.source) : []
}

type U2I<U> = (U extends any ? (k: U) => any : never) extends ((k: infer I) => any) ? I : never

type ArrayToUnion<T> = T extends Array<infer I> ? I : T

type Normalize<R> = U2I<{
  [K in keyof R]: R[K] extends Record<string, Expression> ? R[K]
    : { [P in K]: R[P] extends Expression ? R[P] : Expression<UnknownLiteral<R[P]>> }
}[keyof R]>

export type MapToExpression<T, R = Omit<T, '$'>> = { [K in keyof Normalize<R>]: Normalize<R>[K] }

type IfExists<O, T, E> = undefined extends O ? E : T

type InferFromType<T> = ArrayToUnion<T> extends (Source<infer R> | { source: Source<infer R> }) ? R : never

type InferReturning<T extends SelectConfig> = IfExists<T['fields'], MapToExpression<T['fields']>, InferFromType<T['from']>>

export function SELECT <T extends SelectConfig> (config: T) {
  type Ret = U2I<InferReturning<T>>
  return new QueryDefinition<{
    [K in keyof Ret]: Ret[K] extends AnyExpression ? Ret[K] : never
  }>(stringifySelect(config), returning(config))
}
export interface SelectConfig {
  with?: WithConfig
  distinct?: boolean | AnyExpression[]
  fields?: FieldsConfig
  from?: FromConfig
  where?: Condition
  groupBy?: (AnyExpression | AnyExpression[])[]
  having?: Condition
  orderBy?: (AnyExpression | {
    by: AnyExpression
    direction?: 'ASC' | 'DESC'
    using?: string
    nulls?: 'FIRST' | 'LAST'
  })[]
  limit?: MathArg | 'ALL'
  offset?: MathArg | {
    start: MathArg
    plurality?: 'ROW' | 'ROWS'
  }
  fetch?: MathArg | {
    start?: 'FIRST' | 'NEXT'
    count: MathArg
    plurality?: 'ROW' | 'ROWS'
    withTies?: boolean
  }
  for?: ('UPDATE' | 'NO KEY UPDATE' | 'SHARE' | 'KEY SHARE' | {
    strength: 'UPDATE' | 'NO KEY UPDATE' | 'SHARE' | 'KEY SHARE'
    of?: Source[]
    waiting?: 'NOWAIT' | 'SKIP LOCKED'
  })[]
}

export const stringifySelect = (config: SelectConfig): Template => {
  const WITH = config.with ? sql`WITH ${stringifyWith(config.with)} ` : sql``
  const DISTINCT = config.distinct !== undefined ? sql` ${stringifyDistinct(config.distinct)}` : sql``
  const FIELDS = config.fields ? sql` ${stringifyFields(config.fields)}` : sql` *`
  const FROM = config.from ? sql` FROM ${stringifyFrom(config.from)}` : sql``
  const WHERE = config.where ? sql` WHERE ${condition(config.where)}` : sql``
  const GROUPING = config.groupBy ? sql` GROUP BY ${sql.join(config.groupBy.map(el => stringifyGroupedExpression(el)))}` : sql``
  const HAVING = config.having ? sql` HAVING ${condition(config.having)}` : sql``
  const ORDERING = config.orderBy ? sql` ORDER BY ${sql.join(config.orderBy.map(stringifyOrderBy))}` : sql``
  const LIMIT = config.limit ? sql` LIMIT ${config.limit === 'ALL' ? sql`ALL` : sql`${config.limit}`}` : sql``
  const OFFSET = config.offset ? sql` OFFSET ${stringifyOffset(config.offset)}` : sql``
  const FETCH = config.fetch ? sql` FETCH ${stringifyFetch(config.fetch)}` : sql``
  const FOR = config.for ? sql` FOR ${sql.join(config.for.map(el => stringifyFor(el)), ' ')}` : sql``

  return sql`${WITH}SELECT${DISTINCT}${FIELDS}${FROM}${WHERE}${GROUPING}${HAVING}${ORDERING}${LIMIT}${OFFSET}${FETCH}${FOR}`
}

export const stringifyGroupedExpression = (config: (AnyExpression | AnyExpression[])): Template => {
  return Array.isArray(config) ? sql`( ${sql.join(config)} )` : config
}

export const stringifyOrderBy = (config: Exclude<SelectConfig['orderBy'], undefined>[number]): Template => {
  const { by, direction = undefined, nulls = undefined, using = undefined } = 'by' in config ? config : { by: config }

  const DIRECTION = direction ? sql` ${sql.keyword(direction, ['ASC', 'DESC'])}` : sql``
  const USING = using ? sql` USING ${sql.operator(using)}` : sql``
  const NULLS = nulls ? sql` NULLS ${sql.keyword(nulls, ['FIRST', 'LAST'])}` : sql``

  return sql`${by}${DIRECTION}${USING}${NULLS}`
}

export const stringifyOffset = (config: MathArg | { start: MathArg, plurality?: 'ROW' | 'ROWS' }): Template => {
  const { start, plurality = undefined } = typeof config !== 'object'
    ? { start: config }
    : 'start' in config
      ? config
      : { start: config }

  const PLURALITY = plurality ? sql` ${sql.keyword(plurality, ['ROW', 'ROWS'])}` : sql``
  return sql`${start}${PLURALITY}`
}

export const stringifyFetch = (config: Exclude<SelectConfig['fetch'], undefined>): Template => {
  const { count, plurality = 'ROW', start = 'FIRST', withTies = false } = typeof config !== 'object'
    ? { count: config }
    : 'start' in config
      ? config
      : { count: config }

  const ONLY = withTies ? sql`WITH TIES` : sql`ONLY`

  return sql`${sql.keyword(start, ['FIRST', 'NEXT'])} ${count} ${sql.keyword(plurality, ['ROW', 'ROWS'])} ${ONLY}`
}

export const stringifyFor = (config: Exclude<SelectConfig['for'], undefined>[number]): Template => {
  const { strength, of = undefined, waiting = undefined } = typeof config === 'string' ? { strength: config } : config

  const STRENGTH = sql.keyword(strength, ['UPDATE', 'NO KEY UPDATE', 'SHARE', 'KEY SHARE'])
  const OF = of ? sql` OF ${sql.join(of.map(el => el.$))}` : sql``
  const WAITING = waiting ? sql` ${sql.keyword(waiting, ['NOWAIT', 'SKIP LOCKED'])}` : sql``

  return sql`${STRENGTH}${OF}${WAITING}`
}

export const stringifyDistinct = (config: boolean | AnyExpression[]): Template => {
  if (typeof config === 'boolean') return config ? sql`DISTINCT` : sql`ALL`
  return sql`DISTINCT ON ( ${sql.join(config)} )`
}
