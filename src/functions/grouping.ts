import { Query, QueryDefinition, Type } from '..'
import { Expression, expression } from '../expressions'
import { sql } from '../template'

export function ROLLUP (...args: (any | any[])[]) {
  const groups = (expr: any | any[]) => Array.isArray(expr) ? sql`( ${sql.join(expr)} )` : expr
  return expression`ROLLUP(${sql.join(args.map(groups))})`
}

export function CUBE (...args: (any | any[])[]) {
  const groups = (expr: any | any[][]) => Array.isArray(expr) ? sql`( ${sql.join(expr)} )` : expr
  return expression`CUBE(${sql.join(args.map(groups))})`
}

export function GROUPING_SETS (...args: (any | any[])[]) {
  const groups = (expr: any | any[]) => Array.isArray(expr) ? sql`( ${sql.join(expr)} )` : expr
  return expression`GROUPING_SETS(${sql.join(args.map(groups))})`
}

type QueryCombination<T extends Record<string, Expression>> =
  QueryCombination<T>[] | Query<T> | QueryDefinition<T> | 'UNION' | 'UNION ALL' | 'INTERSECT' | 'INTERSECT ALL' | 'EXCEPT' | 'EXCEPT ALL'

export function COMBINE <T extends Record<string, Expression>> (...args: QueryCombination<T>[]): QueryDefinition<T> {
  const template = sql`${sql.join(args.map(query => {
    if (Array.isArray(query)) return sql`( ${COMBINE(...query).$} )`
    if (typeof query === 'string') return sql.keyword(query, ['UNION', 'UNION ALL', 'INTERSECT', 'INTERSECT ALL', 'EXCEPT', 'EXCEPT ALL'])
    return sql`${query.$}`
  }), ' ')}`
  const [query] = args
  return new QueryDefinition(template, (query as unknown as QueryDefinition).$.keys)
}

export function CAST <T extends Type> (arg: any, type: T): Expression<T> {
  return expression`CAST(${arg} AS ${type})`
}
