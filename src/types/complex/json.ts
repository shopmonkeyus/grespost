import { ArrayArg, IntegerArg, CharacterArg, TextType } from '../'
import { AnyExpression, Expression } from '../../expressions'
import { ConstraintConfig } from '../../functions'
import { Type, type } from '../index'

export const JSON = <T extends object = object>() => type`JSON` as JSONType<T, true>

export type JSONArg = JSONType['argument']

export interface JSONType<T extends object = object, R extends boolean = boolean> extends Type<'JSON', R, T> {
  expression: JSONExpression<T, R>
  argument: Expression<JSONType<T>> | this['input']

  required(conf?: ConstraintConfig): JSONType<T, false>
}

export interface JSONExpression<T extends Record<string, any> = Record<string, any>, R extends boolean = boolean> extends AnyExpression<JSONType<T, R>> {
  concat(arg: CharacterArg): Expression<TextType<R>>

  get <K extends keyof T>(item: K): Expression<JSONType<T[K], R>>
  get (item: IntegerArg | CharacterArg): Expression<JSONType<T, R>>

  getText (item: IntegerArg | CharacterArg): Expression<TextType<R>>

  getByPath (path: ArrayArg<TextType>): Expression<JSONType<T, R>>

  getTextByPath (path: ArrayArg<TextType>): Expression<TextType<R>>
}
