import { AnyExpression, Expression } from '../../expressions'
import { ConstraintConfig } from '../../functions'
import { BooleanType, Type, type } from '../index'
import { BigintArg } from '../math'

export const ARRAY = <O extends Type>(of: O) => type`${of}[]` as ArrayType<O, true>

export type ArrayArg<T extends Type = Type> = ArrayType<T>['argument']

export interface ArrayType<T extends Type = Type, R extends boolean = boolean> extends Type<'ARRAY', R, T['output']> {
  expression: ArrayExpression<T, R>
  argument: Expression<ArrayType<T, R>> | this['input']

  required(conf?: ConstraintConfig): ArrayType<T, false>
}

export interface ArrayExpression<T extends Type = Type, R extends boolean = boolean> extends AnyExpression<ArrayType<T, R>> {
  concat(arr: ArrayArg<T>): Expression<ArrayType<T, R>>

  overlap (arg: ArrayArg<T>): Expression<BooleanType<R>>

  unshift (arg: T['argument']): Expression<ArrayType<T, R>>

  push (arg: T['argument']): Expression<ArrayType<T, R>>

  contain (arg: ArrayArg<T>): Expression<BooleanType<R>>

  contained (arg: ArrayArg<T>): Expression<BooleanType<R>>

  item(l: BigintArg): Expression<T>
  item(l: BigintArg, u: BigintArg): Expression<ArrayType<T, R>>
  item(l: BigintArg, u?: BigintArg): Expression<ArrayType<T, R>> | Expression<T>
}
