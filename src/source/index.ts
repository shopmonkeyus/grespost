import { AnyExpression } from '../expressions'
import { Template } from '../template'

export * from './query'
export * from './table'

export interface Source<T extends Record<string, AnyExpression> = Record<string, AnyExpression>> {
  $: { toSource(): Template, expr: T }
}
