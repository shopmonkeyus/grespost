import { stringifyOrderBy } from '..'
import { AnyExpression, condition, Condition, Expression, expression, ToType } from '../expressions'
import { sql, Template } from '../template'
import { BigintType, DoubleType, IntegerArg, IntegerType } from '../types'

export interface WindowBoundConfig {
  type: 'PRECEDING' | 'UNBOUNDED PRECEDING' | 'CURRENT ROW' | 'FOLLOWING' | 'UNBOUNDED FOLLOWING'
  offset?: any
}

export interface WindowDefinitionConfig {
  name?: string
  partitionBy?: AnyExpression[]
  orderBy?: (AnyExpression | {
    by: AnyExpression
    direction?: 'ASC' | 'DESC'
    using?: string
    nulls?: 'FIRST' | 'LAST'
  })[]
  frame?: {
    type: 'RANGE' | 'ROWS' | 'GROUPS'
    start: WindowBoundConfig
    end?: WindowBoundConfig
    exclude?: 'CURRENT ROW' | 'GROUP' | 'TIES' | 'NO OTHERS'
  }
}

export const stringifyWindowDefinition = (config: WindowDefinitionConfig): Template => {
  const NAME = config.name ? sql` ${sql.ident(config.name)}` : sql``
  const PARTITION_BY = config.partitionBy ? sql` PARTITION BY ${sql.join(config.partitionBy)}` : sql``
  const ORDER_BY = config.orderBy ? sql` ORDER BY ${sql.join(config.orderBy.map(stringifyOrderBy))}` : sql``
  const FRAME = config.frame ? sql` ${stringifyFrame(config.frame)}` : sql``

  return sql`${NAME}${PARTITION_BY}${ORDER_BY}${FRAME} `
}

export const stringifyFrame = (config: Exclude<WindowDefinitionConfig['frame'], undefined>): Template => {
  const TYPE = sql.keyword(config.type, ['RANGE', 'ROWS', 'GROUPS'])
  const BOUNDS = config.start && config.end
    ? sql` BETWEEN ${stringifyWindowBound(config.start)} AND ${stringifyWindowBound(config.end)}`
    : sql` ${stringifyWindowBound(config.start)}`
  const EXCLUDE = config.exclude ? sql` EXCLUDE ${sql.keyword(config.exclude, ['CURRENT ROW', 'GROUP', 'TIES', 'NO OTHERS'])}` : sql``

  return sql`${TYPE}${BOUNDS}${EXCLUDE}`
}

const stringifyWindowBound = (bound: WindowBoundConfig) => {
  const OFFSET = bound.offset ? sql`${bound.offset} ` : sql``
  const TYPE = sql.keyword(bound.type, ['PRECEDING', 'UNBOUNDED PRECEDING', 'CURRENT ROW', 'FOLLOWING', 'UNBOUNDED FOLLOWING'])
  return sql`${OFFSET}${TYPE}`
}

export interface WindowConfig {
  filterWhere?: Condition
  over: WindowDefinitionConfig
}

export const stringifyWindowConfig = (config?: WindowConfig) => {
  if (!config) return sql``
  const FILTER_WHERE = config.filterWhere ? sql` FILTER ( WHERE ${condition(config.filterWhere)} )` : sql``
  const OVER = sql` OVER (${stringifyWindowDefinition(config.over)})`

  return sql`${FILTER_WHERE}${OVER}`
}

/**
 * @description Returns the number of the current row within its partition, counting from 1.
 *
 * @signature row_number () → bigint
 */
export function ROW_NUMBER (window: WindowConfig): Expression<BigintType> {
  return expression`ROW_NUMBER()${stringifyWindowConfig(window)}`
}

/**
 * @description Returns the rank of the current row, with gaps; that is, the
 * row_number of the first row in its peer group.
 *
 * @signature rank () → bigint
 */
export function RANK (window: WindowConfig): Expression<BigintType> {
  return expression`RANK()${stringifyWindowConfig(window)}`
}

/**
 * @description Returns the rank of the current row, without gaps; this function effectively
 * counts peer groups.
 *
 * @signature dense_rank () → bigint
 */
export function DENSE_RANK (window: WindowConfig): Expression<BigintType> {
  return expression`DENSE_RANK()${stringifyWindowConfig(window)}`
}

