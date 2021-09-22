import { AnyExpression } from '../../expressions'
import { ConstraintConfig } from '../../functions'
import { Type } from '../index'

export interface UnknownType<T = string, R extends boolean = boolean> extends Type<'UNKNOWN', R, T> {
  expression: AnyExpression<UnknownType<T, R>>
  argument: this['input'] | this['expression']

  required(conf?: ConstraintConfig): UnknownType<T, false>
}
