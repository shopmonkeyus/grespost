import {
  BigintType,
  BooleanArg,
  CharacterArg,
  DoubleType,
  InferMathTypePrec,
  IntegerType,
  NumericType,
  IntegralArg,
  IntegerArg,
  ToMathExpression,
  MathArg,
  NumericArg,
  BigintArg,
  ArrayArg,
  Type
} from '../types'
import { Expression, expression } from '../expressions'
import { sql } from '../template'

/**
 * @description Absolute value
 */
export function ABS <T extends MathArg> (operand: T): ToMathExpression<T> {
  return expression`ABS(${sql.join([...arguments])})`
}

/**
 * @description Cube root
 */
export function CBRT (operand: MathArg): Expression<DoubleType> {
  return expression`CBRT(${sql.join([...arguments])})`
}

/**
 * @description Nearest integer greater than or equal to argument
 */
export function CEIL (operand: Expression<NumericType>): Expression<NumericType>
export function CEIL (operand: MathArg): Expression<DoubleType>
export function CEIL (operand: MathArg) {
  return expression`CEIL(${sql.join([...arguments])})`
}

/**
 * @description Converts radians to degrees
 */
export function DEGREES (operand: MathArg): Expression<DoubleType> {
  return expression`DEGREES(${sql.join([...arguments])})`
}

/**
 * @description Integer quotient of y/x (truncates towards zero)
 */
export function DIV (a: NumericArg, b: NumericArg): Expression<NumericType> {
  return expression`DIV(${sql.join([...arguments])})`
}

/**
 * @description Integer quotient of y/x (truncates towards zero)
 */
export function EXP (operand: Expression<NumericType>): Expression<NumericType>
export function EXP (operand: MathArg): Expression<DoubleType>
export function EXP (operand: MathArg) {
  return expression`EXP(${sql.join([...arguments])})`
}

/**
 * @description Factorial
 */
export function FACTORIAL (operand: BigintArg): Expression<NumericType> {
  return expression`FACTORIAL(${sql.join([...arguments])})`
}

/**
 * @description Nearest integer less than or equal to argument
 */
export function FLOOR (operand: Expression<NumericType>): Expression<NumericType>
export function FLOOR (operand: MathArg): Expression<DoubleType>
export function FLOOR (operand: MathArg) {
  return expression`FLOOR(${sql.join([...arguments])})`
}

/**
 * @description Greatest common divisor (the largest positive number that divs both inputs with no remainder);
 * returns 0 if both inputs are zero; available for integer, bigint, and numeric
 */
export function GCD <X extends MathArg, Y extends MathArg> (x: X, y: Y): InferMathTypePrec<ToMathExpression<X>['type'], ToMathExpression<Y>['type']>['expression'] {
  return expression`GCD(${sql.join([...arguments])})`
}

/**
 * @description Least common multiple (the smallest strictly
 * positive number that is an integral multiple of both inputs)
 * returns 0 if either input is zero; available for integer, bigint, and numeric
 */
export function LCM <X extends MathArg, Y extends MathArg> (x: X, y: Y): InferMathTypePrec<ToMathExpression<X>['type'], ToMathExpression<Y>['type']>['expression'] {
  return expression`LCM(${sql.join([...arguments])})`
}

/**
 * @description Natural logarithm
 */
export function LN (operand: Expression<NumericType>): Expression<NumericType>
export function LN (operand: MathArg): Expression<DoubleType>
export function LN (operand: MathArg) {
  return expression`LN(${sql.join([...arguments])})`
}

/**
 * @description Base 10 logarithm
 */
export function LOG10 (operand: Expression<NumericType>): Expression<NumericType>
export function LOG10 (operand: MathArg): Expression<DoubleType>
export function LOG10 (operand: MathArg) {
  return expression`LOG10(${sql.join([...arguments])})`
}

/**
 * @description Logarithm of x to base b
 */
export function LOG (b: NumericArg, x: NumericArg): Expression<NumericType> {
  return expression`LOG(${sql.join([...arguments])})`
}

/**
 * @description Minimum scale (number of fractional decimal digits) needed to represent the supplied value precisely
 */
export function MIN_SCALE (operand: NumericArg): Expression<IntegerType> {
  return expression`MIN_SCALE(${sql.join([...arguments])})`
}

/**
 * @description Remainder of y/x
 */
