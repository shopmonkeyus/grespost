import { BooleanType } from '..'
import { AnyExpression, Expression } from '../../expressions'
import { ConstraintConfig } from '../../functions'
import { sql } from '../../template'
import { Type, type } from '../index'
import { TSQueryType } from '../search/tsquery'

export const CHAR = (n?: number) => type`CHAR${n !== undefined ? sql`(${n})` : sql``}` as CharType<true>
export type CharArg = CharType['argument']

export interface CharType<R extends boolean = boolean> extends Type<'CHAR', R> {
  expression: CharacterExpression<CharType<R>>
  argument: Expression<CharType> | this['input'] | Expression<VarcharType> | Expression<TextType>

  required(conf?: ConstraintConfig): CharType<false>
}

export const VARCHAR = (n?: number) => type`VARCHAR${n !== undefined ? sql`(${n})` : sql``}` as VarcharType<true>
export type VarcharArg = VarcharType['argument']

export interface VarcharType<R extends boolean = boolean> extends Type<'VARCHAR', R> {
  expression: CharacterExpression<VarcharType<R>>
  argument: Expression<VarcharType> | this['input'] | Expression<CharType> | Expression<TextType>

  required(conf?: ConstraintConfig): VarcharType<false>
}

export const TEXT = () => type`TEXT` as TextType<true>
export type TextArg = TextType['argument']

export interface TextType<R extends boolean = boolean> extends Type<'TEXT', R> {
  expression: CharacterExpression<TextType<R>>
  argument: Expression<TextType> | this['input'] | Expression<CharType> | Expression<VarcharType>

  required(conf?: ConstraintConfig): TextType<false>
}

export type CharacterTypes = CharType<any> | VarcharType<any> | TextType<any>
export type CharacterArg = CharacterTypes['argument']

export interface CharacterExpression<T extends CharacterTypes = CharacterTypes> extends AnyExpression<T> {
  concat(arg: CharacterArg): Expression<TextType<T['nullable']>>

  match (arg: Expression<TSQueryType>): Expression<BooleanType<T['nullable']>>

  similarTo (pattern: CharacterArg, escape?: CharacterArg): Expression<BooleanType<T['nullable']>>

  notSimilarTo (pattern: CharacterArg, escape?: CharacterArg): Expression<BooleanType<T['nullable']>>

  matchRegex (pattern: CharacterArg, caseSensitively?: boolean): Expression<BooleanType<T['nullable']>>

  notMatchRegex (pattern: CharacterArg, caseSensitively?: boolean): Expression<BooleanType<T['nullable']>>

  isNormalized (form?: 'NFC' | 'NFD' | 'NFKC' | 'NFKD'): Expression<BooleanType<T['nullable']>>

  isNotNormalized (form?: 'NFC' | 'NFD' | 'NFKC' | 'NFKD'): Expression<BooleanType<T['nullable']>>

  like (pattern: CharacterArg, escape?: CharacterArg): Expression<BooleanType<T['nullable']>>

  notLike (pattern: CharacterArg, escape?: CharacterArg): Expression<BooleanType<T['nullable']>>

}
