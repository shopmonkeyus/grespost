import { BooleanType, Type } from '../types'
import { keyword, sql, sv, Template } from '../template'
import { Expression, expression } from '.'
import { eident } from '../template/eident'
import { identifier } from '../template/identifier'
import { Query } from '..'

export class AnyExpression<T extends Type = Type> extends Template {
  type: T
  alias?: string
  columns?: string[]

  as (alias: string, columns?: string[]) {
    this.alias = alias
    this.columns = columns
    return this
  }

  toQuery (start = 1) {
    if (!this.alias) return super.toQuery(start)
    return [eident(this.alias), []] as [string, string[]]
  }

  toSource (): Template {
    const columns = this.columns && this.columns.length ? sql` ( ${sv(this.columns.map(el => identifier(el)))} )` : sql``
    const AS_ALIAS = this.alias ? sql` AS ${identifier(this.alias)}${columns}` : sql``
    return expression`${new Template(this.strings, this.literals)}${AS_ALIAS}`
  }

  cast <NT extends Type> (type: NT): Expression<T['nullable'] extends false ? ReturnType<NT['required']> : NT> {
    return expression`${this}::${type}`
  }

  /**
   * BooleanExpr: =
   */
  eq (operand: T['argument']): Expression<BooleanType<T['nullable']>> {
    return expression`${this} = ${operand}`
  }

  /**
   * BooleanExpr: !=
   */
  ne (operand: T['argument']): Expression<BooleanType<T['nullable']>> {
    return expression`${this} != ${operand}`
  }

  /**
   * BooleanExpr: IS
   */
  is (operand: null | boolean | 'UNKNOWN'): Expression<BooleanType<T['nullable']>> {
    return expression`${this} IS ${operand === 'UNKNOWN' ? keyword('UNKNOWN') : operand}`
  }

  /**
   * BooleanExpr: IS NOT
   */
  isNot (operand: null | boolean | 'UNKNOWN'): Expression<BooleanType<T['nullable']>> {
    return expression`${this} IS NOT ${operand === 'UNKNOWN' ? keyword('UNKNOWN') : operand}`
  }

  /**
   * BooleanExpr: IS
   */
  isDistinctFrom (operand: T['argument']): Expression<BooleanType<T['nullable']>> {
    return expression`${this} IS DISTINCT FROM ${operand}`
  }

  /**
   * BooleanExpr: IS NOT
   */
  isNotDistinctFrom (operand: T['argument']): Expression<BooleanType<T['nullable']>> {
    return expression`${this} IS NOT DISTINCT FROM ${operand}`
  }

  /**
   * BooleanExpr: >
   */
  gt (operand: T['argument']): Expression<BooleanType<T['nullable']>> {
    return expression`${this} > ${operand}`
  }

  /**
   * BooleanExpr: <
   */
  lt (operand: T['argument']): Expression<BooleanType<T['nullable']>> {
    return expression`${this} < ${operand}`
  }

  /**
   * BooleanExpr: >=
   */
  gte (operand: T['argument']): Expression<BooleanType<T['nullable']>> {
    return expression`${this} >= ${operand}`
  }

  /**
   * BooleanExpr: <=
   */
  lte (operand: T['argument']): Expression<BooleanType<T['nullable']>> {
    return expression`${this} <= ${operand}`
  }

  /**
   * BooleanExpr: <>
   */
  gl (operand: T['argument']): Expression<BooleanType<T['nullable']>> {
    return expression`${this} <> ${operand}`
  }

  /**
   * BooleanExpr: BETWEEN ${from} AND ${to}
   */
  between (from: T['argument'], to: T['argument']): Expression<BooleanType<T['nullable']>> {
    return expression`${this} BETWEEN ${from} AND ${to}`
  }

  /**
   * BooleanExpr: NOT BETWEEN ${from} AND ${to}
   */
  notBetween (from: T['argument'], to: T['argument']): Expression<BooleanType<T['nullable']>> {
    return expression`${this} NOT BETWEEN ${from} AND ${to}`
  }

  /**
   * BooleanExpr: BETWEEN SYMETRIC ${from} AND ${to}
   */
  betweenSymetric (from: T['argument'], to: T['argument']): Expression<BooleanType<T['nullable']>> {
    return expression`${this} BETWEEN SYMETRIC ${from} AND ${to}`
  }

  /**
   * BooleanExpr: NOT BETWEEN SYMETRIC ${from} AND ${to}
   */
  notBetweenSymetric (from: T['argument'], to: T['argument']): Expression<BooleanType<T['nullable']>> {
    return expression`${this} NOT BETWEEN SYMETRIC ${from} AND ${to}`
  }

  /**
   * BooleanExpr: IN (...operands)
   */
  in (subquery: Query): Expression<BooleanType<T['nullable']>>
  in (...operands: T['argument'][]): Expression<BooleanType<T['nullable']>>
  in (subquery: Query | T['argument'], ...operands: T['argument'][]): Expression<BooleanType<T['nullable']>> {
    return expression`${this} IN (${sv(typeof subquery === 'object' && '$' in subquery ? [subquery.$] : [subquery, ...operands])})`
  }

  /**
   * BooleanExpr: NOT IN (...operands)
   */
  notIn (subquery: Query): Expression<BooleanType<T['nullable']>>
  notIn (...operands: T['argument'][]): Expression<BooleanType<T['nullable']>>
  notIn (subquery: Query | T['argument'], ...operands: T['argument'][]): Expression<BooleanType<T['nullable']>> {
    return expression`${this} NOT IN (${sv(typeof subquery === 'object' && '$' in subquery ? [subquery.$] : [subquery, ...operands])})`
  }

  contain (arg: T['argument']): Expression<BooleanType<T['nullable']>> {
    return expression`${this} @> ${arg}`
  }

  contained (arg: T['argument']): Expression<BooleanType<T['nullable']>> {
    return expression`${this} <@ ${arg}`
  }
}
