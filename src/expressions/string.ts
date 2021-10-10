import { Constructor, Expression, expression } from '.'
import { sql } from '../template'
import { BooleanType, CharacterArg } from '../types'
import { AnyExpression } from './any'

export function StringOps <T extends Constructor> (Base: T) {
  return class StringOps extends Base {
    /**
     * @description Checks whether the string is in the specified Unicode normalization form.
     * The optional form key word specifies the form: NFC (the default), NFD, NFKC, or NFKD.
     * This expression can only be used when the server encoding is UTF8.
     * Note that checking for normalization using this expression is often faster than
     * normalizing possibly already normalized strings.
     */
    isNormalized (form?: 'NFC' | 'NFD' | 'NFKC' | 'NFKD'): Expression<BooleanType> {
      return expression`${this} IS${form ? sql` ${sql.keyword(form, ['NFC', 'NFD', 'NFKC', 'NFKD'])}` : sql``} NORMALIZED`
    }

    /**
     * @description Checks whether the string is in the specified Unicode normalization form.
     * The optional form key word specifies the form: NFC (the default), NFD, NFKC, or NFKD.
     * This expression can only be used when the server encoding is UTF8.
     * Note that checking for normalization using this expression is often faster than
     * normalizing possibly already normalized strings.
     */
    isNotNormalized (form?: 'NFC' | 'NFD' | 'NFKC' | 'NFKD'): Expression<BooleanType> {
      return expression`${this} IS NOT${form ? sql` ${sql.keyword(form, ['NFC', 'NFD', 'NFKC', 'NFKD'])}` : sql``} NORMALIZED`
    }

    /**
     * BooleanExpr: LIKE '%some%'
     * @param {string} operand
     */
    like (pattern: CharacterArg, escape?: CharacterArg): Expression<BooleanType> {
      return expression`${this} LIKE ${pattern}${escape !== undefined ? expression` ESCAPE ${escape}` : sql``}`
    }

    /**
     * BooleanExpr: NOT LIKE '%some%'
     * @param {string} operand
     */
    notLike (pattern: CharacterArg, escape?: CharacterArg): Expression<BooleanType> {
      return expression`${this} NOT LIKE ${pattern}${escape !== undefined ? expression` ESCAPE ${escape}` : sql``}`
    }

    /**
     * BooleanExpr: SIMILAR TO '%some%'
     * @param {string} operand
     */
    similarTo (pattern: CharacterArg, escape?: CharacterArg): Expression<BooleanType> {
      return expression`${this} SIMILAR TO ${pattern}${escape !== undefined ? expression` ESCAPE ${escape}` : sql``}`
    }

    /**
     * BooleanExpr: NOT SIMILAR TO '%some%'
     * @param {string} operand
     */
    notSimilarTo (pattern: CharacterArg, escape?: CharacterArg): Expression<BooleanType> {
      return expression`${this} NOT SIMILAR TO ${pattern}${escape ? expression` ESCAPE ${escape}` : sql``}`
    }

    /**
     * @description String matches regular expression
     * Case sensitively operator: ~
     * Case insensitively operator: ~*
     */
    matchRegex (pattern: CharacterArg, caseSensitively: boolean = true): Expression<BooleanType> {
      const operator = caseSensitively ? sql.keyword('~') : sql.keyword('~*')
      return expression`${this} ${operator} ${pattern}`
    }

    /**
     * @description String does not matches regular expression
     * Case sensitively operator: !~
     * Case insensitively operator: !~*
     */
    notMatchRegex (pattern: CharacterArg, caseSensitively: boolean = true): Expression<BooleanType> {
      const operator = caseSensitively ? sql.keyword('!~') : sql.keyword('!~*')
      return expression`${this} ${operator} ${pattern}`
    }
  }
}
