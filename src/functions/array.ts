import { Type, ArrayType, ArrayArg, CharacterArg, TextType, IntegerArg, IntegerType, TSVectorArg } from '../types'
import { Expression, expression, ToType } from '../expressions'
import { sv } from '../template'

export function ARR <T> (...args: T[]): Expression<ArrayType<ToType<T>>> {
  return expression`ARRAY[${sv(args)}]`
}

/**
 * @description Appends an element to the end of an array (same as the
 * anyarray || anyelement operator).
 *
 * @example array_append(ARRAY[1,2], 3) → {1,2,3}
 */
export function ARRAY_APPEND <T extends Type = Type> (array: ArrayArg<T>, element: T['argument']): Expression<ArrayType<T>> {
  return expression`ARRAY_APPEND(${sv([...arguments])})`
}

/**
 * @description Concatenates two arrays (same as the anyarray || anyarray operator).
 *
 * @example array_cat(ARRAY[1,2,3], ARRAY[4,5]) → {1,2,3,4,5}
 */
export function ARRAY_CAT <T extends Type = Type> (a: ArrayArg<T>, b: ArrayArg<T>): Expression<ArrayType<T>> {
  return expression`ARRAY_CAT(${sv([...arguments])})`
}

/**
 * @description Returns a text representation of the array's dimensions.
 *
 * @example array_dims(ARRAY[[1,2,3], [4,5,6]]) → [1:2][1:3]
 */
export function ARRAY_DIMS (arr: ArrayArg): Expression<TextType> {
  return expression`ARRAY_DIMS(${sv([...arguments])})`
}

/**
 * @description Returns an array filled with copies of the given value, having dimensions
 * of the lengths specified by the second argument. The optional third argument
 * supplies lower-bound values for each dimension (which default to all 1).
 *
 * @example array_fill(11, ARRAY[2,3]) → {{11,11,11},{11,11,11}}
 * array_fill(7, ARRAY[3], ARRAY[2]) → [2:4]={7,7,7}
 */
export function ARRAY_FILL <T extends Type> (value: T['argument'], dims: ArrayArg<IntegerType>, dims2?: ArrayArg<IntegerType>): Expression<ArrayType<T>> {
  return expression`ARRAY_FILL(${sv([...arguments])})`
}

/**
 * @description Returns the length of the requested array dimension.
 *
 * @example array_length(array[1,2,3], 1) → 3
 */
export function ARRAY_LENGTH (arr: ArrayArg, dim: IntegerArg): Expression<IntegerType> {
  return expression`ARRAY_LENGTH(${sv([...arguments])})`
}

/**
 * @description Returns the lower bound of the requested array dimension.
 *
 * @example array_lower('[0:2]={1,2,3}'::integer[], 1) → 0
 */
export function ARRAY_LOWER (arr: ArrayArg, dim: IntegerArg): Expression<IntegerType> {
  return expression`ARRAY_LOWER(${sv([...arguments])})`
}

/**
 * @description Returns the number of dimensions of the array.
 *
 * @example array_ndims(ARRAY[[1,2,3], [4,5,6]]) → 2
 */
export function ARRAY_NDIMS (arr: ArrayArg): Expression<IntegerType> {
  return expression`ARRAY_NDIMS(${sv([...arguments])})`
}

/**
 * @description Returns the subscript of the first occurrence of the second argument in
 * the array, or NULL if it's not present. If the third argument
 * is given, the search begins at that subscript. The array must be
 * one-dimensional. Comparisons are done using IS NOT DISTINCT FROM semantics, so it
 * is possible to search for NULL.
 *
 * @example array_position(ARRAY['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'], 'mon') → 2
 */
export function ARRAY_POSITION <T extends Type> (arr: ArrayArg<T>, el: T['argument'], dim?: IntegerArg): Expression<IntegerType> {
  return expression`ARRAY_POSITION(${sv([...arguments])})`
}

/**
 * @description Returns an array of the subscripts of all occurrences of the second
 * argument in the array given as first argument. The array must be
 * one-dimensional. Comparisons are done using IS NOT DISTINCT FROM semantics, so it
 * is possible to search for NULL. NULL is returned only if the
 * array is NULL; if the value is not found in the array,
 * an empty array is returned.
 *
 * @example array_positions(ARRAY['A','A','B','A'], 'A') → {1,2,4}
 */
export function ARRAY_POSITIONS <T extends Type> (arr: ArrayArg<T>, el: T['argument']): Expression<ArrayType<IntegerType>> {
  return expression`ARRAY_POSITIONS(${sv([...arguments])})`
}

