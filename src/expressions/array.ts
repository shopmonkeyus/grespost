import { sql } from '..'
import { Constructor, Expression, expression } from '../expressions'
import { ArrayArg, ArrayType, BigintArg, BooleanType } from '../types'

export function ArrayOps <T extends Constructor> (Base: T) {
  return class ArrayOps extends Base {
    overlap (other: ArrayArg): Expression<BooleanType> {
      return expression`${this} && ${other}`
    }

    unshift (other: ArrayArg): Expression<ArrayType> {
      return expression`${other} || ${this}`
    }

    push (other: ArrayArg): Expression<ArrayType> {
      return expression`${this} || ${other}`
    }

    item (l: BigintArg, u?: BigintArg): Expression<ArrayType> {
      return expression`${this}[${l}${u !== undefined ? sql`:${u}` : sql``}]`
    }
  }
}
