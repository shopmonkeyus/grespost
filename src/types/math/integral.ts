import { Type } from '../'
import { DoubleType, InferMathTypePrec, IntegerArg, IntegralType, MathType, NumericType } from '.'
import { AnyExpression, Expression } from '../../expressions'
import { DateArg, DateType } from '../datetime/date'
import { NumberExpression } from './number'

export interface IntegralExpression<T extends Type = IntegralType> extends AnyExpression<T> {
  add (arg: T['input']): Expression<NumericType<T['nullable']>>
  add <A extends MathType>(arg: NumberExpression<A>): Expression<InferMathTypePrec<T, A, T['nullable']>>
  add <A extends IntegralType>(arg: IntegralExpression<A>): IntegralExpression<InferMathTypePrec<T, A, T['nullable']>>
  add (date: DateArg): Expression<DateType>

  sub (arg: T['input']): Expression<NumericType<T['nullable']>>
  sub <A extends MathType>(arg: NumberExpression<A>): Expression<InferMathTypePrec<T, A, T['nullable']>>
  sub <A extends IntegralType>(arg: IntegralExpression<A>): IntegralExpression<InferMathTypePrec<T, A, T['nullable']>>

  mul (arg: T['input']): Expression<NumericType<T['nullable']>>
  mul <A extends MathType>(arg: NumberExpression<A>): Expression<InferMathTypePrec<T, A, T['nullable']>>
  mul <A extends IntegralType>(arg: IntegralExpression<A>): IntegralExpression<InferMathTypePrec<T, A, T['nullable']>>

  div (arg: T['input']): Expression<NumericType<T['nullable']>>
  div <A extends MathType>(arg: NumberExpression<A>): Expression<InferMathTypePrec<T, A, T['nullable']>>
  div <A extends IntegralType>(arg: IntegralExpression<A>): IntegralExpression<InferMathTypePrec<T, A, T['nullable']>>

  mod (arg: T['input']): Expression<NumericType<T['nullable']>>
  mod <A extends MathType>(arg: NumberExpression<A>): Expression<InferMathTypePrec<T, A, T['nullable']>>
  mod <A extends IntegralType>(arg: IntegralExpression<A>): IntegralExpression<InferMathTypePrec<T, A, T['nullable']>>

  neg (): IntegralExpression<T>

  abs (): IntegralExpression<T>

  pow (arg: T['input']): Expression<NumericType<T['nullable']>>
  pow (arg: Expression<NumericType>): Expression<NumericType<T['nullable']>>
  pow (arg: NumberExpression | IntegralExpression): Expression<DoubleType<T['nullable']>>

  sqrt (): Expression<DoubleType<T['nullable']>>

  cbrt (): Expression<DoubleType<T['nullable']>>

  and (arg: T['input']): IntegralExpression<T>
  and <A extends IntegralType>(arg: IntegralExpression<A>): IntegralExpression<InferMathTypePrec<T, A, T['nullable']>>

  or (arg: T['input']): IntegralExpression<T>
  or <A extends IntegralType>(arg: IntegralExpression<A>): IntegralExpression<InferMathTypePrec<T, A, T['nullable']>>

  xor (arg: T['input']): IntegralExpression<T>
  xor <A extends IntegralType>(arg: IntegralExpression<A>): IntegralExpression<InferMathTypePrec<T, A, T['nullable']>>

  not (): IntegralExpression<T>

  lshift (arg: IntegerArg): IntegralExpression<T>

  rshift (arg: IntegerArg): IntegralExpression<T>
}
