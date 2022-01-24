import { EventEmitter } from 'events'
import { AnyExpression, QueryDefinition } from './'

declare module 'pg' {
  interface FieldDef {
    name: string
    tableID: number
    columnID: number
    dataTypeID: number
    dataTypeSize: number
    dataTypeModifier: number
    format: string
  }

  interface QueryResultBase {
    command: string
    rowCount: number
    oid: number
    fields: FieldDef[]
  }

  interface QueryResult<R extends Record<string, any> = any> extends QueryResultBase {
    rows: R[]
  }

  interface Pool extends EventEmitter {
    query<T extends Record<string, AnyExpression>>(
      query: QueryDefinition<T>
    ): Promise<QueryResult<{ [K in keyof T]: T[K]['type']['primitive'] }>>
  }

  interface ClientBase extends EventEmitter {
    query<T extends Record<string, AnyExpression>>(
      query: QueryDefinition<T>
    ): Promise<QueryResult<{ [K in keyof T]: T[K]['type']['primitive'] }>>
  }
}

export * from './expressions'
export * from './functions'
export * from './queries'
export * from './source'
export * from './template'
export * from './types'
