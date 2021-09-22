import { stringifyOrderBy } from '..'
import { AnyExpression, condition, Condition, Expression, expression, ToType } from '../expressions'
import { sql } from '../template'
import {
  ArrayType,
  BooleanArg,
  BooleanType,
  ByteaArg,
  CharacterArg,
  IntervalArg,
  JSONType,
  JSONBType,
  BigintArg,
  BigintType,
  DoubleArg,
  DoubleType,
  IntegerArg,
  IntegerType,
  MathArg,
  MathExpression,
  MathLiteral,
  NumericArg,
  NumericType,
  RealArg,
  RealType,
  SmallintArg,
  SmallintType,
  BitArg,
  BitType,
  TextType,
  ByteaType,
  IntervalType
} from '../types'

export interface AggregateConfig {
  distinct?: boolean
  orderBy?: (AnyExpression | {
    by: AnyExpression
    direction?: 'ASC' | 'DESC'
    using?: string
    nulls?: 'FIRST' | 'LAST'
  })[]
  withinGroup?: (AnyExpression | {
    by: AnyExpression
    direction?: 'ASC' | 'DESC'
    nulls?: 'FIRST' | 'LAST'
  })[]
  filterWhere?: Condition
}

export const stringifyAggregateConfig = (args: any[], config?: AggregateConfig) => {
  if (!config) return sql`(${sql.join(args)})`

  const DISTINCT = config.distinct !== undefined ? config.distinct ? sql`DISTINCT ` : sql`ALL ` : sql``
  const ORDERING = config.orderBy ? sql` ORDER BY ${sql.join(config.orderBy.map(stringifyOrderBy))}` : sql``
  const WITHING_GROUP = config.withinGroup ? sql` WITHIN GROUP ( ORDER BY ${sql.join(config.withinGroup.map(stringifyOrderBy))} )` : sql``
  const FILTER_WHERE = config.filterWhere ? sql` FILTER ( WHERE ${condition(config.filterWhere)} )` : sql``

  return sql`(${DISTINCT}${sql.join(args)}${ORDERING})${WITHING_GROUP}${FILTER_WHERE}`
}

/**
 * @description Collects all the input values, including nulls, into an array.
 *
 * @signature array_agg ( any ) → anyarray
 */
export function ARRAY_AGG <T> (el: T, aggregateConfig?: AggregateConfig): Expression<ArrayType<ToType<T>>> {
  return expression`ARRAY_AGG${stringifyAggregateConfig([el], aggregateConfig)}`
}

/**
 * @description Computes the average (arithmetic mean) of all the non-null input values.
 *
 * @signature avg ( smallint ) → numeric
 */
export function AVG (arg: NumericArg, aggregateConfig?: AggregateConfig): Expression<NumericType>
export function AVG (arg: DoubleArg, aggregateConfig?: AggregateConfig): Expression<DoubleType>
export function AVG (arg: IntervalArg, aggregateConfig?: AggregateConfig): Expression<IntervalType>
export function AVG (arg: MathArg | IntervalArg, aggregateConfig?: AggregateConfig): MathExpression | Expression<IntervalType> {
  return expression`AVG${stringifyAggregateConfig([arg], aggregateConfig)}`
}

/**
 * @description Computes the bitwise AND of all non-null input values.
 *
 * @signature bit_and ( smallint ) → smallint
 */
export function BIT_AND (arg: SmallintArg, aggregateConfig?: AggregateConfig): Expression<SmallintType>
export function BIT_AND (arg: IntegerArg, aggregateConfig?: AggregateConfig): Expression<IntegerType>
export function BIT_AND (arg: BigintArg, aggregateConfig?: AggregateConfig): Expression<BigintType>
export function BIT_AND (arg: BitArg, aggregateConfig?: AggregateConfig): Expression<BitType>
export function BIT_AND (arg: MathArg | BitArg, aggregateConfig?: AggregateConfig): MathExpression | Expression<BitType> {
  return expression`BIT_AND${stringifyAggregateConfig([arg], aggregateConfig)}`
}

/**
 * @description Computes the bitwise OR of all non-null input values.
 *
 * @signature bit_or ( smallint ) → smallint
 */
export function BIT_OR (arg: SmallintArg, aggregateConfig?: AggregateConfig): Expression<SmallintType>
export function BIT_OR (arg: IntegerArg, aggregateConfig?: AggregateConfig): Expression<IntegerType>
export function BIT_OR (arg: BigintArg, aggregateConfig?: AggregateConfig): Expression<BigintType>
export function BIT_OR (arg: BitArg, aggregateConfig?: AggregateConfig): Expression<BitType>
export function BIT_OR (arg: MathArg | BitArg, aggregateConfig?: AggregateConfig): MathExpression | Expression<BitType> {
  return expression`BIT_OR${stringifyAggregateConfig([arg], aggregateConfig)}`
}

/**
 * @description Returns true if all non-null input values are true, otherwise false.
 *
 * @signature bool_and ( boolean ) → boolean
 */
export function BOOL_AND (arg: BooleanArg, aggregateConfig?: AggregateConfig): Expression<BooleanType> {
  return expression`BOOL_AND${stringifyAggregateConfig([arg], aggregateConfig)}`
}

/**
 * @description Returns true if any non-null input value is true, otherwise false.
 *
 * @signature bool_or ( boolean ) → boolean
 */
export function BOOL_OR (arg: BooleanArg, aggregateConfig?: AggregateConfig): Expression<BooleanType> {
  return expression`BOOL_OR${stringifyAggregateConfig([arg], aggregateConfig)}`
}

