import { QueryDefinition } from '../..'
import { sql } from '../../template'

export const DROP_INDEX = (config: DropIndexConfig) => {
  return new QueryDefinition(stringifyDropIndex(config), [])
}

export interface DropIndexConfig {
  concurently?: boolean
  ifExists?: boolean
  names: string[]
  constraint?: 'CASCADE' | 'RESTRICT'
}

export const stringifyDropIndex = (config: DropIndexConfig) => {
  const CONCURRENTLY = config.concurently ? sql` CONCURRENTLY` : sql``
  const IF_EXISTS = config.ifExists ? sql` IF EXISTS` : sql``
  const NAMES = sql.join(config.names.map(name => sql.ident(...name.split('.'))))
  const CONSTRAINT = config.constraint ? sql` ${sql.keyword(config.constraint, ['CASCADE', 'RESTRICT'])}` : sql``

  return sql`DROP INDEX${CONCURRENTLY}${IF_EXISTS} ${NAMES}${CONSTRAINT}`
}
