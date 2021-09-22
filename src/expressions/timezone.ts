import { AnyExpression, Constructor, expression } from '../expressions'
import { CharacterArg } from '../types'

export type TimeZoneOps = ReturnType<typeof TimeZoneOps>

export function TimeZoneOps <T extends Constructor> (Base: T) {
  return class TimeZoneOps extends Base {
    /**
     * Operation: AT TIME ZONE
     */
    tz (operand: CharacterArg): AnyExpression {
      return expression`${this} AT TIME ZONE ${operand}`
    }
  }
}
