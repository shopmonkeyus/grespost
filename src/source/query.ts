import { Source } from '.'
import { AnyExpression, expression } from '../expressions'
import { sql, sv, Template, identifier, eident } from '../template'

export type Query<T extends Record<string, AnyExpression> = any> = QuerySource<T> & T

export class QuerySource<T extends Record<string, AnyExpression> = Record<string, AnyExpression>> implements Source<T> {
  $: QueryDefinition<T>

  constructor (tmpl: Template, keys: string[], alias?: string, columns?: string[], cteAlias?: string, cteColumns?: string[]) {
    const ident = new QueryDefinition(tmpl, keys, alias, columns, cteAlias, cteColumns)

    keys.forEach((key) => {
      Object.defineProperty(this, key, {
        enumerable: true,
        get: () => expression`${ident.$}.${identifier(key.toString())}`
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

export class QueryDefinition<T extends Record<string, AnyExpression> = Record<string, AnyExpression>> extends Template implements Source<T> {
  $ = this
  expr: T

  tmpl: Template

  alias?: string
  columns?: string[]

  cteAlias?: string
  cteColumns?: string[]

  keys: (keyof T)[]

  constructor (tmpl: Template, keys: string[], alias?: string, columns?: string[], cteAlias?: string, cteColumns?: string[]) {
    super([], [])

    this.tmpl = tmpl

    this.alias = alias
    this.columns = columns

    this.cteAlias = cteAlias
    this.cteColumns = cteColumns

    this.keys = keys
  }

  as (alias: string, columns?: (keyof T)[]): Query<T>
  as <NT extends Record<string, AnyExpression>>(alias: string, columns?: (keyof NT)[]): Query<NT>
  as (alias: string, columns?: (keyof T)[]): Query<T> {
    return new QuerySource<T>(
      this.tmpl,
      columns as string[] || this.keys,
      alias,
      columns as string[] || this.columns || this.cteColumns,
      this.cteAlias,
      this.cteColumns
    ) as Query<T>
  }

  asCTE (cteAlias: string, cteColumns?: (keyof T)[]): Query<T>
  asCTE <NT extends Record<string, AnyExpression>>(alias: string, columns?: (keyof NT)[]): Query<NT>
  asCTE (cteAlias: string, cteColumns?: (keyof T)[]): Query<T> {
    return new QuerySource(
      this.tmpl,
      (cteColumns as string[]) || this.keys,
      this.alias,
      this.columns,
      cteAlias,
      cteColumns as string[] || this.cteColumns || this.columns
    ) as Query<T>
  }

  toQuery (start = 1) {
    if (!this.alias && !this.cteAlias) return this.tmpl.toQuery(start)
    return [eident(this.alias! || this.cteAlias!), []] as [string, string[]]
  }

  toSource (): Template {
    const columns = this.columns && this.columns.length ? sql` ( ${sv(this.columns.map(el => identifier(el)))} )` : sql``
    const AS_ALIAS = this.alias ? sql` AS ${identifier(this.alias)}${columns}` : sql``
    return sql`${this.cteAlias ? identifier(this.cteAlias) : sql`( ${this.tmpl} )`}${AS_ALIAS}`
  }
}
