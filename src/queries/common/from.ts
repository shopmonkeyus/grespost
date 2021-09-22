import { AnyExpression, condition, Condition } from '../../expressions'
import { Source } from '../../source'
import { sql, sv, Template } from '../../template'
import { identifier } from '../../template/identifier'
import { keyword } from '../../template/keyword'
import { MathArg } from '../../types'

export interface JoinConfig {
  natural?: boolean
  type: 'LEFT' | 'LEFT OUTER' | 'RIGHT' | 'RIGHT OUTER' | 'FULL' | 'FULL OUTER' | 'INNER' | 'CROSS'
  source: FromConfig
  on?: Condition
  using?: string[]
}

export type FromItemConfig = Source | {
  lateral?: boolean
  only?: boolean
  source: Source
  tablesample?: TablesampleConfig
  joins?: JoinConfig[]
}

export type FromConfig = FromItemConfig | FromItemConfig[]

export type TablesampleConfig = AnyExpression | {
  method: AnyExpression,
  repeatable?: MathArg
}

export const stringifyFrom = (config: FromConfig): Template => {
  if (Array.isArray(config)) return sql`${sv(config.map(stringifyFrom))}`
  const {
    source,
    lateral = undefined,
    only = undefined,
    tablesample = undefined,
    joins = undefined
  } = '$' in config ? { source: config } : config
  const ONLY_OR_LATERAL = only ? sql`ONLY ` : (lateral ? sql`LATERAL ` : sql``)
  const SOURCE = source.$.toSource()
  const TABLESAMPLE = tablesample ? sql` ${stringifyTablesample(tablesample)}` : sql``
  const JOINS = (joins && joins.length !== 0) ? sql` ${sv(joins.map(stringifyJoins), ' ')}` : sql``
  return sql`${ONLY_OR_LATERAL}${SOURCE}${TABLESAMPLE}${JOINS}`
}

export const stringifyTablesample = (config: TablesampleConfig): Template => {
  const { method, repeatable = undefined } = config instanceof AnyExpression ? { method: config } : config
  const REPEATABLE = repeatable ? sql` REPEATABLE(${repeatable})` : sql``
  return sql`TABLESAMPLE ${method}${REPEATABLE}`
}

export const stringifyJoins = (config: JoinConfig): Template => {
  const { type, source, on, using, natural } = config
  const NATURAL = natural ? sql`NATURAL ` : sql``
  const TYPE = keyword(type, ['LEFT', 'LEFT OUTER', 'RIGHT', 'RIGHT OUTER', 'FULL', 'FULL OUTER', 'INNER', 'CROSS'])
  const SOURCE = stringifyFrom(source)
  const ON = on ? sql` ON ${condition(on)}` : sql``
  const USING = using ? sql` USING ( ${sv(using.map(el => identifier(el)))} )` : sql``
  return sql`${NATURAL}${TYPE} JOIN ${SOURCE}${ON}${USING}`
}

export const stringifyTable = (config: Source | { only?: boolean, table: Source }) => {
  const { only = undefined, table } = '$' in config ? { table: config } : config
  const ONLY = only ? sql`ONLY ` : sql``
  return sql`${ONLY}${table.$.toSource()}`
}