export function MOD <X extends MathArg, Y extends MathArg> (x: X, y: Y): InferMathTypePrec<ToMathExpression<X>['type'], ToMathExpression<Y>['type']>['expression'] {
  return expression`MOD(${sql.join([...arguments])})`
}

/**
 * @description Approximate value of π
 */
export function PI (): Expression<DoubleType> {
  return expression`PI()`
}

/**
 * @description a raised to the power of b
 */
export function POWER (x: Expression<NumericType>, y: Expression<NumericType>): Expression<NumericType>
export function POWER (x: MathArg, y: MathArg): Expression<DoubleType>
export function POWER (x: MathArg, y: MathArg) {
  return expression`POWER(${sql.join([...arguments])})`
}

/**
 * @description Converts degrees to radians
 */
export function RADIANS (a: MathArg): Expression<DoubleType> {
  return expression`RADIANS(${sql.join([...arguments])})`
}

export function ROUND (v: NumericArg, s: IntegerArg): Expression<NumericType>
export function ROUND (v: Expression<NumericType>): Expression<NumericType>
export function ROUND (v: MathArg): Expression<DoubleType>
export function ROUND (v: MathArg, s?: IntegerArg) {
  return expression`ROUND(${sql.join([...arguments])})`
}

export function SCALE (v: NumericArg): Expression<IntegerType> {
  return expression`SCALE(${sql.join([...arguments])})`
}

/**
 * @description Sign of the argument (-1, 0, or +1)
 */
export function SIGN (v: Expression<NumericType>): Expression<NumericType>
export function SIGN (v: MathArg): Expression<DoubleType>
export function SIGN (v: MathArg) {
  return expression`SIGN(${sql.join([...arguments])})`
}

/**
 * @description Square root
 */
export function SQRT (v: Expression<NumericType>): Expression<NumericType>
export function SQRT (v: MathArg): Expression<DoubleType>
export function SQRT (v: MathArg) {
  return expression`SQRT(${sql.join([...arguments])})`
}

/**
 * @description Reduces the value's scale (number of fractional decimal digits) by removing trailing zeroes
 */
export function TRIM_SCALE (v: NumericArg): Expression<NumericType> {
  return expression`TRIM_SCALE(${sql.join([...arguments])})`
}

/**
 * @description Reduces the value's scale (number of fractional decimal digits) by removing trailing zeroes
 */
export function TRUNC (v: Expression<NumericType>): Expression<NumericType>
export function TRUNC (v: NumericArg, s: IntegerArg): Expression<NumericType>
export function TRUNC (v: MathArg): Expression<DoubleType>
export function TRUNC (v: MathArg, s?: IntegerArg) {
  return expression`TRUNC(${sql.join([...arguments])})`
}

/**
 * @description Returns the number of the bucket in which operand falls in a histogram having
 * count equal-width buckets spanning the range low to high. Returns 0 or count+1 for an input outside that range.
 */
export function WIDTH_BUCKET (operand: MathArg, low: MathArg, high: MathArg, count: IntegerArg): Expression<IntegerType>
export function WIDTH_BUCKET (operand: any, low: ArrayArg<Type>): Expression<IntegerType>
export function WIDTH_BUCKET (operand: any, low: any, high?: MathArg, count?: IntegerArg): Expression<IntegerType> {
  return expression`WIDTH_BUCKET(${sql.join([...arguments])})`
}

/**
 * @description Returns a random value in the range 0.0 <= x < 1.0
 */
export function RANDOM (): Expression<DoubleType> {
  return expression`RANDOM()`
}

/**
 * @description Sets the seed for subsequent random() calls; argument must be between -1.0 and 1.0, inclusive
 */
export function SETSEED (seed: MathArg): Expression<DoubleType> {
  return expression`SETSEED(${sql.join([...arguments])})`
}

/**
 * @description Advances the sequence object to its next value and returns that value.
 * This is done atomically: even if multiple sessions execute nextval concurrently, each
 * will safely receive a distinct sequence value. If the sequence object has
 * been created with default parameters, successive nextval calls will return successive values
 * beginning with 1. Other behaviors can be obtained by using appropriate parameters
 * in the CREATE SEQUENCE command.
 */
export function NEXTVAL (regclass: CharacterArg): Expression<BigintType> {
  return expression`NEXTVAL(${sql.join([...arguments])})`
}

