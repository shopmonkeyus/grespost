import { CharacterArg, TextType } from '..'
import { AnyExpression, Expression } from '../../expressions'
import { ConstraintConfig } from '../../functions'
import { Type, type } from '../index'

export const BYTEA = () => type`BYTEA` as ByteaType<true>

export type ByteaArg = ByteaType['argument']

export interface ByteaType<R extends boolean = boolean> extends Type<'BYTEA', R> {
  expression: ByteaExpression<R>
  argument: Expression<ByteaType> | this['input']

  required(conf?: ConstraintConfig): ByteaType<false>
}

export interface ByteaExpression<R extends boolean = boolean> extends AnyExpression<ByteaType<R>> {
  concat(arg: ByteaArg): ByteaExpression<R>
  concat(arg: CharacterArg): Expression<TextType<R>>
}
