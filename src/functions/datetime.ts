import { BooleanType, DateType, DoubleType, CharacterArg, TimeType, TimestampType, TimestampArg, DoubleArg, IntegerArg, DateArg, IntervalArg, TimeArg, TextType, IntervalType } from '../types'
import { Expression, expression } from '../expressions'
import { sql } from '../template'

export function AGE (a: TimestampArg, b?: TimestampArg): Expression<IntervalType> {
  return expression`AGE(${sql.join([...arguments])})`
}

export function CLOCK_TIMESTAMP ():Expression<TimestampType> {
  return expression`CLOCK_TIMESTAMP()`
}

export function CURRENT_DATE (): Expression<DateType> {
  return expression`CURRENT_DATE()`
}

export function CURRENT_TIME (precision?: IntegerArg): Expression<TimeType> {
  return expression`CURRENT_TIME${sql.join([...arguments], ',', '()')}`
}

export function CURRENT_TIMESTAMP (precision?: IntegerArg):Expression<TimestampType> {
  return expression`CURRENT_TIMESTAMP${sql.join([...arguments], ',', '()')}`
}

export function DATE_PART (a: CharacterArg, b: TimestampArg | IntervalArg): Expression<DoubleType> {
  return expression`DATE_PART(${sql.join([...arguments])})`
}

export function DATE_TRUNC (a: CharacterArg, b: TimestampArg): Expression<TimestampType>
export function DATE_TRUNC (a: CharacterArg, b: TimestampArg, c: CharacterArg): Expression<TimestampType>
export function DATE_TRUNC (a: CharacterArg, b: IntervalArg): Expression<IntervalType>
export function DATE_TRUNC (a: CharacterArg, b: TimestampArg | Expression<IntervalType>, c?: CharacterArg):Expression<TimestampType>| Expression<IntervalType> {
  return expression`DATE_TRUNC(${sql.join([...arguments])})`
}

export function EXTRACT (field: CharacterArg, from: TimestampArg | IntervalArg): Expression<DoubleType> {
  return expression`EXTRACT(${sql.join([...arguments])})`
}

export function ISFINITE (date: DateArg | IntervalArg | TimestampArg): Expression<BooleanType> {
  return expression`ISFINITE(${sql.join([...arguments])})`
}

export function JUSTIFY_DAYS (interval: IntervalArg): Expression<IntervalType> {
  return expression`JUSTIFY_DAYS(${sql.join([...arguments])})`
}

export function JUSTIFY_HOURS (interval: IntervalArg): Expression<IntervalType> {
  return expression`JUSTIFY_HOURS(${sql.join([...arguments])})`
}

export function JUSTIFY_INTERVAL (interval: IntervalArg): Expression<IntervalType> {
  return expression`JUSTIFY_INTERVAL(${sql.join([...arguments])})`
}

export function LOCALTIME (precision?: IntegerArg): Expression<TimeType> {
  return expression`LOCALTIME${sql.join([...arguments], ',', '()')}`
}

export function LOCALTIMESTAMP (precision?: IntegerArg):Expression<TimestampType> {
  return expression`LOCALTIMESTAMP${sql.join([...arguments], ',', '()')}`
}

export function MAKE_DATE (year: IntegerArg, month: IntegerArg, day: IntegerArg): Expression<DateType> {
  return expression`MAKE_DATE(${sql.join([...arguments])})`
}

interface IntervalMaker {
  years?: IntegerArg
  months?: IntegerArg
  weeks?: IntegerArg
  days?: IntegerArg
  hours?: IntegerArg
  mins?: IntegerArg
  secs?: DoubleArg
}

export function MAKE_INTERVAL (interval: IntervalMaker): Expression<IntervalType> {
  const ops = Object.entries(interval).map(([key, value]) =>
    expression`${sql.keyword(key, ['YEARS', 'MONTHS', 'WEEKS', 'DAYS', 'HOURS', 'MINS', 'SECS'])} => ${value}`)
  return expression`MAKE_INTERVAL(${sql.join(ops)})`
}

export function MAKE_TIME (
  hour: IntegerArg,
  minute: IntegerArg,
  second: DoubleArg
): Expression<TimeType> {
  return expression`MAKE_TIME(${sql.join([...arguments])})`
}

export function MAKE_TIMESTAMP (
  year: IntegerArg,
  month: IntegerArg,
  day: IntegerArg,
  hour: IntegerArg,
  minute: IntegerArg,
  second: DoubleArg
):Expression<TimestampType> {
  return expression`MAKE_TIMESTAMP(${sql.join([...arguments])})`
}

export function MAKE_TIMESTAMPTZ (
  year: IntegerArg,
  month: IntegerArg,
  day: IntegerArg,
  hour: IntegerArg,
  minute: IntegerArg,
  second: DoubleArg,
  timezone?: CharacterArg
):Expression<TimestampType> {
  return expression`MAKE_TIMESTAMPTZ(${sql.join([...arguments])})`
}

export function NOW ():Expression<TimestampType> {
  return expression`NOW()`
}

export function STATEMENT_TIMESTAMP ():Expression<TimestampType> {
  return expression`STATEMENT_TIMESTAMP()`
}

export function TIMEOFDAY (): Expression<TextType> {
  return expression`TIMEOFDAY()`
}

export function TRANSACTION_TIMESTAMP ():Expression<TimestampType> {
  return expression`TRANSACTION_TIMESTAMP()`
}

export function OVERLAPS <T extends DateArg | TimeArg | TimestampArg> (
  start1: T, end1: T | IntervalArg,
  start2: T, end2: T | IntervalArg
): Expression<BooleanType> {
  return expression`(${start1}, ${end1}) OVERLAPS (${start2}, ${end2})`
}

export function TO_TIMESTAMP (a: DoubleArg): Expression<TimestampType>
export function TO_TIMESTAMP (date: CharacterArg, to: CharacterArg): Expression<TimestampType>
export function TO_TIMESTAMP (date: CharacterArg | DoubleArg, to?: CharacterArg):Expression<TimestampType> {
  return expression`TO_TIMESTAMP(${sql.join([...arguments])})`
}

export function TO_DATE (date: CharacterArg, to: CharacterArg): Expression<DateType> {
  return expression`TO_DATE(${sql.join([...arguments])})`
}
