import { ARRAY, TIMESTAMPTZ } from '../../types'
import { ARR } from '../array'
import { NOW } from '../datetime'
import { ABS, ACOS, ACOSD, ACOSH, ASIN, ASIND, ASINH, ATAN, ATAN2, ATAN2D, ATAND, ATANH, CBRT, CEIL, COS, COSD, COSH, COT, COTD, CURRVAL, DEGREES, DIV, EXP, FACTORIAL, FLOOR, GCD, LASTVAL, LCM, LN, LOG, LOG10, MIN_SCALE, MOD, NEXTVAL, PI, POWER, RADIANS, RANDOM, ROUND, SCALE, SETSEED, SETVAL, SIGN, SIN, SIND, SINH, SQRT, TAN, TAND, TANH, TO_NUMBER, TRIM_SCALE, TRUNC, WIDTH_BUCKET } from '../math'

describe('math functons', () => {
  it('abs ( numeric_type ) → numeric_type', () => {
    expect(ABS(-17.4).toQuery()).toEqual(
      [
        'ABS($1)',
        [
          -17.4
        ]
      ]
    )
  })

  it('cbrt ( double precision ) → double precision', () => {
    expect(CBRT(64.0).toQuery()).toEqual(
      [
        'CBRT($1)',
        [
          64
        ]
      ]
    )
  })

  it('ceil ( numeric ) → numeric', () => {
    expect(CEIL(42.2).toQuery()).toEqual(
      [
        'CEIL($1)',
        [
          42.2
        ]
      ]
    )
    expect(CEIL(-42.8).toQuery()).toEqual(
      [
        'CEIL($1)',
        [
          -42.8
        ]
      ]
    )
  })

  it('ceil ( double precision ) → double precision', () => {
    expect(CEIL(42.2).toQuery()).toEqual(
      [
        'CEIL($1)',
        [
          42.2
        ]
      ]
    )
    expect(CEIL(-42.8).toQuery()).toEqual(
      [
        'CEIL($1)',
        [
          -42.8
        ]
      ]
    )
  })

  it('degrees ( double precision ) → double precision', () => {
    expect(DEGREES(0.5).toQuery()).toEqual(
      [
        'DEGREES($1)',
        [
          0.5
        ]
      ]
    )
  })

  it('div ( y numeric, x numeric ) → numeric', () => {
    expect(DIV(9, 4).toQuery()).toEqual(
      [
        'DIV($1, $2)',
        [
          9,
          4
        ]
      ]
    )
  })

  it('exp ( numeric ) → numeric', () => {
    expect(EXP(1.0).toQuery()).toEqual(
      [
        'EXP($1)',
        [
          1
        ]
      ]
    )
  })

  it('exp ( double precision ) → double precision', () => {
    expect(EXP(1.0).toQuery()).toEqual(
      [
        'EXP($1)',
        [
          1
        ]
      ]
    )
  })

  it('factorial ( bigint ) → numeric', () => {
    expect(FACTORIAL(5).toQuery()).toEqual(
      [
        'FACTORIAL($1)',
        [
          5
        ]
      ]
    )
  })

  it('floor ( numeric ) → numeric', () => {
    expect(FLOOR(42.8).toQuery()).toEqual(
      [
        'FLOOR($1)',
        [
          42.8
        ]
      ]
    )
    expect(FLOOR(-42.8).toQuery()).toEqual(
      [
        'FLOOR($1)',
        [
          -42.8
        ]
      ]
    )
  })

  it('floor ( double precision ) → double precision', () => {
    expect(FLOOR(42.8).toQuery()).toEqual(
      [
        'FLOOR($1)',
        [
          42.8
        ]
      ]
    )
    expect(FLOOR(-42.8).toQuery()).toEqual(
      [
        'FLOOR($1)',
        [
          -42.8
        ]
      ]
    )
  })

  it('gcd ( numeric_type, numeric_type ) → numeric_type', () => {
    expect(GCD(1071, 462).toQuery()).toEqual(
      [
        'GCD($1, $2)',
        [
          1071,
          462
        ]
      ]
    )
  })

  it('lcm ( numeric_type, numeric_type ) → numeric_type', () => {
    expect(LCM(1071, 462).toQuery()).toEqual(
      [
        'LCM($1, $2)',
        [
          1071,
          462
        ]
      ]
    )
  })

  it('ln ( numeric ) → numeric', () => {
    expect(LN(2.0).toQuery()).toEqual(
      [
        'LN($1)',
        [
          2
        ]
      ]
    )
  })

  it('ln ( double precision ) → double precision', () => {
    expect(LN(2.0).toQuery()).toEqual(
      [
        'LN($1)',
        [
          2
        ]
      ]
    )
  })

  it('log10 ( numeric ) → numeric', () => {
    expect(LOG10(1000).toQuery()).toEqual(
      [
        'LOG10($1)',
        [
          1000
        ]
      ]
    )
  })

  it('log10 ( double precision ) → double precision', () => {
    expect(LOG10(1000).toQuery()).toEqual(
      [
        'LOG10($1)',
        [
          1000
        ]
      ]
    )
  })

  it('log ( b numeric, x numeric ) → numeric', () => {
    expect(LOG(2.0, 64.0).toQuery()).toEqual(
      [
        'LOG($1, $2)',
        [
          2,
          64
        ]
      ]
    )
  })

  it('min_scale ( numeric ) → integer', () => {
    expect(MIN_SCALE(8.4100).toQuery()).toEqual(
      [
        'MIN_SCALE($1)',
        [
          8.41
        ]
      ]
    )
  })

  it('mod ( y numeric_type, x numeric_type ) → numeric_type', () => {
    expect(MOD(9, 4).toQuery()).toEqual(
      [
        'MOD($1, $2)',
        [
          9,
          4
        ]
      ]
    )
  })

  it('pi ( ) → double precision', () => {
    expect(PI().toQuery()).toEqual(
      [
        'PI()',
        []
      ]
    )
  })

  it('power ( a numeric, b numeric ) → numeric', () => {
    expect(POWER(9, 3).toQuery()).toEqual(
      [
        'POWER($1, $2)',
        [
          9,
          3
        ]
      ]
    )
  })

  it('power ( a double precision, b double precision ) → double precision', () => {
    expect(POWER(9, 3).toQuery()).toEqual(
      [
        'POWER($1, $2)',
        [
          9,
          3
        ]
      ]
    )
  })

  it('radians ( double precision ) → double precision', () => {
    expect(RADIANS(45.0).toQuery()).toEqual(
      [
        'RADIANS($1)',
        [
          45
        ]
      ]
    )
  })

  it('round ( numeric ) → numeric', () => {
    expect(ROUND(42.4).toQuery()).toEqual(
      [
        'ROUND($1)',
        [
          42.4
        ]
      ]
    )
  })

  it('round ( double precision ) → double precision', () => {
    expect(ROUND(42.4).toQuery()).toEqual(
      [
        'ROUND($1)',
        [
          42.4
        ]
      ]
    )
  })

  it('round ( v numeric, s integer ) → numeric', () => {
    expect(ROUND(42.4382, 2).toQuery()).toEqual(
      [
        'ROUND($1, $2)',
        [
          42.4382,
          2
        ]
      ]
    )
  })

  it('scale ( numeric ) → integer', () => {
    expect(SCALE(8.4100).toQuery()).toEqual(
      [
        'SCALE($1)',
        [
          8.41
        ]
      ]
    )
  })

  it('sign ( numeric ) → numeric', () => {
    expect(SIGN(-8.4).toQuery()).toEqual(
      [
        'SIGN($1)',
        [
          -8.4
        ]
      ]
    )
  })

  it('sign ( double precision ) → double precision', () => {
    expect(SIGN(-8.4).toQuery()).toEqual(
      [
        'SIGN($1)',
        [
          -8.4
        ]
      ]
    )
  })

  it('sqrt ( numeric ) → numeric', () => {
    expect(SQRT(2).toQuery()).toEqual(
      [
        'SQRT($1)',
        [
          2
        ]
      ]
    )
  })

  it('sqrt ( double precision ) → double precision', () => {
    expect(SQRT(2).toQuery()).toEqual(
      [
        'SQRT($1)',
        [
          2
        ]
      ]
    )
  })

  it('trim_scale ( numeric ) → numeric', () => {
    expect(TRIM_SCALE(8.4100).toQuery()).toEqual(
      [
        'TRIM_SCALE($1)',
        [
          8.41
        ]
      ]
    )
  })

  it('trunc ( numeric ) → numeric', () => {
    expect(TRUNC(42.8).toQuery()).toEqual(
      [
        'TRUNC($1)',
        [
          42.8
        ]
      ]
    )
    expect(TRUNC(-42.8).toQuery()).toEqual(
      [
        'TRUNC($1)',
        [
          -42.8
        ]
      ]
    )
  })

  it('trunc ( double precision ) → double precision', () => {
    expect(TRUNC(42.8).toQuery()).toEqual(
      [
        'TRUNC($1)',
        [
          42.8
        ]
      ]
    )
    expect(TRUNC(-42.8).toQuery()).toEqual(
      [
        'TRUNC($1)',
        [
          -42.8
        ]
      ]
    )
  })

  it('trunc ( v numeric, s integer ) → numeric', () => {
    expect(TRUNC(42.4382, 2).toQuery()).toEqual(
      [
        'TRUNC($1, $2)',
        [
          42.4382,
          2
        ]
      ]
    )
  })

  it('width_bucket ( operand numeric, low numeric, high numeric, count integer ) → integer', () => {
    expect(WIDTH_BUCKET(5.35, 0.024, 10.06, 5).toQuery()).toEqual(
      [
        'WIDTH_BUCKET($1, $2, $3, $4)',
        [
          5.35,
          0.024,
          10.06,
          5
        ]
      ]
    )
  })

  it('width_bucket ( operand double precision, low double precision, high double precision, count integer ) → integer', () => {
    expect(WIDTH_BUCKET(5.35, 0.024, 10.06, 5).toQuery()).toEqual(
      [
        'WIDTH_BUCKET($1, $2, $3, $4)',
        [
          5.35,
          0.024,
          10.06,
          5
        ]
      ]
    )
  })

  it('width_bucket ( operand anyelement, thresholds anyarray ) → integer', () => {
    expect(WIDTH_BUCKET(NOW(), ARR('YESTERDAY', 'TODAY', 'TOMORROW').cast(ARRAY(TIMESTAMPTZ()))).toQuery()).toEqual([
      'WIDTH_BUCKET(NOW(), ARRAY[$1, $2, $3]::TIMESTAMPTZ[])', [
        'YESTERDAY',
        'TODAY',
        'TOMORROW'
      ]
    ])
  })

  it('random ( ) → double precision', () => {
    expect(RANDOM().toQuery()).toEqual(
      [
        'RANDOM()',
        []
      ]
    )
  })

  it('setseed ( double precision ) → void', () => {
    expect(SETSEED(0.12345).toQuery()).toEqual(
      [
        'SETSEED($1)',
        [
          0.12345
        ]
      ]
    )
  })

  it('acos ( double precision ) → double precision', () => {
    expect(ACOS(1).toQuery()).toEqual(
      [
        'ACOS($1)',
        [
          1
        ]
      ]
    )
  })

  it('acosd ( double precision ) → double precision', () => {
    expect(ACOSD(0.5).toQuery()).toEqual(
      [
        'ACOS($1)',
        [
          0.5
        ]
      ]
    )
  })

  it('asin ( double precision ) → double precision', () => {
    expect(ASIN(1).toQuery()).toEqual(
      [
        'ASIN($1)',
        [
          1
        ]
      ]
    )
  })

  it('asind ( double precision ) → double precision', () => {
    expect(ASIND(0.5).toQuery()).toEqual(
      [
        'ASIND($1)',
        [
          0.5
        ]
      ]
    )
  })

  it('atan ( double precision ) → double precision', () => {
    expect(ATAN(1).toQuery()).toEqual(
      [
        'ATAN($1)',
        [
          1
        ]
      ]
    )
  })

  it('atand ( double precision ) → double precision', () => {
    expect(ATAND(1).toQuery()).toEqual(
      [
        'ATAND($1)',
        [
          1
        ]
      ]
    )
  })

  it('atan2 ( y double precision, x double precision ) → double precision', () => {
    expect(ATAN2(1, 0).toQuery()).toEqual(
      [
        'ATAN2($1, $2)',
        [
          1,
          0
        ]
      ]
    )
  })

  it('atan2d ( y double precision, x double precision ) → double precision', () => {
    expect(ATAN2D(1, 0).toQuery()).toEqual(
      [
        'ATAN2D($1, $2)',
        [
          1,
          0
        ]
      ]
    )
  })

  it('cos ( double precision ) → double precision', () => {
    expect(COS(0).toQuery()).toEqual(
      [
        'COS($1)',
        [
          0
        ]
      ]
    )
  })

  it('cosd ( double precision ) → double precision', () => {
    expect(COSD(60).toQuery()).toEqual(
      [
        'COSD($1)',
        [
          60
        ]
      ]
    )
  })

  it('cot ( double precision ) → double precision', () => {
    expect(COT(0.5).toQuery()).toEqual(
      [
        'COT($1)',
        [
          0.5
        ]
      ]
    )
  })

  it('cotd ( double precision ) → double precision', () => {
    expect(COTD(45).toQuery()).toEqual(
      [
        'COTD($1)',
        [
          45
        ]
      ]
    )
  })

  it('sin ( double precision ) → double precision', () => {
    expect(SIN(1).toQuery()).toEqual(
      [
        'SIN($1)',
        [
          1
        ]
      ]
    )
  })

  it('sind ( double precision ) → double precision', () => {
    expect(SIND(30).toQuery()).toEqual(
      [
        'SIND($1)',
        [
          30
        ]
      ]
    )
  })

  it('tan ( double precision ) → double precision', () => {
    expect(TAN(1).toQuery()).toEqual(
      [
        'TAN($1)',
        [
          1
        ]
      ]
    )
  })

  it('tand ( double precision ) → double precision', () => {
    expect(TAND(45).toQuery()).toEqual(
      [
        'TAND($1)',
        [
          45
        ]
      ]
    )
  })

  it('sinh ( double precision ) → double precision', () => {
    expect(SINH(1).toQuery()).toEqual(
      [
        'SINH($1)',
        [
          1
        ]
      ]
    )
  })

  it('cosh ( double precision ) → double precision', () => {
    expect(COSH(0).toQuery()).toEqual(
      [
        'COSH($1)',
        [
          0
        ]
      ]
    )
  })

  it('tanh ( double precision ) → double precision', () => {
    expect(TANH(1).toQuery()).toEqual(
      [
        'TANH($1)',
        [
          1
        ]
      ]
    )
  })

  it('asinh ( double precision ) → double precision', () => {
    expect(ASINH(1).toQuery()).toEqual(
      [
        'ASINH($1)',
        [
          1
        ]
      ]
    )
  })

  it('acosh ( double precision ) → double precision', () => {
    expect(ACOSH(1).toQuery()).toEqual(
      [
        'ACOSH($1)',
        [
          1
        ]
      ]
    )
  })

  it('atanh ( double precision ) → double precision', () => {
    expect(ATANH(0.5).toQuery()).toEqual(
      [
        'ATANH($1)',
        [
          0.5
        ]
      ]
    )
  })

  it('to_number ( text, text ) → double precision', () => {
    expect(TO_NUMBER('45', 'day').toQuery()).toEqual(
      [
        'TO_NUMBER($1, $2)',
        [
          '45',
          'day'
        ]
      ]
    )
  })

  it('NEXTVAL', () => {
    expect(NEXTVAL('regclass').toQuery()).toEqual(
      ['NEXTVAL($1)', ['regclass']]
    )
  })

  it('SETVAL', () => {
    expect(SETVAL('regclass', 157, true).toQuery()).toEqual(
      ['SETVAL($1, $2, $3)', ['regclass', 157, true]]
    )
  })

  it('CURRVAL', () => {
    expect(CURRVAL('regclass').toQuery()).toEqual(
      ['CURRVAL($1)', ['regclass']]
    )
  })

  it('LASTVAL', () => {
    expect(LASTVAL().toQuery()).toEqual(
      ['LASTVAL()', []]
    )
  })
})
