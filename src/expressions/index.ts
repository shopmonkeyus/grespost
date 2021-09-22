import { sql } from '../template'
import { ArrayType, BooleanType, ByteaType, JSONBType, NumericType, TextType, TimestampType, Type, UnknownType } from '../types'
import { ArrayOps } from './array'
import { AnyExpression } from './any'
import { JSONOps } from './json'
import { IntegralOps, NumberOps } from './math'
import { TextSearchOps } from './search'
import { StringOps } from './string'
import { TimeZoneOps } from './timezone'

export * from './any'
export * from './array'
export * from './json'
export * from './math'
export * from './search'
export * from './string'
export * from './timezone'

export class ExpressionImpl extends StringOps(TimeZoneOps(NumberOps(IntegralOps(ArrayOps(JSONOps(TextSearchOps(AnyExpression))))))) {}

export type Constructor<T extends AnyExpression = AnyExpression> = new (...args: any[]) => T

export const expression = (strings: TemplateStringsArray, ...literals: any[]) => {
  return new ExpressionImpl([...strings], literals) as any
}

export type Expression<T extends Type = Type> = T['expression']

export type PrimitiveToType<T, R extends boolean> =
  T extends boolean ? BooleanType<R> :
  T extends number ? NumericType<R> :
  T extends string ? TextType<R> :
  T extends Buffer ? ByteaType<R> :
  T extends Date ? TimestampType<R> :
  T extends Array<infer I> ? ArrayType<PrimitiveToType<I, true>, R> :
  T extends Record<string, any> ? JSONBType<T, R> :
  UnknownType<T, R>

export type ToType<T> =
  Exclude<T, null | undefined> extends never ? UnknownType<null, true> :
  null extends T ? PrimitiveToType<Exclude<T, null>, true> :
  undefined extends T ? PrimitiveToType<Exclude<T, undefined>, true> :
  PrimitiveToType<T, false>

type IsUnknownRequired<T> = null extends T ? true : undefined extends T ? true : false
export type UnknownLiteral<T> = UnknownType<T, IsUnknownRequired<T>>

export function literal <T> (lit: T): Expression<UnknownLiteral<T>> {
  return expression`${lit}` as any
}

export type Condition = Condition[] | AnyExpression | 'AND' | 'OR' | 'NOT'

export const condition = (cond: Condition): Expression<BooleanType> => {
  if (Array.isArray(cond)) return expression`( ${sql.join(cond.map(condition), ' ')} )`
  if (typeof cond === 'string' && ['AND', 'OR', 'NOT'].includes(cond.toUpperCase())) return expression`${sql.keyword(cond, ['AND', 'OR', 'NOT'])}`
  return expression`${cond}`
}

export const toExpression = <T> (val: any): Expression<ToType<T>> => {
  if (val instanceof AnyExpression) return val as any
  return expression`${val}`
}