/**
 * @description Computes the number of input rows.
 *
 * @signature count ( * ) → bigint
 */
export function COUNT (arg: AnyExpression | '*', aggregateConfig?: AggregateConfig): Expression<BigintType> {
  return expression`COUNT${stringifyAggregateConfig([arg === '*' ? sql.keyword('*') : arg], aggregateConfig)}`
}

/**
 * @description This is the SQL standard's equivalent to bool_and.
 *
 * @signature every ( boolean ) → boolean
 */
export function EVERY (arg: BooleanArg, aggregateConfig?: AggregateConfig): Expression<BooleanType> {
  return expression`EVERY${stringifyAggregateConfig([arg], aggregateConfig)}`
}

/**
 * @description Collects all the input values, including nulls, into a JSON array. Values
 * are converted to JSON as per to_json or to_jsonb.
 *
 * @signature json_agg ( anyelement ) → json
 */
export function JSON_AGG (arg: any, aggregateConfig?: AggregateConfig): Expression<JSONType> {
  return expression`JSON_AGG${stringifyAggregateConfig([arg], aggregateConfig)}`
}

/**
 * @description Collects all the input values, including nulls, into a JSON array. Values
 * are converted to JSON as per to_json or to_jsonb.
 *
 * @signature jsonb_agg ( anyelement ) → jsonb
 */
export function JSONB_AGG (arg: any, aggregateConfig?: AggregateConfig): Expression<JSONBType> {
  return expression`JSONB_AGG${stringifyAggregateConfig([arg], aggregateConfig)}`
}

/**
 * @description Collects all the key/value pairs into a JSON object. Key arguments are
 * coerced to text; value arguments are converted as per to_json or to_jsonb.
 * Values can be null, but not keys.
 *
 * @signature json_object_agg ( key "any", value "any" ) → json
 */
export function JSON_OBJECT_AGG (key: any, value: any, aggregateConfig?: AggregateConfig): Expression<JSONType> {
  return expression`JSON_OBJECT_AGG${stringifyAggregateConfig([key, value], aggregateConfig)}`
}

/**
 * @description Collects all the key/value pairs into a JSON object. Key arguments are
 * coerced to text; value arguments are converted as per to_json or to_jsonb.
 * Values can be null, but not keys.
 *
 * @signature jsonb_object_agg ( key "any", value "any" ) → jsonb
 */
export function JSONB_OBJECT_AGG (key: any, value: any, aggregateConfig?: AggregateConfig): Expression<JSONBType> {
  return expression`JSONB_OBJECT_AGG${stringifyAggregateConfig([key, value], aggregateConfig)}`
}

/**
 * @description Computes the maximum of the non-null input values. Available for any numeric,
 * string, date/time, or enum type, as well as inet, interval, money, oid,
 * pg_lsn, tid, and arrays of any of these types.
 *
 * @signature max ( see text ) → same as input type
 */
export function MAX <T extends any> (arg: T, aggregateConfig?: AggregateConfig): Expression<ToType<T>> {
  return expression`MAX${stringifyAggregateConfig([arg], aggregateConfig)}`
}

/**
 * @description Computes the minimum of the non-null input values. Available for any numeric,
 * string, date/time, or enum type, as well as inet, interval, money, oid,
 * pg_lsn, tid, and arrays of any of these types.
 *
 * @signature min ( see text ) → same as input type
 */
export function MIN <T extends any> (arg: T, aggregateConfig?: AggregateConfig): Expression<ToType<T>> {
  return expression`MIN${stringifyAggregateConfig([arg], aggregateConfig)}`
}

/**
 * @description Concatenates the non-null input values into a string. Each value after the
 * first is preceded by the corresponding delimiter (if it's not null).
 *
 * @signature string_agg ( value text, delimiter text ) → text
 */
export function STRING_AGG (value: CharacterArg, delimiter: CharacterArg, aggregateConfig?: AggregateConfig): Expression<TextType>
export function STRING_AGG (value: ByteaArg, delimiter: ByteaArg, aggregateConfig?: AggregateConfig): Expression<ByteaType>
export function STRING_AGG (value: CharacterArg | ByteaArg, delimiter: CharacterArg | ByteaArg, aggregateConfig?: AggregateConfig): Expression<TextType> | Expression<ByteaType> {
  return expression`STRING_AGG${stringifyAggregateConfig([value, delimiter], aggregateConfig)}`
}

/**
 * @description Computes the sum of the non-null input values.
 * @signature sum ( smallint ) → bigint
 */
export function SUM (arg: MathLiteral, aggregateConfig?: AggregateConfig): Expression<NumericType>
export function SUM (arg: IntegerArg, aggregateConfig?: AggregateConfig): Expression<BigintType>
export function SUM (arg: NumericArg, aggregateConfig?: AggregateConfig): Expression<NumericType>
export function SUM (arg: RealArg, aggregateConfig?: AggregateConfig): Expression<RealType>
export function SUM (arg: DoubleArg, aggregateConfig?: AggregateConfig): Expression<DoubleType>
export function SUM (arg: IntervalArg, aggregateConfig?: AggregateConfig): Expression<IntervalType>
export function SUM (arg: MathArg | IntervalArg, aggregateConfig?: AggregateConfig): MathExpression | Expression<IntervalType> {
  return expression`SUM${stringifyAggregateConfig([arg], aggregateConfig)}`
}
