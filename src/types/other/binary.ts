import { CharacterArg, TextType } from '..'
import { AnyExpression, Expression } from '../../expressions'
import { ConstraintConfig } from '../../functions'
import { sql } from '../../template'
import { Type, type } from '../index'
import { IntegerArg } from '../math'

export const BIT = (n?: number) => type`BIT${n ? sql`(${n})` : sql``}` as BitType<true>

export type BitArg = BitType['argument']

export interface BitType<R extends boolean = boolean> extends Type<'BIT', R> {
  expression: BinaryExpression<BitType<R>>
  argument: Expression<BitType> | this['input'] | Expression<VarbitType>

  required(conf?: ConstraintConfig): BitType<false>
}

export const VARBIT = (n?: number) => type`VARBIT${n ? sql`(${n})` : sql``}` as VarbitType<true>

export type VarbitArg = VarbitType['argument']

export interface VarbitType<R extends boolean = boolean> extends Type<'VARBIT', R> {
  expression: BinaryExpression<VarbitType<R>>
  argument: Expression<VarbitType> | this['input'] | Expression<BitType>

  required(conf?: ConstraintConfig): VarbitType<false>
}

export type BinaryTypes = BitType | VarbitType
export type BinaryArg = BinaryTypes['argument']

export interface BinaryExpression<T extends BinaryTypes = BinaryTypes> extends AnyExpression<T> {
  concat(arg: BinaryArg): Expression<VarbitType<T['nullable']>>
  concat(arg: CharacterArg): Expression<TextType<T['nullable']>>

  and (arg: BinaryArg): Expression<BitType<T['nullable']>>

  or (arg: BinaryArg): Expression<BitType<T['nullable']>>

  xor (arg: BinaryArg): Expression<BitType<T['nullable']>>

  not (): Expression<BitType<T['nullable']>>

  lshift (arg: IntegerArg): Expression<BitType<T['nullable']>>

  rshift (arg: IntegerArg): Expression<BitType<T['nullable']>>
}
