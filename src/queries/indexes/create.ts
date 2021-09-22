import { AnyExpression, condition, Condition } from '../../expressions'
import { identifier, Keyword, keyword, sql, sv } from '../../template'
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
  const NAME = config.name ? sql` ${identifier(...config.name.split('.'))}` : sql``
  const TABLE = stringifyTable(config.table)
  const USING = config.using
    ? sql` USING ${typeof config.using === 'string' ? keyword(config.using, ['BTREE', 'HASH', 'GIST', 'SPGIST', 'GIN', 'BRIN']) : config.using}`
    : sql``
  const COLUMNS = sql`( ${sv(config.columns.map(stringifyCreateIndexColumn))} )`
  const INCLUDE = config.include ? sql` INCLUDE ( ${sv(config.include.map(el => typeof el === 'string' ? identifier(...el.split('.')) : el))} )` : sql``
  const WITH = config.with ? sql` WITH ( ${sv(Object.entries(config.with).map(([key, value]) => sql`${identifier(key)} = ${value}`))} )` : sql``
  const TABLESPACE = config.tablespace ? sql` TABLESPACE ${identifier(config.tablespace)}` : sql``
  const WHERE = config.where ? sql` WHERE ${condition(config.where)}` : sql``

  return sql`CREATE${UNIQUE} INDEX${CONCURRENTLY}${IF_NOT_EXISTS}${NAME} ON ${TABLE}${USING} ${COLUMNS}${INCLUDE}${WITH}${TABLESPACE}${WHERE}`
}

export const stringifyCreateIndexColumn = (config: CreateIndexConfig['columns'][number]) => {
  if (typeof config === 'string') return identifier(...config.split('.'))
  if (config instanceof AnyExpression) return config
  const NAME = config.name ? sql`${typeof config.name === 'string' ? identifier(...config.name.split('.')) : config.name}` : sql``
  const EXPRESSION = config.expression ? sql`( ${config.expression} )` : sql``
  const COLLATION = config.collation ? sql` COLLATE ${identifier(config.collation)}` : sql``
  const OPCLASS = config.opclass ? sql` ${identifier(config.opclass)}` : sql``
  const OPCONFIG = config.opconfig ? sql` ( ${sv(Object.entries(config.opconfig).map(([key, value]) => sql`${identifier(key)} = ${value}`))} )` : sql``
  const SORT = config.sort ? sql` ${keyword(config.sort, ['ASC', 'DESC'])}` : sql``
  const NULLS = config.nulls ? sql` NULLS ${keyword(config.nulls, ['FIRST', 'LAST'])}` : sql``

  return sql`${NAME}${EXPRESSION}${COLLATION}${OPCLASS}${OPCONFIG}${SORT}${NULLS}`
}
