import { Source } from '.'
import { Expression, expression } from '../expressions'
import { sql, sv, Template } from '../template'
import { eident } from '../template/eident'
import { identifier } from '../template/identifier'
import { keyword } from '../template/keyword'
import { Type } from '../types'

export type Table<T extends Record<string, Type> = any> = TableSource<T> & { [K in keyof T]: T[K]['expression'] }

export function source<T extends Record<string, Type>> (
  name: string,
  types: { [K in keyof T]: T[K] },
  alias?: string,
  columns?: string[]
): Table<T> {
  return new TableSource(name, types, alias, columns) as Table<T>
}

export class TableSource<T extends Record<string, Type> = Record<string, Type>> implements Source<{ [K in keyof T]: T[K]['expression'] }> {
  $: TableIdentifier<T>

  constructor (name: string, types: T, alias?: string, columns?: string[]) {
    const ident = new TableIdentifier(name.split('.'), types, alias, columns)

    Object.entries(types).forEach(([key, type]) => {
      Object.defineProperty(this, key, {
        enumerable: true,
        get: () => expression`${ident.$}.${identifier(key)}`
      })
    })

    try {
      Object.defineProperty(this, '$', {
        enumerable: false,
        value: ident
      })
    } catch (error) {
      throw new Error(`Column name '${error.message.slice(26)}' is reserved in source definition`)
    }
  }
}

export class TableIdentifier<T extends Record<string, Type> = Record<string, Type>> extends Template implements Source<{ [K in keyof T]: T[K]['expression'] }> {
  $ = this
  expr: { [K in keyof T]: T[K]['expression'] }

  constructor (public name: string[], private typings: T, public alias?: string, public columns?: string[]) {
    super([], [])
  }

  toQuery (start = 1) {
    return [this.alias ? eident(this.alias) : this.name.map(eident).join('.'), []] as [string, string[]]
  }

  toSource () {
    const columns = this.columns && this.columns.length ? sql` ( ${sv(this.columns.map(el => identifier(el)))} )` : sql``
    const AS_ALIAS = this.alias ? sql` AS ${identifier(this.alias)}${columns}` : sql``
    return sql`${identifier(...this.name)}${AS_ALIAS}`
  }

  as (alias: string, columns?: string[]): Table<T> {
    return source(this.name.join('.'), this.types, alias, columns) as Table<T>
  }

  get types (): T {
    return Object.entries(this.typings)
      .map(([key, val]) => {
        const type = new Type(val.strings, val.literals)
        type.constraints = val.constraints
        return [key, type]
      })
      .reduce((tmp, [key, val]: [string, Type]) => ({ ...tmp, [key]: val }), {}) as any
  }

  all (): { [K in keyof T]: Expression<T[K]> } {
    return expression`${this}.${keyword('*')}`
  }
}
