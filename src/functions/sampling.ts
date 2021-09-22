import { AnyExpression, expression } from '../expressions'
import { sql } from '../template'

export function BERNOULLI (num: number): AnyExpression {
  return expression`BERNOULLI(${sql.join([...arguments])})`
}

export function SYSTEM (num: number): AnyExpression {
  return expression`SYSTEM(${sql.join([...arguments])})`
}
