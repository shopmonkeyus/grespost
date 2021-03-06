import { condition, Condition, expression, Expression, sql, Table, Template } from '..'

export interface ConstraintConfig {
  name?: string
  deferrable?: boolean
  initially?: 'DEFERRED' | 'IMMEDIATE'
}

export const CONSTRAINT = (template: Template, conf?: ConstraintConfig) => {
  const NAME = conf?.name ? sql`CONSTRAINT ${sql.ident(conf.name)} ` : sql``
  const DEFERRABLE = typeof conf?.deferrable === 'boolean' ? conf?.deferrable ? sql` DEFERRABLE` : sql` NOT DEFERRABLE` : sql``
  const INITIALLY = conf?.initially ? sql` INITIALLY ${sql.keyword(conf.initially, ['DEFERRED', 'IMMEDIATE'])}` : sql``

  return sql`${NAME}${template}${DEFERRABLE}${INITIALLY} `
}

export const NOT_NULL = (conf?: ConstraintConfig) => {
  return CONSTRAINT(sql`NOT NULL`, conf)
}

export const NULL = (conf?: ConstraintConfig) => {
  return CONSTRAINT(sql`NULL`, conf)
}

export const CHECK = (expression: Condition, conf?: ConstraintConfig & { noInherit?: boolean }) => {
  return CONSTRAINT(sql`CHECK ( ${condition(expression)} ) ${conf?.noInherit ? sql`NO INHERIT` : sql``}`, conf)
}

export const DEFAULT = (value: any, conf?: ConstraintConfig) => {
  return CONSTRAINT(sql`DEFAULT ${value}`, conf)
}

export const GENERATED_AS = (type: 'ALWAYS' | 'BY DEFAULT', conf?: ConstraintConfig & { expression?: Expression, identity?: any }) => {
  const AS = conf?.expression ? sql`( ${expression} ) STORED` : sql`IDENTITY${conf?.identity ? sql` ( ${conf.identity} )` : sql``}`
  return CONSTRAINT(sql`GENERATED ${sql.keyword(type, ['ALWAYS', 'BY DEFAULT'])} AS ${AS}`, conf)
}

export interface IndexParametersConfig {
  include?: string[],
  with?: Record<string, any>,
  using?: string,
  columns?: string[]
}

const stringifyIndexParameters = (params?: IndexParametersConfig) => {
  if (!params) return sql``

  const COLUMNS = params.columns ? sql` ( ${sql.join(params.columns.map(el => sql.ident(el)))} )` : sql``
  const INCLUDE = params.include ? sql` INCLUDE ( ${sql.join(params.include.map(el => sql.ident(el)))} )` : sql``
  const WITH = params.with ? sql` WITH ( ${sql.join(Object.entries(params.with).map(([key, value]) => sql`${sql.keyword(key)}${value || sql``}`))} )` : sql``
  const USING = params.using ? sql` USING INDEX TABLESPACE ${sql.ident(params.using)}` : sql``

  return sql`${COLUMNS}${INCLUDE}${WITH}${USING}`
}

export const UNIQUE = (params?: IndexParametersConfig & ConstraintConfig) => {
  return CONSTRAINT(sql`UNIQUE${stringifyIndexParameters(params)}`, params)
}

export const PRIMARY_KEY = (params?: IndexParametersConfig & ConstraintConfig) => {
  return CONSTRAINT(sql`PRIMARY KEY${stringifyIndexParameters(params)}`, params)
}

type ReferentialAction = 'NO ACTION' | 'RESTRICT' | 'CASCADE' | 'SET NULL' | 'SET DEFAULT'

export interface ReferenceConfig<T> {
  columns?: T,
  match?: 'PARTIAL' | 'SIMPLE' | 'FULL',
  onDelete?: ReferentialAction
  onUpdate?: ReferentialAction
}

export const REFERENCES = (table: string | Table, conf?: ReferenceConfig<string | Expression> & ConstraintConfig) => {
  const TABLE = typeof table === 'string' ? sql.ident(table) : sql.ident(...table.$.name)
  const COLUMN = conf?.columns ? sql` ( ${typeof conf.columns === 'string' ? sql.ident(conf.columns) : conf.columns} )` : sql``
  const MATCH = conf?.match ? sql` MATCH ${sql.keyword(conf.match, ['PARTIAL', 'SIMPLE', 'FULL'])}` : sql``
  const referentialActions = ['NO ACTION', 'RESTRICT', 'CASCADE', 'SET NULL', 'SET DEFAULT']
  const ON_DELETE = conf?.onDelete ? sql` ON DELETE ${sql.keyword(conf.onDelete, referentialActions)}` : sql``
  const ON_UPDATE = conf?.onUpdate ? sql` ON UPDATE ${sql.keyword(conf.onUpdate, referentialActions)}` : sql``

  return CONSTRAINT(sql`REFERENCES ${TABLE}${COLUMN}${MATCH}${ON_DELETE}${ON_UPDATE}`, conf)
}

export const FOREIGN_KEY = (columns: (string | Expression)[], table: string | Table, conf?: ReferenceConfig<(string | Expression)[]> & ConstraintConfig) => {
  const COLUMNS = columns ? sql`( ${sql.join(columns.map(el => typeof el === 'string' ? sql.ident(el) : el))} )` : sql``
  const TABLE = typeof table === 'string' ? sql.ident(table) : sql.ident(...table.$.name)
  const REF_COLUMNS = conf?.columns ? sql` ( ${sql.join(conf.columns.map(el => typeof el === 'string' ? sql.ident(el) : el))} )` : sql``
  const MATCH = conf?.match ? sql` MATCH ${sql.keyword(conf.match, ['PARTIAL', 'SIMPLE', 'FULL'])}` : sql``
  const referentialActions = ['NO ACTION', 'RESTRICT', 'CASCADE', 'SET NULL', 'SET DEFAULT']
  const ON_DELETE = conf?.onDelete ? sql` ON DELETE ${sql.keyword(conf.onDelete, referentialActions)}` : sql``
  const ON_UPDATE = conf?.onUpdate ? sql` ON UPDATE ${sql.keyword(conf.onUpdate, referentialActions)}` : sql``

  return CONSTRAINT(sql`FOREIGN KEY ${COLUMNS} REFERENCES ${TABLE}${REF_COLUMNS}${MATCH}${ON_DELETE}${ON_UPDATE}`, conf)
}

type LikeOptions = 'COMMENTS' | 'CONSTRAINTS' | 'DEFAULTS' | 'GENERATED' | 'IDENTITY' | 'INDEXES' | 'STATISTICS' | 'STORAGE' | 'ALL'

export const LIKE = (table: string, options: { including?: LikeOptions[], excluding?: LikeOptions[] }) => {
  const likeOptions = ['COMMENTS', 'CONSTRAINTS', 'DEFAULTS', 'GENERATED', 'IDENTITY', 'INDEXES', 'STATISTICS', 'STORAGE', 'ALL']
  const INCLUDING = options.including && options.including.length
    ? sql` ${sql.join(options.including.map(el => sql`INCLUDING ${sql.keyword(el, likeOptions)}`), ' ')}`
    : sql``
  const EXCLUDING = options.excluding && options.excluding.length
    ? sql` ${sql.join(options.excluding.map(el => sql`EXCLUDING ${sql.keyword(el, likeOptions)}`), ' ')}`
    : sql``
  const TABLE = sql.ident(table)

  return sql`LIKE ${TABLE}${INCLUDING}${EXCLUDING}`
}
