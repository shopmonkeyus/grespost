import { QueryDefinition, Table } from '../../source'
import { identifier, keyword, sql, sv } from '../../template'

export function DROP_TABLE (config: DropTableConfig) {
  return new QueryDefinition(stringifyDropTableConfig(config), [])
}

export interface DropTableConfig {
  ifExists?: boolean
  names: (string | Table)[]
  constraint?: 'CASCADE' | 'RESTRICT'
}

export const stringifyDropTableConfig = (config: DropTableConfig) => {
  const IF_EXISTS = config.ifExists ? sql` IF EXISTS` : sql``
  const NAMES = sv(config.names.map(name => typeof name === 'string' ? identifier(...name.split('.')) : name.$))
  const CONSTRAINT = config.constraint ? sql` ${keyword(config.constraint, ['CASCADE', 'RESTRICT'])}` : sql``

  return sql`DROP TABLE${IF_EXISTS} ${NAMES}${CONSTRAINT}`
}
