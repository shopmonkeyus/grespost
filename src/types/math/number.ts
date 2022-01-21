import { DoubleType, InferMathTypePrec, IntegralType, MathType, NumericType } from '.'
import { Type } from '..'
import { AnyExpression, Expression } from '../../expressions'
import { IntegralExpression } from './integral'

export interface NumberExpression<T extends Type = MathType> extends AnyExpression<T> {
  add (arg: T['input']): NumberExpression<T>
  add <A extends MathType>(arg: NumberExpression<A>): NumberExpression<InferMathTypePrec<T, A, T['nullable']>>
  add <A extends IntegralType>(arg: IntegralExpression<A>): NumberExpression<InferMathTypePrec<T, A, T['nullable']>>

  add (arg: T['input']): NumberExpression<T>
  add <A extends MathType>(arg: NumberExpression<A>): NumberExpression<InferMathTypePrec<T, A, T['nullable']>>
  add <A extends IntegralType>(arg: IntegralExpression<A>): NumberExpression<InferMathTypePrec<T, A, T['nullable']>>

  sub (arg: T['input']): NumberExpression<T>
  sub <A extends MathType>(arg: NumberExpression<A>): NumberExpression<InferMathTypePrec<T, A, T['nullable']>>
  sub <A extends IntegralType>(arg: IntegralExpression<A>): NumberExpression<InferMathTypePrec<T, A, T['nullable']>>

  mul (arg: T['input']): NumberExpression<T>
  mul <A extends MathType>(arg: NumberExpression<A>): NumberExpression<InferMathTypePrec<T, A, T['nullable']>>
  mul <A extends IntegralType>(arg: IntegralExpression<A>): NumberExpression<InferMathTypePrec<T, A, T['nullable']>>

  div (arg: T['input']): NumberExpression<T>
  div <A extends MathType>(arg: NumberExpression<A>): NumberExpression<InferMathTypePrec<T, A, T['nullable']>>
  div <A extends IntegralType>(arg: IntegralExpression<A>): NumberExpression<InferMathTypePrec<T, A, T['nullable']>>

  mod (arg: T['input']): NumberExpression<T>
  mod <A extends MathType>(arg: NumberExpression<A>): NumberExpression<InferMathTypePrec<T, A, T['nullable']>>
  mod <A extends IntegralType>(arg: IntegralExpression<A>): NumberExpression<InferMathTypePrec<T, A, T['nullable']>>

  neg (): NumberExpression<T>

  abs (): NumberExpression<T>

  pow (arg: T['input']): NumberExpression<T>
  pow (arg: Expression<NumericType>): Expression<NumericType<T['nullable']>>
  pow (arg: NumberExpression | IntegralExpression): Expression<DoubleType<T['nullable']>>

  sqrt (): Expression<DoubleType<T['nullable']>>

  cbrt (): Expression<DoubleType<T['nullable']>>
}
