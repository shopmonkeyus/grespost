import { Constructor, Expression, expression } from '../expressions'
import { BooleanType, TSQueryType } from '../types'

export function TextSearchOps <T extends Constructor> (Base: T) {
  return class TextSearchOps extends Base {
    match (arg: any): Expression<BooleanType> {
      return expression`${this} @@ ${arg}`
    }

    also (arg: Expression<TSQueryType>): Expression<TSQueryType> {
      return expression`${this} && ${arg}`
    }

    either (arg: Expression<TSQueryType>): Expression<TSQueryType> {
      return expression`${this} || ${arg}`
    }

    no (): Expression<TSQueryType> {
      return expression`!! ${this}`
    }

    successive (arg: Expression<TSQueryType>): Expression<TSQueryType> {
      return expression`${this} <-> ${arg}`
    }
  }
}
