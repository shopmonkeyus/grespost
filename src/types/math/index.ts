import { type, Type } from '../'
import { Expression } from '../../expressions'
import { ConstraintConfig } from '../../functions'
import { IntegralExpression } from './integral'
import { NumberExpression } from './number'

export * from './integral'
export * from './number'

export const SMALLINT = () => type`SMALLINT` as SmallintType<true>
export const SMALLSERIAL = () => type`SMALLSERIAL` as SmallintType<true>

export type SmallintArg = SmallintType['argument']

export interface SmallintType<R extends boolean = boolean> extends Type<'SMALLINT', R> {
  expression: IntegralExpression<SmallintType<R>>
  argument: Expression<SmallintType> | this['input']

  required(conf?: ConstraintConfig): SmallintType<false>
}

export const INTEGER = () => type`INTEGER` as IntegerType<true>
export const SERIAL = () => type`SERIAL` as IntegerType<true>

export type IntegerArg = IntegerType['argument']

export interface IntegerType<R extends boolean = boolean> extends Type<'INTEGER', R> {
  expression: IntegralExpression<IntegerType<R>>
  argument: Expression<IntegerType> | this['input'] | Expression<SmallintType>

  required(conf?: ConstraintConfig): IntegerType<false>
}

export const BIGINT = () => type`BIGINT` as BigintType<true>
export const BIGSERIAL = () => type`SERIAL` as BigintType<true>

export type BigintArg = BigintType['argument']

export interface BigintType<R extends boolean = boolean> extends Type<'BIGINT', R> {
  expression: IntegralExpression<BigintType<R>>
  argument: Expression<BigintType> | this['input'] | Expression<SmallintType> | Expression<IntegerType>

  required(conf?: ConstraintConfig): BigintType<false>
}

export const NUMERIC = () => type`NUMERIC` as NumericType<true>

export type NumericArg = NumericType['argument']

export interface NumericType<R extends boolean = boolean> extends Type<'NUMERIC', R> {
  expression: NumberExpression<NumericType<R>>
  argument: Expression<NumericType> | this['input'] | Expression<SmallintType> | Expression<IntegerType> | Expression<BigintType>

  required(conf?: ConstraintConfig): NumericType<false>
}

export const REAL = () => type`REAL` as RealType<true>

export type RealArg = RealType['argument']

export interface RealType<R extends boolean = boolean> extends Type<'REAL', R> {
  expression: NumberExpression<RealType<R>>
  argument: Expression<RealType> | this['input'] | Expression<SmallintType> | Expression<IntegerType> | Expression<BigintType> | Expression<NumericType>

  required(conf?: ConstraintConfig): RealType<false>
}

export const DOUBLE = () => type`DOUBLE PRECISION` as DoubleType<true>

export type DoubleArg = DoubleType['argument']

export interface DoubleType<R extends boolean = boolean> extends Type<'DOUBLE', R> {
  expression: NumberExpression<DoubleType<R>>
  argument: Expression<DoubleType> | this['input'] | Expression<SmallintType> | Expression<IntegerType> | Expression<BigintType> | Expression<NumericType> | Expression<RealType>

  required(conf?: ConstraintConfig): DoubleType<false>
}

export type MathTypesPrec<R extends boolean> = [SmallintType<R>, IntegerType<R>, BigintType<R>, NumericType<R>, RealType<R>, DoubleType<R>]

export type InferMathTypePrec<X, Y, V extends boolean = boolean, T extends any[] = MathTypesPrec<V>> =
  T extends [...infer R, infer L] ? L extends X ? X : L extends Y ? Y : InferMathTypePrec<X, Y, V, R> : never

export type ToMathExpression<T extends (MathArg)> = T extends MathExpression ? T : Expression<NumericType>

export type MathType = SmallintType | IntegerType | BigintType | NumericType | RealType | DoubleType
export type MathExpression = MathType['expression']
export type MathLiteral = MathType['input']
export type MathArg = MathType['argument']

export type IntegralType = SmallintType | IntegerType | BigintType
export type IntegralLiteral = IntegralType['input']
export type IntegralArg = IntegralType['argument']
