import { toExpression } from '../../expressions'
import { sv, Template } from '../../template'

export type FieldsConfig = Record<string, any>

export const stringifyFields = (fields: FieldsConfig): Template => {
  return sv(Object.entries(fields).map(([alias, expr]) => toExpression(expr).as(alias).toSource()))
}
