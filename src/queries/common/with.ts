import { Query } from '../../source'
import { sql, sv, Template } from '../../template'
import { identifier } from '../../template/identifier'

export type CTEConfig = Query | {
  materialized?: boolean
  query: Query
}

export type WithConfig = CTEConfig[] | {
  recursive?: boolean
  ctes: CTEConfig[]
}

const stringifyCommonTableExpression = (config: CTEConfig): Template => {
  const { materialized, query } = '$' in config ? { materialized: undefined, query: config } : config
  if (!query.$.cteAlias) throw new Error('Missing cteAlias in query. Use query.asCTE(\'alias\') to set cte alias.')

  const ALIAS = identifier(query.$.cteAlias)
  const COLUMNS = query.$.cteColumns && query.$.cteColumns.length ? sql` ( ${sv(query.$.cteColumns.map((column: string) => identifier(column)))} )` : sql``
  const MATERIALIZED = materialized === undefined ? sql`` : (materialized ? sql` MATERIALIZED` : sql` NOT MATERIALIZED`)

  return sql`${ALIAS}${COLUMNS} AS${MATERIALIZED} ( ${query.$.tmpl} )`
}

export const stringifyWith = (config: WithConfig): Template => {
  const { recursive, ctes } = Array.isArray(config) ? { recursive: undefined, ctes: config } : config

  const RECURSIVE = recursive ? sql`RECURSIVE ` : sql``
  const CTES = ctes.map(stringifyCommonTableExpression)

  return sql`${RECURSIVE}${sv(CTES)}`
}
