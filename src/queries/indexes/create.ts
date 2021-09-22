import { AnyExpression, condition, Condition } from '../../expressions'
import { Keyword, sql } from '../../template'
import { stringifyTable } from '../common/from'
import { QueryDefinition, Table } from '../../source'

export const CREATE_INDEX = (config: CreateIndexConfig) => {
  return new QueryDefinition(stringifyCreateIndex(config), [])
}

export interface CreateIndexConfig {
  unique?: boolean
  concurently?: boolean
  ifNotExists?: boolean
  name?: string
  table: Table | { only?: boolean, table: Table }
  using?: 'BTREE' | 'HASH' | 'GIST' | 'SPGIST' | 'GIN' | 'BRIN' | Keyword
  columns: Array<string | AnyExpression | {
    name?: string | AnyExpression
    expression?: AnyExpression
    collation?: string
    opclass?: string
    opconfig?: Record<string, any>
    sort?: 'ASC' | 'DESC'
    nulls?: 'FIRST' | 'LAST'
  }>
  include?: (string | AnyExpression)[]
  with?: Record<string, any>
  tablespace?: string
  where?: Condition
}

export const stringifyCreateIndex = (config: CreateIndexConfig) => {
  const UNIQUE = config.unique ? sql` UNIQUE` : sql``
  const CONCURRENTLY = config.concurently ? sql` CONCURRENTLY` : sql``
  const IF_NOT_EXISTS = config.ifNotExists ? sql` IF NOT EXISTS` : sql``
  const NAME = config.name ? sql` ${sql.ident(...config.name.split('.'))}` : sql``
  const TABLE = stringifyTable(config.table)
  const USING = config.using
    ? sql` USING ${typeof config.using === 'string' ? sql.keyword(config.using, ['BTREE', 'HASH', 'GIST', 'SPGIST', 'GIN', 'BRIN']) : config.using}`
    : sql``
  const COLUMNS = sql`( ${sql.join(config.columns.map(stringifyCreateIndexColumn))} )`
  const INCLUDE = config.include ? sql` INCLUDE ( ${sql.join(config.include.map(el => typeof el === 'string' ? sql.ident(...el.split('.')) : el))} )` : sql``
  const WITH = config.with ? sql` WITH ( ${sql.join(Object.entries(config.with).map(([key, value]) => sql`${sql.ident(key)} = ${value}`))} )` : sql``
  const TABLESPACE = config.tablespace ? sql` TABLESPACE ${sql.ident(config.tablespace)}` : sql``
  const WHERE = config.where ? sql` WHERE ${condition(config.where)}` : sql``

  return sql`CREATE${UNIQUE} INDEX${CONCURRENTLY}${IF_NOT_EXISTS}${NAME} ON ${TABLE}${USING} ${COLUMNS}${INCLUDE}${WITH}${TABLESPACE}${WHERE}`
}

export const stringifyCreateIndexColumn = (config: CreateIndexConfig['columns'][number]) => {
  if (typeof config === 'string') return sql.ident(...config.split('.'))
  if (config instanceof AnyExpression) return config
  const NAME = config.name ? sql`${typeof config.name === 'string' ? sql.ident(...config.name.split('.')) : config.name}` : sql``
  const EXPRESSION = config.expression ? sql`( ${config.expression} )` : sql``
  const COLLATION = config.collation ? sql` COLLATE ${sql.ident(config.collation)}` : sql``
  const OPCLASS = config.opclass ? sql` ${sql.ident(config.opclass)}` : sql``
  const OPCONFIG = config.opconfig ? sql` ( ${sql.join(Object.entries(config.opconfig).map(([key, value]) => sql`${sql.ident(key)} = ${value}`))} )` : sql``
  const SORT = config.sort ? sql` ${sql.keyword(config.sort, ['ASC', 'DESC'])}` : sql``
  const NULLS = config.nulls ? sql` NULLS ${sql.keyword(config.nulls, ['FIRST', 'LAST'])}` : sql``

  return sql`${NAME}${EXPRESSION}${COLLATION}${OPCLASS}${OPCONFIG}${SORT}${NULLS}`
}
