import { Condition, Expression, Table } from '..'
import { AnyExpression } from '../expressions/any'
import { CHECK, ConstraintConfig, DEFAULT, GENERATED_AS, IndexParametersConfig, NOT_NULL, PRIMARY_KEY, ReferenceConfig, REFERENCES, UNIQUE } from '../functions'
import { Template } from '../template'
import { PostgresInterval } from './datetime/interval'

export * from './other/boolean'
export * from './other/string'
export * from './other/binary'
export * from './other/bytea'
export * from './other/unknown'
export * from './other/uuid'

export * from './search/tsquery'
export * from './search/tsvector'

export * from './complex/array'
export * from './complex/json'
export * from './complex/jsonb'

export * from './datetime/date'
export * from './datetime/interval'
export * from './datetime/time'
export * from './datetime/timestamp'

export * from './math'

export const type = (strings: TemplateStringsArray, ...literals: any[]) => {
  return new Type([...strings], literals)
}

export interface DefaultOutputMapping<T = any> {
  UNKNOWN: Exclude<T, null | undefined> extends never ? null : string
  INTERVAL: PostgresInterval
  ARRAY: Array<T>
  TSVECTOR: string
  TSQUERY: string
  UUID: string
  JSON: T
  JSONB: T
  CHAR: string
  VARCHAR: string
  TEXT: string
  BYTEA: Buffer
  BOOLEAN: boolean
  BIT: string
  VARBIT: string
  SMALLINT: number
  INTEGER: number
  BIGINT: bigint
  NUMERIC: number
  REAL: number
  DOUBLE: number
  TIMESTAMP: Date
  TIMESTAMPTZ: Date
  TIME: string
  TIMETZ: string
  DATE: Date
  NULL: null
}

export interface DefaultInputMapping<T = any> {
  UNKNOWN: any
  INTERVAL: string
  ARRAY: Array<T> | string
  TSVECTOR: string
  TSQUERY: string
  UUID: string
  JSON: T | string
  JSONB: T | string
  CHAR: string
  VARCHAR: string
  TEXT: string
  BYTEA: Buffer | string
  BOOLEAN: boolean
  BIT: string
  VARBIT: string
  SMALLINT: number | string | bigint
  INTEGER: number | string | bigint
  BIGINT: number | string | bigint
  NUMERIC: number | string | bigint
  REAL: number | string | bigint
  DOUBLE: number | string | bigint
  TIMESTAMP: Date | string
  TIMESTAMPTZ: Date | string
  TIME: string
  TIMETZ: string
  DATE: Date | string
  NULL: null
}

export interface OverrideOutputMapping<T = any> {
  [key: string]: unknown
}

export interface OverrideInputMapping<T = any> {
  [key: string]: unknown
}

export type OutputMapping<T = any> = {
  [K in keyof DefaultOutputMapping<T>]: unknown extends OverrideOutputMapping<T>[K] ? DefaultOutputMapping<T>[K] : OverrideOutputMapping<T>[K]
}

export type InputMapping<T = any> = {
  [K in keyof DefaultInputMapping<T>]: unknown extends OverrideInputMapping<T>[K] ? DefaultInputMapping<T>[K] : OverrideInputMapping<T>[K]
}

export class Type<N extends keyof DefaultOutputMapping = keyof DefaultOutputMapping, R extends boolean = boolean, T = any> extends Template {
  primitive: this['nullable'] extends false ? this['output'] : this['output'] | null
  constraints: Template[] = []
  output: OutputMapping<T>[N]
  expression: AnyExpression
  nullable: R = true as any
  input: InputMapping<T>[N]
  argument: any
  type: T

  required (conf?: ConstraintConfig): Type<N, false, T> {
    this.constraints.push(NOT_NULL(conf))
    return this as any
  }

  default (value: any, conf?: ConstraintConfig): this {
    this.constraints.push(DEFAULT(value, conf))
    return this
  }

  check (expression: Condition, conf?: ConstraintConfig & { noInherit?: boolean }): this {
    this.constraints.push(CHECK(expression, conf))
    return this
  }

  generated (type: 'ALWAYS' | 'BY DEFAULT', conf?: ConstraintConfig & { expression?: Expression, identity?: any }): this {
    this.constraints.push(GENERATED_AS(type, conf))
    return this
  }

  unique (params?: IndexParametersConfig & ConstraintConfig): this {
    this.constraints.push(UNIQUE(params))
    return this
  }

  primary (params?: IndexParametersConfig & ConstraintConfig): this {
    this.constraints.push(PRIMARY_KEY(params))
    return this
  }

  references (table: string | Table, conf?: ReferenceConfig<string | Expression> & ConstraintConfig): this {
    this.constraints.push(REFERENCES(table, conf))
    return this
  }
}
