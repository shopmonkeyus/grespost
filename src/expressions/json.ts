import { Constructor, Expression, expression } from '../expressions'
import { ArrayType, BooleanType, IntegerType, TextType, JSONBType, JSONType, MathLiteral, CharacterArg } from '../types'

export function JSONOps <T extends Constructor> (Base: T) {
  return class JSONOps extends Base {
    get (item: Expression<IntegerType> | MathLiteral | CharacterArg): Expression<JSONType> | Expression<JSONBType> {
      return expression`${this} -> ${item}`
    }

    getText (item: Expression<IntegerType> | MathLiteral | CharacterArg): Expression<TextType> {
      return expression`${this} ->> ${item}`
    }

    getByPath (path: Expression<ArrayType<TextType>> | Array<CharacterArg>): Expression<JSONType> | Expression<JSONBType> {
      return expression`${this} #> ${path}`
    }

    getTextByPath (path: Expression<ArrayType<TextType>> | Array<CharacterArg>): Expression<TextType> {
      return expression`${this} #>> ${path}`
    }

    includes (text: CharacterArg): Expression<BooleanType> {
      return expression`${this} ? ${text}`
    }

    includesAny (text: Expression<ArrayType<TextType>> | Array<CharacterArg>): Expression<BooleanType> {
      return expression`${this} ?| ${text}`
    }

    includesAll (text: Expression<ArrayType<TextType>> | Array<CharacterArg>): Expression<BooleanType> {
      return expression`${this} ?& ${text}`
    }

    unset (item: CharacterArg | Expression<IntegerType> | MathLiteral): Expression<JSONBType> {
      return expression`${this} - ${item}`
    }

    unsetAll (item: Expression<ArrayType<TextType>> | Array<CharacterArg>): Expression<JSONBType> {
      return expression`${this} - ${item}`
    }

    unsetByPath (path: Expression<ArrayType<TextType>> | Array<CharacterArg>): Expression<JSONBType> {
      return expression`${this} #- ${path}`
    }

    jsonPathExist (path: CharacterArg): Expression<BooleanType> {
      return expression`${this} @? ${path}`
    }

    jsonPathCheck (path: CharacterArg): Expression<BooleanType> {
      return expression`${this} @@ ${path}`
    }
  }
}
