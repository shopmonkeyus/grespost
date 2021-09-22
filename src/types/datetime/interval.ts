import { CharacterArg, DoubleArg, TextType } from '..'
import { AnyExpression, Expression } from '../../expressions'
import { ConstraintConfig } from '../../functions'
import { sql } from '../../template'
import { Type, type } from '../index'
import { DateType } from './date'
import { TimeTypes } from './time'
import { TimestampTypes } from './timestamp'

export function INTERVAL (fields?: string, precission?: number) {
  return type`INTERVAL${sql.join([fields, precission].filter(Boolean), ', ', '()')}` as IntervalType<true>
}

export interface PostgresInterval {
  years?: number
  days?: number
  hours?: number
  seconds?: number
  toPostgres(): string
  toISOString(): string
}

export type IntervalArg = IntervalType['argument']

export interface IntervalType<R extends boolean = boolean> extends Type<'INTERVAL', R> {
  expression: IntervalExpression<R>
  argument: Expression<IntervalType> | this['input']

  required(conf?: ConstraintConfig): IntervalType<false>
}

export interface IntervalExpression<R extends boolean = boolean> extends AnyExpression<IntervalType<R>> {
  concat(arg: CharacterArg): Expression<TextType<R>>

  add(arg: IntervalArg): Expression<IntervalType<R>>
  add(arg: Expression<DateType>): Expression<DateType<R>>
  add<T extends TimestampTypes>(arg: Expression<T>): Expression<T>
  add<T extends TimeTypes>(arg: Expression<T>): Expression<T>

  negate(): Expression<IntervalType<R>>

  sub(arg: IntervalArg): Expression<IntervalType<R>>

  mul(arg: DoubleArg): Expression<IntervalType<R>>

  div(arg: DoubleArg): Expression<IntervalType<R>>
}
