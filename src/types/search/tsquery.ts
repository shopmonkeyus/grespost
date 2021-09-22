import { BooleanType, CharacterArg, TextType } from '../'
import { AnyExpression, Expression } from '../../expressions'
import { ConstraintConfig } from '../../functions'
import { Type, type } from '../index'
import { TSVectorArg } from './tsvector'

export const TSQUERY = () => type`TSQUERY` as TSQueryType<true>

export type TSQueryArg = TSQueryType['argument']

export interface TSQueryType<R extends boolean = boolean> extends Type<'TSQUERY', R> {
  expression: TSQueryExpression<R>
  argument: Expression<TSQueryType> | this['input']

  required(conf?: ConstraintConfig): TSQueryType<false>
}

export interface TSQueryExpression<R extends boolean = boolean> extends AnyExpression<TSQueryType<R>> {
  concat (arg: CharacterArg): Expression<TextType<R>>

  match (arg: TSVectorArg): Expression<BooleanType<R>>

  also (arg: TSQueryArg): Expression<TSQueryType<R>>

  either (arg: TSQueryArg): Expression<TSQueryType<R>>

  no (): Expression<TSQueryType<R>>

  successive (arg: TSQueryArg): Expression<TSQueryType<R>>
}
