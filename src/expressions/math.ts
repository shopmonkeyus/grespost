import { Constructor, expression } from '../expressions'
import { AnyExpression } from './any'

export type IntegralOps = ReturnType<typeof IntegralOps>

export function IntegralOps <T extends Constructor> (Base: T) {
  return class IntegralOps extends Base {
    /**
     * Operation: &
     */
    and (operand: any): AnyExpression {
      return expression`${this} & ${operand}`
    }

    /**
     * Operation: |
     */
    or (operand: any): AnyExpression {
      return expression`${this} | ${operand}`
    }

    /**
     * Operation: #
     */
    xor (operand: any): AnyExpression {
      return expression`${this} # ${operand}`
    }

    /**
     * Operation: ~
     */
    not (): AnyExpression {
      return expression`~ ${this}`
    }

    /**
     * Operation: <<
     */
    lshift (operand: any): AnyExpression {
      return expression`${this} << ${operand}`
    }

    /**
     * Operation: >>
     */
    rshift (operand: any): AnyExpression {
      return expression`${this} >> ${operand}`
    }
  }
}

export type NumberOps = ReturnType<typeof NumberOps>

export function NumberOps <T extends Constructor> (Base: T) {
  return class NumberOps extends Base {
    /**
     * Operation: +
     */
    add (operand: any): AnyExpression {
      return expression`(${this} + ${operand})`
    }

    /**
     * Operation: -
     */
    sub (operand: any): AnyExpression {
      return expression`(${this} - ${operand})`
    }

    /**
     * Operation: *
     */
    mul (operand: any): AnyExpression {
      return expression`(${this} * ${operand})`
    }

    /**
     * Operation: /
     */
    div (operand: any): AnyExpression {
      return expression`(${this} / ${operand})`
    }

    /**
     * Operation: %
     */
    mod (operand: any): AnyExpression {
      return expression`(${this} % ${operand})`
    }

    /**
     * Operation: -x
     */
    neg (): AnyExpression {
      return expression`(- ${this})`
    }

    /**
     * Operation: @
     */
    abs (): AnyExpression {
      return expression`(@ ${this})`
    }

    /**
     * Operation: ^
     */
    pow (operand: any): AnyExpression {
      return expression`(${this} ^ ${operand})`
    }

    /**
     * Operation: |/
     */
    sqrt (): AnyExpression {
      return expression`(|/ ${this})`
    }

    /**
     * Operation: ||/
     */
    cbrt (): AnyExpression {
      return expression`(||/ ${this})`
    }
  }
}
