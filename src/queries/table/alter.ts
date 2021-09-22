import { QueryDefinition, sql, Table, Template, Type } from '../..'
import { stringifyTable } from '../common/from'
import { PartitionBoundConfig, stringifyForValues } from './create'

export function RENAME_TABLE (name: string) {
  return sql`RENAME TO ${sql.ident(name)}`
}

export function RENAME_CONSTRAINT (old: string, name: string) {
  return sql`RENAME CONSTRAINT ${sql.ident(old)} TO ${sql.ident(name)}`
}

export function RENAME_COLUMN (old: string, name: string) {
  return sql`RENAME COLUMN ${sql.ident(old)} TO ${sql.ident(name)}`
}

export function SET_TABLE_SCHEMA (schema: string) {
  return sql`SET SCHEMA ${sql.ident(schema)}`
}

export function ATTACH_PARTITION (name: string, forValues: PartitionBoundConfig) {
  return sql`ATTACH PARTITION ${sql.ident(name)} ${stringifyForValues(forValues)}`
}

export function DETACH_PARTITION (name: string) {
  return sql`DETACH PARTITION ${sql.ident(name)}`
}

export function ADD_COLUMN (name: string, type: Type, config: { constraints?: Template[], collation: string, ifNotExists?: boolean }) {
  const IF_NOT_EXISTS = config.ifNotExists ? sql` IF NOT EXISTS` : sql``
  const COLLATION = config.collation ? sql` COLLATE ${sql.ident(config.collation)}` : sql``
  const CONSTRAINTS = config.constraints ? sql` ${sql.join(config.constraints, ' ')}` : sql``

  return sql`ADD COLUMN${IF_NOT_EXISTS} ${sql.ident(name)} ${type}${COLLATION}${CONSTRAINTS}`
}

export function DROP_COLUMN (name: string, config: { ifExists?: boolean, type?: 'RESTRICT' | 'CACADE' }) {
  const IF_EXISTS = config.ifExists ? sql` IF EXISTS` : sql``
  const TYPE = config.type ? sql` ${sql.keyword(config.type, ['RESTRICT', 'CASCADE'])}` : sql``
  return sql`DROP COLUMN${IF_EXISTS} ${sql.ident(name)}${TYPE}`
}

export function SET_COLUMN_DEFAULT (name: string, value: any) {
  return sql`ALTER COLUMN ${sql.ident(name)} SET DEFAULT ${value}`
}

export function DROP_COLUMN_DEFAULT (name: string) {
  return sql`ALTER COLUMN ${sql.ident(name)} DROP DEFAULT`
}

export function SET_COLUMN_NOT_NULL (name: string) {
  return sql`ALTER COLUMN ${sql.ident(name)} SET NOT NULL`
}

export function DROP_COLUMN_NOT_NULL (name: string) {
  return sql`ALTER COLUMN ${sql.ident(name)} DROP NOT NULL`
}

export function ADD_TABLE_CONSTRAINT (constraint: Template, notValid?: boolean) {
  const NOT_VALID = notValid ? sql` NOT VALID` : sql``
  return sql`ADD ${constraint}${NOT_VALID}`
}

export function DROP_CONSTRAINT (name: string, config: { ifExists?: boolean, type?: 'RESTRICT' | 'CACADE' }) {
  const IF_EXISTS = config.ifExists ? sql` IF EXISTS` : sql``
  const TYPE = config.type ? sql` ${sql.keyword(config.type, ['RESTRICT', 'CASCADE'])}` : sql``
  return sql`DROP CONSTRAINT${IF_EXISTS} ${sql.ident(name)}${TYPE}`
}

export function ALTER_TABLE (config: AlterTableConfig) {
  return new QueryDefinition(stringifyAlterTableConfig(config), [])
}

export interface AlterTableConfig {
  ifExists?: boolean;
  table: Table | {
    only?: boolean;
    table: Table
  }
  actions: Template[]
}

export const stringifyAlterTableConfig = (config: AlterTableConfig) => {
  const IF_EXISTS = config.ifExists ? sql` IF EXISTS` : sql``
  const TABLE = stringifyTable(config.table)
  const ACTIONS = sql.join(config.actions)
  return sql`ALTER TABLE${IF_EXISTS} ${TABLE} ${ACTIONS}`
}
