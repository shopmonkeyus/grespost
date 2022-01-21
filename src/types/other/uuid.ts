import { CharacterArg, TextType } from '..'
import { AnyExpression, Expression } from '../../expressions'
import { ConstraintConfig } from '../../functions'
import { Type, type } from '../index'

export const UUID = () => type`UUID` as UUIDType<true>

export type UUIDArg = UUIDType['argument']

export interface UUIDType<R extends boolean = any> extends Type<'UUID', R> {
  expression: UUIDExpression<R>
  argument: Expression<UUIDType> | this['input']

  required(conf?: ConstraintConfig): UUIDType<false>
}

export interface UUIDExpression<R extends boolean = any> extends AnyExpression<UUIDType<R>> {
  concat(arg: CharacterArg): Expression<TextType<R>>
}
