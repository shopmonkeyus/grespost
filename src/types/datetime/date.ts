import { CharacterArg, TextType, IntegerArg, IntegerType } from '..'
import { AnyExpression, Expression } from '../../expressions'
import { ConstraintConfig } from '../../functions'
import { Type, type } from '../index'
import { IntervalArg } from './interval'
import { TimeArg } from './time'
import { TimestampType } from './timestamp'

export const DATE = () => type`DATE` as DateType<true>

export type DateArg = DateType['argument']

export interface DateType<R extends boolean = boolean> extends Type<'DATE', R> {
  expression: DateExpression<R>
  argument: Expression<DateType> | this['input']

  required(conf?: ConstraintConfig): DateType<false>
}

interface DateExpression<R extends boolean = boolean> extends AnyExpression<DateType<R>> {
  concat(arg: CharacterArg): Expression<TextType<R>>

  add(arg: IntegerArg): Expression<DateType<R>>
  add(arg: IntervalArg): Expression<TimestampType<R>>
  add(arg: TimeArg): Expression<TimestampType<R>>

  sub(arg: DateArg): Expression<IntegerType<R>>
  sub(arg: IntegerArg): Expression<DateType<R>>
  sub(arg: IntervalArg): Expression<TimestampType<R>>
}
