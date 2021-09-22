import { Expression, QueryDefinition, sql, Table, Template, Type } from '../..'

export const CREATE_TABLE = (config: CreateTableConfig) => {
  return new QueryDefinition(stringifyCreateTableConfig(config), [])
}

export type PartitionBoundConfig = 'DEFAULT' | {
  in?: Expression[]
  bounds?: {
    from: (Expression | 'MINVALUE' | 'MAXVALUE')[]
    to: (Expression | 'MINVALUE' | 'MAXVALUE')[]
  }
  with?: {
    modulus?: number
    remainder?: number
  }
}

export interface CreateTableConfig {
  namespace?: 'GLOBAL' | 'LOCAL'
  type?: 'TEMPORARY' | 'UNLOGGED'
  ifNotExists?: boolean
  name: string | Table
  partitionOf?: string

  definition?: {
    columns: Record<string, Type>
    constraints?: Template[]
  }

  forValues?: PartitionBoundConfig
  inherits?: string[]
  partitionBy?: {
    type: 'RANGE' | 'LIST' | 'HASH',
    by: (string | Expression)[]
  }
  using?: string
  with?: Record<string, any> | 'WITHOUT OIDS'
  onCommit?: 'PRESERVE ROWS' | 'DELETE ROWS' | 'DROP'
  tablespace?: string
}

export const stringifyCreateTableConfig = (config: CreateTableConfig) => {
  const NAMESPACE = config.namespace ? sql` ${sql.keyword(config.namespace, ['GLOBAL', 'LOCAL'])} ` : sql``
  const TYPE = config.type ? sql` ${sql.keyword(config.type, ['TEMPORARY', 'UNLOGGED'])} ` : sql``
  const IF_NOT_EXISTS = config.ifNotExists ? sql` IF NOT EXISTS` : sql``
  const NAME = typeof config.name === 'string' ? sql.ident(config.name) : sql.ident(...config.name.$.name)
  const PARTITION_OF = config.partitionOf ? sql` PARTITION OF ${sql.ident(config.partitionOf)} ` : sql``
  const COLUMNS = config.definition
    ? sql.join(Object.entries(config.definition.columns).map(([name, value]) =>
      sql`${sql.ident(name)} ${value} ${sql.join(value.constraints, ' ')}`))
    : sql``
  const CONSTRAINTS = config.definition?.constraints ? sql`, ${sql.join(config.definition?.constraints, ' ')}` : sql``
  const DEFINITION = config.definition ? sql` ( ${COLUMNS}${CONSTRAINTS} )` : sql``
  const FOR_VALUES = config.forValues ? sql` FOR VALUES ${stringifyForValues(config.forValues)}` : sql``
  const INHERITS = config.inherits ? sql` INHERITS (${sql.join(config.inherits.map(el => sql.ident(el)))})` : sql``
  const PARTITION_BY = stringifyPartitionBy(config.partitionBy)
  const USING = config.using ? sql` USING ${config.using}` : sql``
  const WITH = config.with
    ? config.with === 'WITHOUT OIDS'
      ? sql` WITHOUT OIDS`
      : sql` WITH ( ${sql.join(Object.entries(config.with).map(([key, value]) => sql`${sql.ident(key)}${value ? sql` = ${value}` : sql``}`))} )`
    : sql``
  const ON_COMMIT = config.onCommit ? sql` ON COMMIT ${sql.keyword(config.onCommit, ['PRESERVE ROWS', 'DELETE ROWS', 'DROP'])}` : sql``
  const TABLESPACE = config.tablespace ? sql` TABLESPACE ${sql.ident(config.tablespace)}` : sql``

  return sql`CREATE${NAMESPACE}${TYPE} TABLE${IF_NOT_EXISTS} ${NAME}${PARTITION_OF}${DEFINITION}${FOR_VALUES}${INHERITS}${PARTITION_BY}${USING}${WITH}${ON_COMMIT}${TABLESPACE}`
}

export const stringifyForValues = (config: PartitionBoundConfig) => {
  if (!config) return sql``
  if (config === 'DEFAULT') return sql`DEFAULT`
  if (config.in) return sql`IN (${sql.join(config.in)})`
  const bounded = (el: string | Expression) => typeof el === 'string' ? sql.keyword(el, ['MINVALUE', 'MAXVALUE']) : el
  if (config.bounds) return sql`FROM (${sql.join(config.bounds.from.map(bounded))}) TO (${sql.join(config.bounds.to.map(bounded))})`
  return sql`WITH ( MODULUS ${config.with?.modulus}, REMAINDER ${config.with?.remainder} )`
}

export const stringifyPartitionBy = (config?: CreateTableConfig['partitionBy']) => {
  if (!config) return sql``
  const TYPE = sql.keyword(config.type, ['RANGE', 'LIST', 'HASH'])
  const BY = sql.join(config.by.map(el => typeof el === 'string' ? sql.ident(el) : sql`( ${el} )`))
  return sql` PARTITION BY ${TYPE} ( ${BY} )`
}
