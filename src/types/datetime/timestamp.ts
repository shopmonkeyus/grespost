import { CharacterArg, TextType } from '..'
import { AnyExpression, Expression } from '../../expressions'
import { ConstraintConfig } from '../../functions'
import { sql } from '../../template'
import { Type, type } from '../index'
import { IntervalArg, IntervalType } from './interval'

export const TIMESTAMP = (precission?: number) => type`TIMESTAMP${precission ? sql`(${precission})` : sql``}` as TimestampType<true>

export type TimestampTypeArg = TimestampType['argument']

export interface TimestampType<R extends boolean = any> extends Type<'TIMESTAMP', R> {
  expression: TimestampExpression<TimestampType<R>>
  argument: Expression<TimestampType> | this['input']

  required(conf?: ConstraintConfig): TimestampType<false>
}

export const TIMESTAMPTZ = (precission?: number) => type`TIMESTAMPTZ${precission ? sql`(${precission})` : sql``}` as TimestamptzType<true>

export type TimestamptzTypeLiteral = TimestamptzType['input']
export type TimestamptzTypeArg = TimestamptzType['argument']

export interface TimestamptzType<R extends boolean = any> extends Type<'TIMESTAMPTZ', R> {
  expression: TimestampExpression<TimestamptzType<R>>
  argument: Expression<TimestamptzType> | this['input']

  required(conf?: ConstraintConfig): TimestamptzType<false>
}

export type TimestampTypes = TimestampType | TimestamptzType
export type TimestampArg = TimestampTypes['argument']

export interface TimestampExpression<T extends Type = TimestampTypes> extends AnyExpression<T> {
  concat(arg: CharacterArg): Expression<TextType<T['nullable']>>

  add(arg: IntervalArg): TimestampExpression<T>

  sub(arg: IntervalArg): TimestampExpression<T>
  sub(arg: T['argument']): Expression<IntervalType<T['nullable']>>

  tz(arg: CharacterArg): TimestampExpression<T extends TimestampType ? TimestamptzType : TimestampType>
}
