import { toExpression } from '../../expressions'
import { sql, Template } from '../../template'

export type FieldsConfig = Record<string, any>

export const stringifyFields = (fields: FieldsConfig): Template => {
  return sql.join(Object.entries(fields).map(([alias, expr]) => toExpression(expr).as(alias).toSource()))
}
