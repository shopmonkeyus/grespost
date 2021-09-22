import { literal } from '../../expressions'
import { TIMESTAMP, INTERVAL, TIMESTAMPTZ, DATE } from '../../types'
import { AGE, CURRENT_DATE, CLOCK_TIMESTAMP, CURRENT_TIME, CURRENT_TIMESTAMP, DATE_PART, DATE_TRUNC, EXTRACT, ISFINITE, JUSTIFY_DAYS, JUSTIFY_HOURS, JUSTIFY_INTERVAL, LOCALTIME, LOCALTIMESTAMP, MAKE_DATE, MAKE_INTERVAL, MAKE_TIME, MAKE_TIMESTAMP, MAKE_TIMESTAMPTZ, NOW, STATEMENT_TIMESTAMP, TIMEOFDAY, TRANSACTION_TIMESTAMP, TO_TIMESTAMP, OVERLAPS, TO_DATE } from '../datetime'

describe('datetime functions', () => {
  it('age ( timestamp, timestamp ) → interval', () => {
    expect(AGE(literal('2001-04-10').cast(TIMESTAMP()), literal('1957-06-13').cast(TIMESTAMP())).toQuery())
      .toEqual(['AGE($1::TIMESTAMP, $2::TIMESTAMP)', ['2001-04-10', '1957-06-13']])
  })

  it('age ( timestamp ) → interval', () => {
    expect(AGE(literal('1957-06-13').cast(TIMESTAMP())).toQuery())
      .toEqual(['AGE($1::TIMESTAMP)', ['1957-06-13']])
  })

  it('clock_timestamp ( ) → timestamp with time zone', () => {
    expect(CLOCK_TIMESTAMP().toQuery())
      .toEqual(['CLOCK_TIMESTAMP()', []])
  })

  it('current_date → date', () => {
    expect(CURRENT_DATE().toQuery())
      .toEqual(['CURRENT_DATE()', []])
  })

  it('current_time → time with time zone', () => {
    expect(CURRENT_TIME().toQuery())
      .toEqual(['CURRENT_TIME', []])
  })

  it('current_time ( integer ) → time with time zone', () => {
    expect(CURRENT_TIME(2).toQuery())
      .toEqual(['CURRENT_TIME($1)', [2]])
  })

  it('current_timestamp → timestamp with time zone', () => {
    expect(CURRENT_TIMESTAMP().toQuery())
      .toEqual(['CURRENT_TIMESTAMP', []])
  })

  it('current_timestamp ( integer ) → timestamp with time zone', () => {
    expect(CURRENT_TIMESTAMP(0).toQuery())
      .toEqual(['CURRENT_TIMESTAMP($1)', [0]])
  })

  it('date_part ( text, timestamp ) → double precision', () => {
    expect(DATE_PART('HOUR', literal('2001-02-16 20:38:40').cast(TIMESTAMP())).toQuery())
      .toEqual(['DATE_PART($1, $2::TIMESTAMP)', ['HOUR', '2001-02-16 20:38:40']])
  })

  it('date_part ( text, interval ) → double precision', () => {
    expect(DATE_PART('MONTH', literal('2 YEARS 3 MONTHS').cast(INTERVAL())).toQuery())
      .toEqual(['DATE_PART($1, $2::INTERVAL)', ['MONTH', '2 YEARS 3 MONTHS']])
  })

  it('date_trunc ( text, timestamp ) → timestamp', () => {
    expect(DATE_TRUNC('HOUR', literal('2001-02-16 20:38:40').cast(TIMESTAMP())).toQuery())
      .toEqual(['DATE_TRUNC($1, $2::TIMESTAMP)', ['HOUR', '2001-02-16 20:38:40']])
  })

  it('date_trunc ( text, timestamp with time zone, text ) → timestamp with time zone', () => {
    expect(DATE_TRUNC('DAY', literal('2001-02-16 20:38:40+00').cast(TIMESTAMPTZ()), 'AUSTRALIA/SYDNEY').toQuery())
      .toEqual(['DATE_TRUNC($1, $2::TIMESTAMPTZ, $3)', ['DAY', '2001-02-16 20:38:40+00', 'AUSTRALIA/SYDNEY']])
  })

  it('date_trunc ( text, interval ) → interval', () => {
    expect(DATE_TRUNC('HOUR', literal('2 DAYS 3 HOURS 40 MINUTES').cast(INTERVAL())).toQuery())
      .toEqual(['DATE_TRUNC($1, $2::INTERVAL)', ['HOUR', '2 DAYS 3 HOURS 40 MINUTES']])
  })

  it('extract ( field from timestamp ) → double precision', () => {
    expect(EXTRACT('HOUR', literal('2001-02-16 20:38:40').cast(TIMESTAMP())).toQuery())
      .toEqual(['EXTRACT($1, $2::TIMESTAMP)', ['HOUR', '2001-02-16 20:38:40']])
  })

  it('extract ( field from interval ) → double precision', () => {
    expect(EXTRACT('MONTH', literal('2 YEARS 3 MONTHS').cast(INTERVAL())).toQuery())
      .toEqual(['EXTRACT($1, $2::INTERVAL)', ['MONTH', '2 YEARS 3 MONTHS']])
  })

  it('isfinite ( date ) → boolean', () => {
    expect(ISFINITE(literal('2001-02-16').cast(DATE())).toQuery())
      .toEqual(['ISFINITE($1::DATE)', ['2001-02-16']])
  })

  it('isfinite ( timestamp ) → boolean', () => {
    expect(ISFINITE(literal(Infinity).cast(TIMESTAMP())).toQuery())
      .toEqual(['ISFINITE($1::TIMESTAMP)', [Infinity]])
  })

  it('isfinite ( interval ) → boolean', () => {
    expect(ISFINITE(literal('4 HOURS').cast(INTERVAL())).toQuery())
      .toEqual(['ISFINITE($1::INTERVAL)', ['4 HOURS']])
  })

  it('justify_days ( interval ) → interval', () => {
    expect(JUSTIFY_DAYS(literal('35 DAYS').cast(INTERVAL())).toQuery())
      .toEqual(['JUSTIFY_DAYS($1::INTERVAL)', ['35 DAYS']])
  })

  it('justify_hours ( interval ) → interval', () => {
    expect(JUSTIFY_HOURS(literal('27 HOURS').cast(INTERVAL())).toQuery())
      .toEqual(['JUSTIFY_HOURS($1::INTERVAL)', ['27 HOURS']])
  })

  it('justify_interval ( interval ) → interval', () => {
    expect(JUSTIFY_INTERVAL(literal('1 MON -1 HOUR').cast(INTERVAL())).toQuery())
      .toEqual(['JUSTIFY_INTERVAL($1::INTERVAL)', ['1 MON -1 HOUR']])
  })

  it('localtime → time', () => {
    expect(LOCALTIME().toQuery())
      .toEqual(['LOCALTIME', []])
  })

  it('localtime ( integer ) → time', () => {
    expect(LOCALTIME(0).toQuery())
      .toEqual(['LOCALTIME($1)', [0]])
  })

  it('localtimestamp → timestamp', () => {
    expect(LOCALTIMESTAMP().toQuery())
      .toEqual(['LOCALTIMESTAMP', []])
  })

  it('localtimestamp ( integer ) → timestamp', () => {
    expect(LOCALTIMESTAMP(2).toQuery())
      .toEqual(['LOCALTIMESTAMP($1)', [2]])
  })

  it('make_date ( year int, month int, day int ) → date', () => {
    expect(MAKE_DATE(2013, 7, 15).toQuery())
      .toEqual(['MAKE_DATE($1, $2, $3)', [2013, 7, 15]])
  })

  it('make_interval ( [ years int [, months int [, weeks int [, days int [, hours int [, mins int [, secs double precision ]]]]]]] ) → interval', () => {
    expect(MAKE_INTERVAL({ days: 10 }).toQuery())
      .toEqual(['MAKE_INTERVAL(DAYS => $1)', [10]])
  })

  it('make_time ( hour int, min int, sec double precision ) → time', () => {
    expect(MAKE_TIME(8, 15, 23.5).toQuery())
      .toEqual(['MAKE_TIME($1, $2, $3)', [8, 15, 23.5]])
  })

  it('make_timestamp ( year int, month int, day int, hour int, min int, sec double precision ) → timestamp', () => {
    expect(MAKE_TIMESTAMP(2013, 7, 15, 8, 15, 23.5).toQuery())
      .toEqual(['MAKE_TIMESTAMP($1, $2, $3, $4, $5, $6)', [2013, 7, 15, 8, 15, 23.5]])
  })

  it('make_timestamptz ( year int, month int, day int, hour int, min int, sec double precision [, timezone text ] ) → timestamp with time zone', () => {
    expect(MAKE_TIMESTAMPTZ(2013, 7, 15, 8, 15, 23.5).toQuery())
      .toEqual(['MAKE_TIMESTAMPTZ($1, $2, $3, $4, $5, $6)', [2013, 7, 15, 8, 15, 23.5]])
  })

  it('now ( ) → timestamp with time zone', () => {
    expect(NOW().toQuery())
      .toEqual(['NOW()', []])
  })

  it('statement_timestamp ( ) → timestamp with time zone', () => {
    expect(STATEMENT_TIMESTAMP().toQuery())
      .toEqual(['STATEMENT_TIMESTAMP()', []])
  })

  it('timeofday ( ) → text', () => {
    expect(TIMEOFDAY().toQuery())
      .toEqual(['TIMEOFDAY()', []])
  })

  it('transaction_timestamp ( ) → timestamp with time zone', () => {
    expect(TRANSACTION_TIMESTAMP().toQuery())
      .toEqual(['TRANSACTION_TIMESTAMP()', []])
  })

  it('to_timestamp ( double precision ) → timestamp with time zone', () => {
    expect(TO_TIMESTAMP(1284352323).toQuery())
      .toEqual(['TO_TIMESTAMP($1)', [1284352323]])
  })

  it('overlaps', () => {
    const now = new Date()
    expect(OVERLAPS(now, now, now, now).toQuery()).toEqual(['($1, $2) OVERLAPS ($3, $4)', [now, now, now, now]])
  })

  it('to_date', () => {
    expect(TO_DATE('123', '321').toQuery()).toEqual(['TO_DATE($1, $2)', ['123', '321']])
  })
})
