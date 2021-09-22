import { Expression, ToType, UnknownLiteral } from '../../expressions'
import { QueryDefinition } from '../../source'
import { Template, sv, sql } from '../../template'

export function VALUES <T>(config: T[][]): QueryDefinition<Record<string, Expression<ToType<T>>>>
export function VALUES <C extends string, V>(config: { columns: C[], values: V[][] }): QueryDefinition<Record<C, Expression<ToType<V>>>>
export function VALUES <R extends Array<Record<string, any>>>(config: R): QueryDefinition<{ [K in keyof R[number]]-?: Expression<UnknownLiteral<R[number][K]>> }>
export function VALUES (config: any[][] | Record<string, any>[] | { columns: string[], values: any[][] }) {
  let VALUES: Template
  let columns: string[]
  if (Array.isArray(config) && config.length > 0) {
    if (Array.isArray(config[0])) {
      VALUES = sv((config as any[][]).map((el) => sql`( ${sv(el)} )`))
      columns = config[0].map((_, i) => `column${i + 1}`)
    } else {
      const conf = config as Record<string, any>[]
      columns = [...(conf).reduce<Set<string>>((acc, row) => {
        Object.keys(row).forEach(key => acc.add(key))
        return acc
      }, new Set<string>())]
      VALUES = sv(conf.reduce<Template[]>((acc, row) => {
        acc.push(sql`( ${sv(columns.map(key => row[key] === undefined ? null : row[key]))} )`)
        return acc
      }, []))
    }
  } else {
    const { columns: cols, values } = config as { columns: string[], values: any[][] }
    VALUES = sv(values.map(row => sql`( ${sv(row.map(el => el === undefined ? null : el))} )`))
    columns = cols
  }
  return new QueryDefinition<any>(sql`VALUES ${VALUES}`, columns, undefined, columns, undefined)
}
