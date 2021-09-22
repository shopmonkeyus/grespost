import { QueryDefinition, Type } from '..'
import { Expression, expression } from '../expressions'
import { keyword, sql, sv } from '../template'

export function ROLLUP (...args: (any | any[])[]) {
  const groups = (expr: any | any[]) => Array.isArray(expr) ? sql`( ${sv(expr)} )` : expr
  return expression`ROLLUP(${sv(args.map(groups))})`
}

export function CUBE (...args: (any | any[])[]) {
  const groups = (expr: any | any[][]) => Array.isArray(expr) ? sql`( ${sv(expr)} )` : expr
  return expression`CUBE(${sv(args.map(groups))})`
}

export function GROUPING_SETS (...args: (any | any[])[]) {
  const groups = (expr: any | any[]) => Array.isArray(expr) ? sql`( ${sv(expr)} )` : expr
  return expression`GROUPING_SETS(${sv(args.map(groups))})`
}

type QueryCombination<T extends Record<string, Expression>> =
  QueryCombination<T>[] | QueryDefinition<T> | 'UNION' | 'UNION ALL' | 'INTERSECT' | 'INTERSECT ALL' | 'EXCEPT' | 'EXCEPT ALL'

export function COMBINE <T extends Record<string, Expression>> (...args: QueryCombination<T>[]): QueryDefinition<T> {
  const template = sql`${sv(args.map(query => {
    if (Array.isArray(query)) return sql`( ${COMBINE(...query).$} )`
    if (typeof query === 'string') return keyword(query, ['UNION', 'UNION ALL', 'INTERSECT', 'INTERSECT ALL', 'EXCEPT', 'EXCEPT ALL'])
    return query.$
  }), ' ')}`
  const [query] = args
  return new QueryDefinition(template, (query as unknown as QueryDefinition).$.keys)
}

export function CAST <T extends Type> (arg: any, type: T): Expression<T> {
  return expression`CAST(${arg} AS ${type})`
}
