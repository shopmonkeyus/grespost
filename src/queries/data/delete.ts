import { MapToExpression } from '../'
import { AnyExpression, condition, Condition } from '../../expressions'
import { QueryDefinition, Source } from '../../source'
import { sql, Template } from '../../template'
import { FieldsConfig, stringifyFields } from '../common/fields'
import { FromConfig, stringifyFrom, stringifyTable } from '../common/from'
import { stringifyWith, WithConfig } from '../common/with'

type InferDeleteReturning<T extends DeleteConfig> =
  undefined extends T['returning']
    ? {} : T['returning'] extends '*'
      ? T['from'] extends Source<infer R>
        ? R : Exclude<T['from'], Source>['table'] extends Source<infer L>
        ? L : never
  : MapToExpression<T['returning']>

/**
 * @description delete rows of a table
 * @docs https://www.postgresql.org/docs/current/sql-delete.html
 * @synopsis
 * [ WITH [ RECURSIVE ] with_query [, ...] ]
 *
 * DELETE FROM [ ONLY ] table_name [ * ] [ AS alias ]
 *
 * [ USING from_item [, ...] ]
 *
 * [ WHERE condition | WHERE CURRENT OF cursor_name ]
 *
 * [ RETURNING * | output_expression [ [ AS ] output_name ] [, ...] ]
 *
 * @example
 * // Delete all films but musicals:
 * // DELETE FROM films WHERE kind <> 'Musical';
 * DELETE({ from: FilmsTable, where: FilmsTable.kind.gl('Musical') })
 *
 * // Clear the table films
 * // DELETE FROM films;
 * DELETE({ from: FilmsTable })
 */
export function DELETE <T extends DeleteConfig> (config: T) {
  type Ret = InferDeleteReturning<T>
  const ret = config.returning ? Object.keys(config.returning) : []
  return new QueryDefinition<{ [K in keyof Ret]: Ret[K] extends AnyExpression ? Ret[K] : never }>(stringifyDelete(config), ret)
}

export interface DeleteConfig {
  with?: WithConfig
  from: Source | { only?: boolean, table: Source }
  using?: FromConfig
  where?: Condition
  whereCurrentOf?: string
  returning?: FieldsConfig | '*'
}

// [ <with> ]
// DELETE { FROM [ ONLY ] table [ * ] [ AS alias ] }
//     [ USING { <source> [, ...] } ]
//     [ WHERE condition | WHERE CURRENT OF cursorName ]
//     [ RETURNING { expression [ AS alias ] [, ...] } ]
export const stringifyDelete = (config: DeleteConfig): Template => {
  const WITH = config.with ? sql`WITH ${stringifyWith(config.with)} ` : sql``
  const FROM = sql`FROM ${stringifyTable(config.from)}`
  const USING = config.using ? sql` USING ${stringifyFrom(config.using)}` : sql``
  const WHERE = config.where ? sql` WHERE ${condition(config.where)}` : sql``
  const CURSOR = config.whereCurrentOf ? sql` WHERE CURRENT OF ${sql.ident(config.whereCurrentOf)}` : sql``
  const RETURNING = config.returning ? config.returning === '*' ? sql` RETURNING *` : sql` RETURNING ${stringifyFields(config.returning)}` : sql``

  return sql`${WITH}DELETE ${FROM}${USING}${WHERE}${CURSOR}${RETURNING}`
}