/**
 * @description Returns the relative rank of the current row, that is (rank - 1) / (total partition rows - 1).
 * The value thus ranges from 0 to 1 inclusive.
 *
 * @signature percent_rank () → double precision
 */
export function PERCENT_RANK (window: WindowConfig): Expression<DoubleType> {
  return expression`PERCENT_RANK()${stringifyWindowConfig(window)}`
}

/**
 * @description Returns the cumulative distribution, that is
 * (number of partition rows preceding or peers with current row) / (total partition rows).
 * The value thus ranges from 1/N to 1.
 *
 * @signature cume_dist () → double precision
 */
export function CUME_DIST (window?: WindowConfig): Expression<DoubleType> {
  return expression`CUME_DIST()${stringifyWindowConfig(window)}`
}

/**
 * @description Returns an integer ranging from 1 to the argument value, dividing the
 * partition as equally as possible.
 *
 * @signature ntile ( num_buckets integer ) → integer
 */
export function NTILE (buckets: IntegerArg, window: WindowConfig): Expression<IntegerType> {
  return expression`NTILE(${buckets})${stringifyWindowConfig(window)}`
}

/**
 * @description Returns value evaluated at the row that is offset rows before the
 * current row within the partition; if there is no such row, instead
 * returns default (which must be of the same type as value). Both
 * offset and default are evaluated with respect to the current row. If
 * omitted, offset defaults to 1 and default to NULL.
 *
 * @signature lag ( value anyelement [, offset integer [, default anyelement ]] ) → anyelement
 */
export function LAG <T> (value: T, window: WindowConfig): Expression<ToType<T>>
export function LAG <T> (value: T, offset: IntegerArg, window: WindowConfig): Expression<ToType<T>>
export function LAG <T> (value: T, offset: IntegerArg, def: T, window: WindowConfig): Expression<ToType<T>>
export function LAG <T> (value: T, offset?: IntegerArg | WindowConfig, def?: T | WindowConfig, window?: WindowConfig): Expression<ToType<T>> {
  const args = [...arguments]
  const windowConfig = args.pop() as WindowConfig
  return expression`LAG(${sql.join(args)})${stringifyWindowConfig(windowConfig)}`
}

/**
 * @description Returns value evaluated at the row that is offset rows after the
 * current row within the partition; if there is no such row, instead
 * returns default (which must be of the same type as value). Both
 * offset and default are evaluated with respect to the current row. If
 * omitted, offset defaults to 1 and default to NULL.
 *
 * @signature lead ( value anyelement [, offset integer [, default anyelement ]] ) → anyelement
 */
export function LEAD <T> (value: T, window: WindowConfig): Expression<ToType<T>>
export function LEAD <T> (value: T, offset: IntegerArg, window: WindowConfig): Expression<ToType<T>>
export function LEAD <T> (value: T, offset: IntegerArg, def: T, window: WindowConfig): Expression<ToType<T>>
export function LEAD <T> (value: T, offset?: IntegerArg | WindowConfig, def?: T | WindowConfig, window?: WindowConfig): Expression<ToType<T>> {
  const args = [...arguments]
  const windowConfig = args.pop() as WindowConfig
  return expression`LEAD(${sql.join(args)})${stringifyWindowConfig(windowConfig)}`
}

/**
 * @description Returns value evaluated at the row that is the first row of
 * the window frame.
 *
 * @signature first_value ( value anyelement ) → anyelement
 */
export function FIRST_VALUE <T> (value: T, window: WindowConfig): Expression<ToType<T>> {
  return expression`FIRST_VALUE(${value})${stringifyWindowConfig(window)}`
}

/**
 * @description Returns value evaluated at the row that is the last row of
 * the window frame.
 *
 * @signature last_value ( value anyelement ) → anyelement
 */
export function LAST_VALUE <T> (value: T, window: WindowConfig): Expression<ToType<T>> {
  return expression`LAST_VALUE(${value})${stringifyWindowConfig(window)}`
}

/**
 * @description Returns value evaluated at the row that is the n'th row of
 * the window frame (counting from 1); returns NULL if there is no
 * such row.
 *
 * @signature nth_value ( value anyelement, n integer ) → anyelement
 */
export function NTH_VALUE <T> (value: T, n: IntegerArg, window: WindowConfig): Expression<ToType<T>> {
  return expression`NTH_VALUE(${sql.join([value, n])})${stringifyWindowConfig(window)}`
}
