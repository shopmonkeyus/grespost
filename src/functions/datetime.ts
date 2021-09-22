import { BooleanType, DateType, DoubleType, CharacterArg, TimeType, TimestampType, TimestampArg, DoubleArg, IntegerArg, DateArg, IntervalArg, TimeArg, TextType, IntervalType } from '../types'
import { Expression, expression } from '../expressions'
import { sql, sv } from '../template'
import { keyword } from '../template/keyword'

export function AGE (a: TimestampArg, b?: TimestampArg): Expression<IntervalType> {
  return expression`AGE(${sv([...arguments])})`
}

export function CLOCK_TIMESTAMP ():Expression<TimestampType> {
  return expression`CLOCK_TIMESTAMP()`
}

export function CURRENT_DATE (): Expression<DateType> {
  return expression`CURRENT_DATE()`
}

export function CURRENT_TIME (precision?: IntegerArg): Expression<TimeType> {
  return expression`CURRENT_TIME${sv([...arguments], ',', '()')}`
}

export function CURRENT_TIMESTAMP (precision?: IntegerArg):Expression<TimestampType> {
  return expression`CURRENT_TIMESTAMP${sv([...arguments], ',', '()')}`
}

export function DATE_PART (a: CharacterArg, b: TimestampArg | IntervalArg): Expression<DoubleType> {
  return expression`DATE_PART(${sv([...arguments])})`
}

export function DATE_TRUNC (a: CharacterArg, b: TimestampArg): Expression<TimestampType>
export function DATE_TRUNC (a: CharacterArg, b: TimestampArg, c: CharacterArg): Expression<TimestampType>
export function DATE_TRUNC (a: CharacterArg, b: IntervalArg): Expression<IntervalType>
export function DATE_TRUNC (a: CharacterArg, b: TimestampArg | Expression<IntervalType>, c?: CharacterArg):Expression<TimestampType>| Expression<IntervalType> {
  return expression`DATE_TRUNC(${sv([...arguments])})`
}

export function EXTRACT (field: CharacterArg, from: TimestampArg | IntervalArg): Expression<DoubleType> {
  return expression`EXTRACT(${sv([...arguments])})`
}

export function ISFINITE (date: DateArg | IntervalArg | TimestampArg): Expression<BooleanType> {
  return expression`ISFINITE(${sv([...arguments])})`
}

export function JUSTIFY_DAYS (interval: IntervalArg): Expression<IntervalType> {
  return expression`JUSTIFY_DAYS(${sv([...arguments])})`
}

export function JUSTIFY_HOURS (interval: IntervalArg): Expression<IntervalType> {
  return expression`JUSTIFY_HOURS(${sv([...arguments])})`
}

export function JUSTIFY_INTERVAL (interval: IntervalArg): Expression<IntervalType> {
  return expression`JUSTIFY_INTERVAL(${sv([...arguments])})`
}

export function LOCALTIME (precision?: IntegerArg): Expression<TimeType> {
  return expression`LOCALTIME${sv([...arguments], ',', '()')}`
}

export function LOCALTIMESTAMP (precision?: IntegerArg):Expression<TimestampType> {
  return expression`LOCALTIMESTAMP${sv([...arguments], ',', '()')}`
}

export function MAKE_DATE (year: IntegerArg, month: IntegerArg, day: IntegerArg): Expression<DateType> {
  return expression`MAKE_DATE(${sv([...arguments])})`
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
    expression`${keyword(key, ['YEARS', 'MONTHS', 'WEEKS', 'DAYS', 'HOURS', 'MINS', 'SECS'])} => ${value}`)
  return expression`MAKE_INTERVAL(${sv(ops)})`
}

export function MAKE_TIME (
  hour: IntegerArg,
  minute: IntegerArg,
  second: DoubleArg
): Expression<TimeType> {
  return expression`MAKE_TIME(${sv([...arguments])})`
}

export function MAKE_TIMESTAMP (
  year: IntegerArg,
  month: IntegerArg,
  day: IntegerArg,
  hour: IntegerArg,
  minute: IntegerArg,
  second: DoubleArg
):Expression<TimestampType> {
  return expression`MAKE_TIMESTAMP(${sv([...arguments])})`
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
  return expression`MAKE_TIMESTAMPTZ(${sv([...arguments])})`
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
  return expression`TO_TIMESTAMP(${sv([...arguments])})`
}

export function TO_DATE (date: CharacterArg, to: CharacterArg): Expression<DateType> {
  return expression`TO_DATE(${sv([...arguments])})`
}
