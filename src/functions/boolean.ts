import { AnyExpression, condition, expression, Condition, Expression, ToType } from '../expressions'
import { Type, IntegerType, ArrayArg, BooleanType } from '../types'
import { sql } from '../template'
import { Query } from '..'

export function NUM_NONNULLS (...args: (any)[]): Expression<IntegerType> {
  return expression`NUM_NONNULLS(${sql.join([...args])})`
}

export function NUM_NULLS (...args: (any)[]): Expression<IntegerType> {
  return expression`NUM_NULLS(${sql.join([...args])})`
}

export interface CaseConfig<T = any> { when: Condition, then: T }
export function CASE <T extends CaseConfig[], E> (cases: T, $else: E): Expression<ToType<T[number]['then']>> | Expression<ToType<E>>
export function CASE <T extends CaseConfig[]> (cases: T): Expression<ToType<T[number]['then']>>
export function CASE (cases: CaseConfig[], $else?: any): AnyExpression {
  const whenThen = cases.map(({ when, then }) => sql`WHEN ${condition(when)} THEN ${then}`)
  return expression`CASE ${sql.join(whenThen, ' ')}${$else ? sql` ELSE ${$else}` : sql``}`
}

export function COALESCE <T extends any[]> (...args: T): Expression<ToType<T[number]>> {
  return expression`COALESCE(${sql.join([...args])})`
}

export function NULLIF <T, V> (a: T, b: V): Expression<ToType<T>> | Expression<ToType<V>> {
  return expression`NULLIF(${a}, ${b})`
}

export function GREATEST <T extends any[]> (...args: T): Expression<ToType<T[number]>> {
  return expression`GREATEST(${sql.join([...args])})`
}

export function LEAST <T extends any[]> (...args: T): Expression<ToType<T[number]>> {
  return expression`LEAST(${sql.join([...args])})`
}

export function ANY (arg: Query): any
export function ANY <T extends Type> (arg: ArrayArg<T>): Expression<T>
export function ANY <T extends Type> (arg: ArrayArg<T> | Query): Expression<T> {
  return expression`ANY(${typeof arg === 'object' && '$' in arg ? arg.$ : arg})`
}

export function SOME (arg: Query): any
export function SOME <T extends Type> (arg: ArrayArg<T>): Expression<T>
export function SOME <T extends Type> (arg: ArrayArg<T> | Query): Expression<T> {
  return expression`SOME(${typeof arg === 'object' && '$' in arg ? arg.$ : arg})`
}

export function ALL (arg: Query): any
export function ALL <T extends Type> (arg: ArrayArg<T>): Expression<T>
export function ALL <T extends Type> (arg: ArrayArg<T> | Query): Expression<T> {
  return expression`ALL(${typeof arg === 'object' && '$' in arg ? arg.$ : arg})`
}

export function EXISTS (subquery: Query): Expression<BooleanType> {
  return expression`EXISTS(${subquery.$})`
}

export function ROW (subquery: Query, ...args: any[]): Expression {
  return expression`ROW(${sql.join(typeof subquery === 'object' && '$' in subquery ? [subquery.$] : [subquery, ...args])})`
}