/**
 * @description Sets the sequence object's current value, and optionally its is_called flag. The
 * two-parameter form sets the sequence's last_value field to the specified value and
 * sets its is_called field to true, meaning that the next nextval will
 * advance the sequence before returning a value. The value that will be
 * reported by currval is also set to the specified value. In the
 * three-parameter form, is_called can be set to either true or false. true
 * has the same effect as the two-parameter form. If it is set
 * to false, the next nextval will return exactly the specified value, and
 * sequence advancement commences with the following nextval. Furthermore, the value reported by
 * currval is not changed in this case. For example,
 */
export function SETVAL (regclass: CharacterArg, val: IntegralArg, flag: BooleanArg): Expression<BigintType> {
  return expression`SETVAL(${sql.join([...arguments])})`
}

/**
 * @description Returns the value most recently obtained by nextval for this sequence in
 * the current session. (An error is reported if nextval has never been
 * called for this sequence in this session.) Because this is returning a
 * session-local value, it gives a predictable answer whether or not other sessions
 * have executed nextval since the current session did.
 */
export function CURRVAL (regclass: CharacterArg): Expression<BigintType> {
  return expression`CURRVAL(${sql.join([...arguments])})`
}

/**
 * @description Returns the value most recently returned by nextval in the current session.
 * This function is identical to currval, except that instead of taking the
 * sequence name as an argument it refers to whichever sequence nextval was
 * most recently applied to in the current session. It is an error
 * to call lastval if nextval has not yet been called in the
 * current session.
 */
export function LASTVAL (): Expression<BigintType> {
  return expression`LASTVAL()`
}

export function ACOS (operand: MathArg): Expression<DoubleType> {
  return expression`ACOS(${sql.join([...arguments])})`
}

export function ACOSD (operand: MathArg): Expression<DoubleType> {
  return expression`ACOS(${sql.join([...arguments])})`
}

export function ASIN (operand: MathArg): Expression<DoubleType> {
  return expression`ASIN(${sql.join([...arguments])})`
}

export function ASIND (operand: MathArg): Expression<DoubleType> {
  return expression`ASIND(${sql.join([...arguments])})`
}

export function ATAN (operand: MathArg): Expression<DoubleType> {
  return expression`ATAN(${sql.join([...arguments])})`
}

export function ATAND (operand: MathArg): Expression<DoubleType> {
  return expression`ATAND(${sql.join([...arguments])})`
}

export function ATAN2 (y: MathArg, x: MathArg): Expression<DoubleType> {
  return expression`ATAN2(${sql.join([...arguments])})`
}

export function ATAN2D (y: MathArg, x: MathArg): Expression<DoubleType> {
  return expression`ATAN2D(${sql.join([...arguments])})`
}

export function COS (y: MathArg): Expression<DoubleType> {
  return expression`COS(${sql.join([...arguments])})`
}

export function COSD (y: MathArg): Expression<DoubleType> {
  return expression`COSD(${sql.join([...arguments])})`
}

export function COT (y: MathArg): Expression<DoubleType> {
  return expression`COT(${sql.join([...arguments])})`
}

export function COTD (y: MathArg): Expression<DoubleType> {
  return expression`COTD(${sql.join([...arguments])})`
}

export function SIN (y: MathArg): Expression<DoubleType> {
  return expression`SIN(${sql.join([...arguments])})`
}

export function SIND (y: MathArg): Expression<DoubleType> {
  return expression`SIND(${sql.join([...arguments])})`
}

export function TAN (y: MathArg): Expression<DoubleType> {
  return expression`TAN(${sql.join([...arguments])})`
}

export function TAND (y: MathArg): Expression<DoubleType> {
  return expression`TAND(${sql.join([...arguments])})`
}

export function SINH (y: MathArg): Expression<DoubleType> {
  return expression`SINH(${sql.join([...arguments])})`
}

export function COSH (y: MathArg): Expression<DoubleType> {
  return expression`COSH(${sql.join([...arguments])})`
}

export function TANH (y: MathArg): Expression<DoubleType> {
  return expression`TANH(${sql.join([...arguments])})`
}

export function ASINH (y: MathArg): Expression<DoubleType> {
  return expression`ASINH(${sql.join([...arguments])})`
}

export function ACOSH (y: MathArg): Expression<DoubleType> {
  return expression`ACOSH(${sql.join([...arguments])})`
}

export function ATANH (y: MathArg): Expression<DoubleType> {
  return expression`ATANH(${sql.join([...arguments])})`
}

export function TO_NUMBER (date: CharacterArg, to: CharacterArg): Expression<NumericType> {
  return expression`TO_NUMBER(${sql.join([...arguments])})`
}
