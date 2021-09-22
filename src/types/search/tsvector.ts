import { BooleanType, CharacterArg, TextType, TSQueryArg } from '../'
import { AnyExpression, Expression } from '../../expressions'
import { ConstraintConfig } from '../../functions'
import { Type, type } from '../index'

export const TSVECTOR = () => type`TSVECTOR` as TSVectorType<true>

export type TSVectorArg = TSVectorType['argument']

export interface TSVectorType<R extends boolean = boolean> extends Type<'TSVECTOR', R> {
  expression: TSVectorExpression<R>
  argument: Expression<TSVectorType> | this['input']

  required(conf?: ConstraintConfig): TSVectorType<false>
}

export interface TSVectorExpression<R extends boolean = boolean> extends AnyExpression<TSVectorType<R>> {
  concat(arg: TSVectorArg): Expression<TSVectorType<R>>
  concat(arg: CharacterArg): Expression<TextType<R>>

  match (arg: TSQueryArg): Expression<BooleanType<R>>
}
