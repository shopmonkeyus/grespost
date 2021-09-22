import { BooleanType, IntegerArg, CharacterArg, TextType, ArrayArg } from '../'
import { AnyExpression, Expression } from '../../expressions'
import { ConstraintConfig } from '../../functions'
import { Type, type } from '../index'

export const JSONB = <T extends object = object>() => type`JSONB` as JSONBType<T, true>

export type JSONBArg = JSONBType['argument']

export interface JSONBType<T extends object = object, R extends boolean = boolean> extends Type<'JSONB', R, T> {
  expression: JSONBExpression<T, R>
  argument: Expression<JSONBType<T, R>> | this['input']

  required(conf?: ConstraintConfig): JSONBType<T, false>
}

export interface JSONBExpression<T extends Record<string, any> = Record<string, any>, R extends boolean = boolean> extends AnyExpression<JSONBType<T, R>> {
  concat(arg: CharacterArg): Expression<TextType<R>>
  concat(arg: JSONBExpression): Expression<JSONBType<T, R>>

  get <K extends keyof T>(item: K): Expression<JSONBType<T[K], R>>
  get (item: IntegerArg | CharacterArg): Expression<JSONBType<T, R>>

  getText (item: IntegerArg | CharacterArg): Expression<TextType<R>>

  getByPath (path: ArrayArg<TextType>): Expression<JSONBType<T, R>>

  getTextByPath (path: ArrayArg<TextType>): Expression<TextType<R>>

  contain (arg: any): Expression<BooleanType<R>>

  contained (arg: any): Expression<BooleanType<R>>

  includes (text: CharacterArg): Expression<BooleanType<R>>

  includesAny (text: ArrayArg<TextType>): Expression<BooleanType<R>>

  includesAll (text: ArrayArg<TextType>): Expression<BooleanType<R>>

  unset (item: IntegerArg | CharacterArg): Expression<JSONBType<T, R>>

  unsetAll (item: ArrayArg<TextType>): Expression<JSONBType<T, R>>

  unsetByPath (path: ArrayArg<TextType>): Expression<JSONBType<T, R>>

  jsonPathExist (path: CharacterArg): Expression<BooleanType<R>>

  jsonPathCheck (path: CharacterArg): Expression<BooleanType<R>>
}
