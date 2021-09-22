import { AnyExpression, expression } from '../expressions'
import { sv } from '../template'

export function BERNOULLI (num: number): AnyExpression {
  return expression`BERNOULLI(${sv([...arguments])})`
}

export function SYSTEM (num: number): AnyExpression {
  return expression`SYSTEM(${sv([...arguments])})`
}
