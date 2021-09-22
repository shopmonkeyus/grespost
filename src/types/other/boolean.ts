import { AnyExpression, Expression } from '../../expressions'
import { CharacterArg, TextType } from '..'
import { Type, type } from '../index'
import { ConstraintConfig } from '../../functions'

export const BOOLEAN = () => type`BOOLEAN` as BooleanType<true>

export type BooleanArg = BooleanType['argument']

export interface BooleanType<R extends boolean = boolean> extends Type<'BOOLEAN', R> {
  expression: BooleanExpression<R>
  argument: BooleanExpression | this['input']

  required(conf?: ConstraintConfig): BooleanType<false>
}

export interface BooleanExpression<R extends boolean = boolean> extends AnyExpression<BooleanType<R>> {
  concat(arg: CharacterArg): Expression<TextType<R>>
}