/**
 * @description Prepends an element to the beginning of an array (same as the
 * anyelement || anyarray operator).
 *
 * @example array_prepend(1, ARRAY[2,3]) → {1,2,3}
 */
export function ARRAY_PREPEND <T extends Type> (el: T['argument'], arr: ArrayArg<T>): Expression<ArrayType<T>> {
  return expression`ARRAY_PREPEND(${sv([...arguments])})`
}

/**
 * @description Removes all elements equal to the given value from the array. The
 * array must be one-dimensional. Comparisons are done using IS NOT DISTINCT FROM
 * semantics, so it is possible to remove NULLs.
 *
 * @example array_remove(ARRAY[1,2,3,2], 2) → {1,3}
 */
export function ARRAY_REMOVE <T extends Type> (arr: ArrayArg<T>, el: T['argument']): Expression<ArrayType<T>> {
  return expression`ARRAY_REMOVE(${sv([...arguments])})`
}

/**
 * @description Replaces each array element equal to the second argument with the third
 * argument.
 *
 * @example array_replace(ARRAY[1,2,5,4], 5, 3) → {1,2,3,4}
 */
export function ARRAY_REPLACE <T extends Type> (arr: ArrayArg<T>, from: T['argument'], to: T['argument']): Expression<ArrayType<T>> {
  return expression`ARRAY_REPLACE(${sv([...arguments])})`
}

/**
 * @description Converts each array element to its text representation, and concatenates those separated
 * by the delimiter string. If null_string is given and is not NULL,
 * then NULL array entries are represented by that string; otherwise, they are
 * omitted.
 *
 * @example array_to_string(ARRAY[1, 2, 3, NULL, 5], ',', '*') → 1,2,3,*,5
 */
export function ARRAY_TO_STRING (array: ArrayArg, delimiter: CharacterArg, nulls?: CharacterArg): Expression<TextType> {
  return expression`ARRAY_TO_STRING(${sv([...arguments])})`
}

/**
 * @description Returns the upper bound of the requested array dimension.
 *
 * @example array_upper(ARRAY[1,8,3,7], 1) → 4
 */
export function ARRAY_UPPER (arr: ArrayArg, dim: IntegerArg): Expression<IntegerType> {
  return expression`ARRAY_UPPER(${sv([...arguments])})`
}

/**
 * @description Returns the total number of elements in the array, or 0 if
 * the array is empty.
 *
 * @example cardinality(ARRAY[[1,2],[3,4]]) → 4
 */
export function CARDINALITY (arr: ArrayArg): Expression<IntegerType> {
  return expression`CARDINALITY(${sv([...arguments])})`
}

/**
 * @description Splits the string at occurrences of delimiter and forms the remaining data
 * into a text array. If delimiter is NULL, each character in the
 * string will become a separate element in the array. If delimiter is
 * an empty string, then the string is treated as a single field.
 * If null_string is supplied and is not NULL, fields matching that string
 * are converted to NULL entries.
 *
 * @example string_to_array('xx~~yy~~zz', '~~', 'yy') → {xx,NULL,zz}
 */
export function STRING_TO_ARRAY (string: CharacterArg, delimiter: CharacterArg, nulls: CharacterArg): Expression<ArrayType<TextType>> {
  return expression`STRING_TO_ARRAY(${sv([...arguments])})`
}

/**
 * @description Expands an array into a set of rows. The array's elements are
 * read out in storage order.
 *
 * @example unnest(ARRAY[1,2]) →
 *  1
 *  2
 * unnest(ARRAY[['foo','bar'],['baz','quux']]) →
 *  foo
 *  bar
 *  baz
 *  quux
 */
export function UNNEST <T extends Type> (arr: ArrayArg<T> | TSVectorArg): T['expression'] {
  return expression`UNNEST(${sv([...arguments])})`
}

// /**
//  * @description Expands multiple arrays (possibly of different data types) into a set of
//  * rows. If the arrays are not all the same length then the
//  * shorter ones are padded with NULLs. This form is only allowed in
//  * a query's FROM clause; see Section 7.2.1.4.
//  *
//  * @example select * from unnest(ARRAY[1,2], ARRAY['foo','bar','baz']) as x(a,b) →
//  *  a |  b
//  * ---+-----
//  *  1 | foo
//  *  2 | bar
//  *    | baz
//  */
// export function UNNEST (ANYARRAY, ANYARRAY [, ... ]): SETOF ANYELEMENT, ANYELEMENT [, ... ] {
//   return expression`UNNEST(${sv([...arguments])})`
// }
