import { CharacterArg, TextType } from '..'
import { AnyExpression, Expression } from '../../expressions'
import { ConstraintConfig } from '../../functions'
import { sql } from '../../template'
import { Type, type } from '../index'
import { DateArg } from './date'
import { IntervalArg, IntervalType } from './interval'
import { TimestampType } from './timestamp'

export const TIME = (precission?: number) => type`TIME${precission ? sql`(${precission})` : sql``}` as TimeType<true>

export type TimeTypeLiteral = TimeType['input']
export type TimeTypeArg = TimeType['argument']

export interface TimeType<R extends boolean = any> extends Type<'TIME', R> {
  expression: TimeExpression<TimeType<R>>
  argument: Expression<TimeType> | this['input']

  required(conf?: ConstraintConfig): TimeType<false>
}

export const TIMETZ = (precission?: number) => type`TIMETZ${precission ? sql`(${precission})` : sql``}` as TimetzType<true>

export type TimetzTypeLiteral = TimeType['input']
export type TimetzTypeArg = TimeType['argument']

export interface TimetzType<R extends boolean = any> extends Type<'TIMETZ', R> {
  expression: TimeExpression<TimetzType<R>>
  argument: Expression<TimetzType> | this['input']

  required(conf?: ConstraintConfig): TimetzType<false>
}

export type TimeTypes = TimeType | TimetzType
export type TimeLiteral = TimeTypes['input']
export type TimeArg = TimeTypes['argument']

export interface TimeExpression<T extends Type> extends AnyExpression<T> {
  concat(arg: CharacterArg): Expression<TextType<T['nullable']>>

  add(arg: DateArg): Expression<TimestampType<T['nullable']>>
  add(arg: IntervalArg): TimeExpression<T>

  sub(arg: TimeArg): Expression<IntervalType<T['nullable']>>
  sub(arg: IntervalArg): TimeExpression<T>

  tz(arg: CharacterArg): TimeExpression<TimetzType<T['nullable']>>
}
