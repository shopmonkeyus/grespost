import { BooleanArg, BooleanType, IntegerType, JSONBType, JSONType, CharacterArg, TextType, ArrayArg, JSONArg, JSONBArg, TextArg, ArrayType } from '../types'
import { AnyExpression, Expression, expression } from '../expressions'
import { sv } from '../template'

/**
 * @description Converts any SQL value to json or jsonb. Arrays and composites are
 * converted recursively to arrays and objects (multidimensional arrays become arrays of arrays
 * in JSON). Otherwise, if there is a cast from the SQL data
 * type to json, the cast function will be used to perform the
 * conversion;[a] otherwise, a scalar JSON value is produced. For any scalar other
 * than a number, a Boolean, or a null value, the text representation
 * will be used, with escaping as necessary to make it a valid
 * JSON string value.
 *
 * @example to_json('Fred said "Hi."'::text) → "Fred said \"Hi.\""
 * to_jsonb(row(42, 'Fred said "Hi."'::text)) → {"f1": 42, "f2": "Fred said \"Hi.\""}
 */
export function TO_JSON (arg: any): Expression<JSONType> {
  return expression`TO_JSON(${sv([...arguments])})`
}

/**
 * @description Converts any SQL value to json or jsonb. Arrays and composites are
 * converted recursively to arrays and objects (multidimensional arrays become arrays of arrays
 * in JSON). Otherwise, if there is a cast from the SQL data
 * type to json, the cast function will be used to perform the
 * conversion;[a] otherwise, a scalar JSON value is produced. For any scalar other
 * than a number, a Boolean, or a null value, the text representation
 * will be used, with escaping as necessary to make it a valid
 * JSON string value.
 *
 * @example to_json('Fred said "Hi."'::text) → "Fred said \"Hi.\""
 * to_jsonb(row(42, 'Fred said "Hi."'::text)) → {"f1": 42, "f2": "Fred said \"Hi.\""}
 */
export function TO_JSONB (arg: any): Expression<JSONBType> {
  return expression`TO_JSONB(${sv([...arguments])})`
}

/**
 * @description Converts a SQL array to a JSON array. The behavior is the
 * same as to_json except that line feeds will be added between top-level
 * array elements if the optional boolean parameter is true.
 *
 * @example array_to_json('{{1,5},{99,100}}'::int[]) → [[1,5],[99,100]]
 */
export function ARRAY_TO_JSON (arg: ArrayArg, feeds?: BooleanArg): Expression<JSONType> {
  return expression`ARRAY_TO_JSON(${sv([...arguments])})`
}

/**
 * @description Converts a SQL composite value to a JSON object. The behavior is
 * the same as to_json except that line feeds will be added between
 * top-level elements if the optional boolean parameter is true.
 *
 * @example row_to_json(row(1,'foo')) → {"f1":1,"f2":"foo"}
 */
export function ROW_TO_JSON (record: any, feeds?: BooleanArg): Expression<JSONType> {
  return expression`ROW_TO_JSON(${sv([...arguments])})`
}

/**
 * @description Builds a possibly-heterogeneously-typed JSON array out of a variadic argument list. Each
 * argument is converted as per to_json or to_jsonb.
 *
 * @example json_build_array(1, 2, 'foo', 4, 5) → [1, 2, "foo", 4, 5]
 */
export function JSON_BUILD_ARRAY (...args: any[]): Expression<JSONType> {
  return expression`JSON_BUILD_ARRAY(${sv([...arguments])})`
}

/**
 * @description Builds a possibly-heterogeneously-typed JSON array out of a variadic argument list. Each
 * argument is converted as per to_json or to_jsonb.
 *
 * @example json_build_array(1, 2, 'foo', 4, 5) → [1, 2, "foo", 4, 5]
 */
export function JSONB_BUILD_ARRAY (...args: any[]): Expression<JSONBType> {
  return expression`JSONB_BUILD_ARRAY(${sv([...arguments])})`
}

/**
 * @description Builds a JSON object out of a variadic argument list. By convention,
 * the argument list consists of alternating keys and values. Key arguments are
 * coerced to text; value arguments are converted as per to_json or to_jsonb.
 *
 * @example json_build_object('foo', 1, 2, row(3,'bar')) → {"foo" : 1, "2" : {"f1":3,"f2":"bar"}}
 */
export function JSON_BUILD_OBJECT (...args: any[]): Expression<JSONType> {
  return expression`JSON_BUILD_OBJECT(${sv([...arguments])})`
}

/**
 * @description Builds a JSON object out of a variadic argument list. By convention,
 * the argument list consists of alternating keys and values. Key arguments are
 * coerced to text; value arguments are converted as per to_json or to_jsonb.
 *
 * @example json_build_object('foo', 1, 2, row(3,'bar')) → {"foo" : 1, "2" : {"f1":3,"f2":"bar"}}
 */
export function JSONB_BUILD_OBJECT (...args: any[]): Expression<JSONBType> {
  return expression`JSONB_BUILD_OBJECT(${sv([...arguments])})`
}

/**
 * @description This form of json_object takes keys and values pairwise from separate text
 * arrays. Otherwise it is identical to the one-argument form.
 *
 * @example json_object('{a,b}', '{1,2}') → {"a": "1", "b": "2"}
 */
export function JSON_OBJECT (entries: ArrayArg<TextType> | ArrayArg<ArrayType<TextType>>): Expression<JSONType>
export function JSON_OBJECT (keys: ArrayArg<TextType>, values: ArrayArg<TextType>): Expression<JSONType>
export function JSON_OBJECT (keys: ArrayArg<TextType>, values?: ArrayArg<TextType>): Expression<JSONType> {
  return expression`JSON_OBJECT(${sv([...arguments])})`
}

/**
 * @description This form of json_object takes keys and values pairwise from separate text
 * arrays. Otherwise it is identical to the one-argument form.
 *
 * @example json_object('{a,b}', '{1,2}') → {"a": "1", "b": "2"}
 */
export function JSONB_OBJECT (entries: ArrayArg<TextType> | ArrayArg<ArrayType<TextType>>): Expression<JSONBType>
export function JSONB_OBJECT (keys: ArrayArg<TextType>, values: ArrayArg<TextType>): Expression<JSONBType>
export function JSONB_OBJECT (keys: ArrayArg<TextType>, values?: ArrayArg<TextType>): Expression<JSONBType> {
  return expression`JSONB_OBJECT(${sv([...arguments])})`
}

/**
 * @description Expands the top-level JSON array into a set of JSON values.
 *
 * @example select * from json_array_elements('[1,true, [2,false]]') →
 *    value
 * -----------
 *  1
 *  true
 *  [2,false]
 */
export function JSON_ARRAY_ELEMENTS (arg: JSONArg): Expression<JSONType> {
  return expression`JSON_ARRAY_ELEMENTS(${sv([...arguments])})`
}

/**
 * @description Expands the top-level JSON array into a set of JSON values.
 *
 * @example select * from json_array_elements('[1,true, [2,false]]') →
 *    value
 * -----------
 *  1
 *  true
 *  [2,false]
 */
export function JSONB_ARRAY_ELEMENTS (arg: JSONBArg): Expression<JSONBType> {
  return expression`JSONB_ARRAY_ELEMENTS(${sv([...arguments])})`
}

/**
 * @description Expands the top-level JSON array into a set of text values.
 *
 * @example select * from json_array_elements_text('["foo", "bar"]') →
 *    value
 * -----------
 *  foo
 *  bar
 */
export function JSON_ARRAY_ELEMENTS_TEXT (arg: JSONArg): Expression<TextType> {
  return expression`JSON_ARRAY_ELEMENTS_TEXT(${sv([...arguments])})`
}

/**
 * @description Expands the top-level JSON array into a set of text values.
 *
 * @example select * from json_array_elements_text('["foo", "bar"]') →
 *    value
 * -----------
 *  foo
 *  bar
 */
export function JSONB_ARRAY_ELEMENTS_TEXT (arg: JSONBArg): Expression<TextType> {
  return expression`JSONB_ARRAY_ELEMENTS_TEXT(${sv([...arguments])})`
}

/**
 * @description Returns the number of elements in the top-level JSON array.
 *
 * @example json_array_length('[1,2,3,{"f1":1,"f2":[5,6]},4]') → 5
 */
export function JSON_ARRAY_LENGTH (arg: JSONArg): Expression<IntegerType> {
  return expression`JSON_ARRAY_LENGTH(${sv([...arguments])})`
}

/**
 * @description Returns the number of elements in the top-level JSON array.
 *
 * @example json_array_length('[1,2,3,{"f1":1,"f2":[5,6]},4]') → 5
 */
export function JSONB_ARRAY_LENGTH (arg: JSONBArg): Expression<IntegerType> {
  return expression`JSONB_ARRAY_LENGTH(${sv([...arguments])})`
}

/**
 * @description Expands the top-level JSON object into a set of key/value pairs.
 *
 * @example select * from json_each('{"a":"foo", "b":"bar"}') →
 *  key | value
 * -----+-------
 *  a   | "foo"
 *  b   | "bar"
 */
export function JSON_EACH (arg: JSONArg): AnyExpression {
  return expression`JSON_EACH(${sv([...arguments])})`
}

/**
 * @description Expands the top-level JSON object into a set of key/value pairs.
 *
 * @example select * from json_each('{"a":"foo", "b":"bar"}') →
 *  key | value
 * -----+-------
 *  a   | "foo"
 *  b   | "bar"
 */
export function JSONB_EACH (arg: JSONBArg): AnyExpression {
  return expression`JSONB_EACH(${sv([...arguments])})`
}

/**
 * @description Expands the top-level JSON object into a set of key/value pairs. The
 * returned values will be of type text.
 *
 * @example select * from json_each_text('{"a":"foo", "b":"bar"}') →
 *  key | value
 * -----+-------
 *  a   | foo
 *  b   | bar
 */
export function JSON_EACH_TEXT (arg: JSONArg): AnyExpression {
  return expression`JSON_EACH_TEXT(${sv([...arguments])})`
}

/**
 * @description Expands the top-level JSON object into a set of key/value pairs. The
 * returned values will be of type text.
 *
 * @example select * from json_each_text('{"a":"foo", "b":"bar"}') →
 *  key | value
 * -----+-------
 *  a   | foo
 *  b   | bar
 */
export function JSONB_EACH_TEXT (arg: JSONBArg): AnyExpression {
  return expression`JSONB_EACH_TEXT(${sv([...arguments])})`
}

/**
 * @description Extracts JSON sub-object at the specified path. (This is functionally equivalent to
 * the #> operator, but writing the path out as a variadic list
 * can be more convenient in some cases.)
 *
 * @example json_extract_path('{"f2":{"f3":1},"f4":{"f5":99,"f6":"foo"}}', 'f4', 'f6') → "foo"
 */
export function JSON_EXTRACT_PATH (from: JSONArg, ...path: TextArg[]): Expression<JSONType> {
  return expression`JSON_EXTRACT_PATH(${sv([...arguments])})`
}

/**
 * @description Extracts JSON sub-object at the specified path. (This is functionally equivalent to
 * the #> operator, but writing the path out as a variadic list
 * can be more convenient in some cases.)
 *
 * @example json_extract_path('{"f2":{"f3":1},"f4":{"f5":99,"f6":"foo"}}', 'f4', 'f6') → "foo"
 */
export function JSONB_EXTRACT_PATH (from: JSONBArg, ...path: TextArg[]): Expression<JSONBType> {
  return expression`JSONB_EXTRACT_PATH(${sv([...arguments])})`
}

/**
 * @description Extracts JSON sub-object at the specified path as text. (This is functionally
 * equivalent to the #>> operator.)
 *
 * @example json_extract_path_text('{"f2":{"f3":1},"f4":{"f5":99,"f6":"foo"}}', 'f4', 'f6') → foo
 */
export function JSON_EXTRACT_PATH_TEXT (from: JSONArg, ...path: TextArg[]): Expression<TextType> {
  return expression`JSON_EXTRACT_PATH_TEXT(${sv([...arguments])})`
}

/**
 * @description Extracts JSON sub-object at the specified path as text. (This is functionally
 * equivalent to the #>> operator.)
 *
 * @example json_extract_path_text('{"f2":{"f3":1},"f4":{"f5":99,"f6":"foo"}}', 'f4', 'f6') → foo
 */
export function JSONB_EXTRACT_PATH_TEXT (from: JSONBArg, ...path: TextArg[]): Expression<TextType> {
  return expression`JSONB_EXTRACT_PATH_TEXT(${sv([...arguments])})`
}

/**
 * @description Returns the set of keys in the top-level JSON object.
 *
 * @example select * from json_object_keys('{"f1":"abc","f2":{"f3":"a", "f4":"b"}}') →
 *  json_object_keys
 * ------------------
 *  f1
 *  f2
 */
export function JSON_OBJECT_KEYS (arg: JSONArg): Expression<TextType> {
  return expression`JSON_OBJECT_KEYS(${sv([...arguments])})`
}

/**
 * @description Returns the set of keys in the top-level JSON object.
 *
 * @example select * from json_object_keys('{"f1":"abc","f2":{"f3":"a", "f4":"b"}}') →
 *  json_object_keys
 * ------------------
 *  f1
 *  f2
 */
export function JSONB_OBJECT_KEYS (arg: JSONBArg): Expression<TextType> {
  return expression`JSONB_OBJECT_KEYS(${sv([...arguments])})`
}

/**
 * @description Expands the top-level JSON object to a row having the composite type
 * of the base argument. The JSON object is scanned for fields whose
 * names match column names of the output row type, and their values
 * are inserted into those columns of the output. (Fields that do not
 * correspond to any output column name are ignored.) In typical use, the
 * value of base is just NULL, which means that any output columns
 * that do not match any object field will be filled with nulls.
 * However, if base isn't NULL then the values it contains will be
 * used for unmatched columns.
 *
 * To convert a JSON value to the SQL type of an output column, the following rules are applied in sequence:
 * A JSON null value is converted to a SQL null in all cases.
 * If the output column is of type json or jsonb, the JSON value is just reproduced exactly.
 * If the output column is a composite (row) type, and the JSON value is a JSON object, the fields of the object are converted to columns of the output row type by recursive application of these rules.
 * Likewise, if the output column is an array type and the JSON value is a JSON array, the elements of the JSON array are converted to elements of the output array by recursive application of these rules.
 * Otherwise, if the JSON value is a string, the contents of the string are fed to the input conversion function for the column's data type.
 * Otherwise, the ordinary text representation of the JSON value is fed to the input conversion function for the column's data type.
 * While the example below uses a constant JSON value, typical use would be to reference a json or jsonb column laterally from another table in the query's FROM clause. Writing json_populate_record in the FROM clause is good practice, since all of the extracted columns are available for use without duplicate function calls.
 * create type subrowtype as (d int, e text); create type myrowtype as (a int, b text[], c subrowtype);
 * @example select * from json_populate_record(null::myrowtype, '{"a": 1, "b": ["2", "a b"], "c": {"d": 4, "e": "a b c"}, "x": "foo"}') →
 *  a |   b       |      c
 * ---+-----------+-------------
 *  1 | {2,"a b"} | (4,"a b c")
 */
export function JSON_POPULATE_RECORD (base: any, from: JSONArg): AnyExpression {
  return expression`JSON_POPULATE_RECORD(${sv([...arguments])})`
}

/**
 * @description Expands the top-level JSON object to a row having the composite type
 * of the base argument. The JSON object is scanned for fields whose
 * names match column names of the output row type, and their values
 * are inserted into those columns of the output. (Fields that do not
 * correspond to any output column name are ignored.) In typical use, the
 * value of base is just NULL, which means that any output columns
 * that do not match any object field will be filled with nulls.
 * However, if base isn't NULL then the values it contains will be
 * used for unmatched columns.
 *
 * To convert a JSON value to the SQL type of an output column, the following rules are applied in sequence:
 * A JSON null value is converted to a SQL null in all cases.
 * If the output column is of type json or jsonb, the JSON value is just reproduced exactly.
 * If the output column is a composite (row) type, and the JSON value is a JSON object, the fields of the object are converted to columns of the output row type by recursive application of these rules.
 * Likewise, if the output column is an array type and the JSON value is a JSON array, the elements of the JSON array are converted to elements of the output array by recursive application of these rules.
 * Otherwise, if the JSON value is a string, the contents of the string are fed to the input conversion function for the column's data type.
 * Otherwise, the ordinary text representation of the JSON value is fed to the input conversion function for the column's data type.
 * While the example below uses a constant JSON value, typical use would be to reference a json or jsonb column laterally from another table in the query's FROM clause. Writing json_populate_record in the FROM clause is good practice, since all of the extracted columns are available for use without duplicate function calls.
 * create type subrowtype as (d int, e text); create type myrowtype as (a int, b text[], c subrowtype);
 * @example select * from json_populate_record(null::myrowtype, '{"a": 1, "b": ["2", "a b"], "c": {"d": 4, "e": "a b c"}, "x": "foo"}') →
 *  a |   b       |      c
 * ---+-----------+-------------
 *  1 | {2,"a b"} | (4,"a b c")
 */
export function JSONB_POPULATE_RECORD (base: any, from: JSONBArg): AnyExpression {
  return expression`JSONB_POPULATE_RECORD(${sv([...arguments])})`
}

/**
 * @description Expands the top-level JSON array of objects to a set of rows
 * having the composite type of the base argument. Each element of the
 * JSON array is processed as described above for json[b]_populate_record.
 *
 * @example create type twoints as (a int, b int);
 * select * from json_populate_recordset(null::twoints, '[{"a":1,"b":2}, {"a":3,"b":4}]') →
 *  a | b
 * ---+---
 *  1 | 2
 *  3 | 4
 */
export function JSON_POPULATE_RECORDSET (base: any, from: JSONArg): AnyExpression {
  return expression`JSON_POPULATE_RECORDSET(${sv([...arguments])})`
}

/**
 * @description Expands the top-level JSON array of objects to a set of rows
 * having the composite type of the base argument. Each element of the
 * JSON array is processed as described above for json[b]_populate_record.
 *
 * @example create type twoints as (a int, b int);
 * select * from json_populate_recordset(null::twoints, '[{"a":1,"b":2}, {"a":3,"b":4}]') →
 *  a | b
 * ---+---
 *  1 | 2
 *  3 | 4
 */
export function JSONB_POPULATE_RECORDSET (base: any, from: JSONBArg): AnyExpression {
  return expression`JSONB_POPULATE_RECORDSET(${sv([...arguments])})`
}

/**
 * @description Expands the top-level JSON object to a row having the composite type
 * defined by an AS clause. (As with all functions returning record, the
 * calling query must explicitly define the structure of the record with an
 * AS clause.) The output record is filled from fields of the JSON
 * object, in the same way as described above for json[b]_populate_record. Since there
 * is no input record value, unmatched columns are always filled with nulls.
 *
 * @example create type myrowtype as (a int, b text);
 * select * from json_to_record('{"a":1,"b":[1,2,3],"c":[1,2,3],"e":"bar","r": {"a": 123, "b": "a b c"}}') as x(a int, b text, c int[], d text, r myrowtype) →
 *  a |    b    |    c    | d |       r
 * ---+---------+---------+---+---------------
 *  1 | [1,2,3] | {1,2,3} |   | (123,"a b c")
 */
export function JSON_TO_RECORD (arg: JSONArg): AnyExpression {
  return expression`JSON_TO_RECORD(${sv([...arguments])})`
}

/**
 * @description Expands the top-level JSON object to a row having the composite type
 * defined by an AS clause. (As with all functions returning record, the
 * calling query must explicitly define the structure of the record with an
 * AS clause.) The output record is filled from fields of the JSON
 * object, in the same way as described above for json[b]_populate_record. Since there
 * is no input record value, unmatched columns are always filled with nulls.
 *
 * @example create type myrowtype as (a int, b text);
 * select * from json_to_record('{"a":1,"b":[1,2,3],"c":[1,2,3],"e":"bar","r": {"a": 123, "b": "a b c"}}') as x(a int, b text, c int[], d text, r myrowtype) →
 *  a |    b    |    c    | d |       r
 * ---+---------+---------+---+---------------
 *  1 | [1,2,3] | {1,2,3} |   | (123,"a b c")
 */
export function JSONB_TO_RECORD (arg: JSONBArg): AnyExpression {
  return expression`JSONB_TO_RECORD(${sv([...arguments])})`
}

/**
 * @description Expands the top-level JSON array of objects to a set of rows
 * having the composite type defined by an AS clause. (As with all
 * functions returning record, the calling query must explicitly define the structure of
 * the record with an AS clause.) Each element of the JSON array
 * is processed as described above for json[b]_populate_record.
 *
 * @example select * from json_to_recordset('[{"a":1,"b":"foo"}, {"a":"2","c":"bar"}]') as x(a int, b text) →
 *  a |  b
 * ---+-----
 *  1 | foo
 *  2 |
 */
export function JSON_TO_RECORDSET (arg: JSONArg): AnyExpression {
  return expression`JSON_TO_RECORDSET(${sv([...arguments])})`
}

/**
 * @description Expands the top-level JSON array of objects to a set of rows
 * having the composite type defined by an AS clause. (As with all
 * functions returning record, the calling query must explicitly define the structure of
 * the record with an AS clause.) Each element of the JSON array
 * is processed as described above for json[b]_populate_record.
 *
 * @example select * from json_to_recordset('[{"a":1,"b":"foo"}, {"a":"2","c":"bar"}]') as x(a int, b text) →
 *  a |  b
 * ---+-----
 *  1 | foo
 *  2 |
 */
export function JSONB_TO_RECORDSET (arg: JSONBArg): AnyExpression {
  return expression`JSONB_TO_RECORDSET(${sv([...arguments])})`
}

/**
 * @description Returns target with the item designated by path replaced by new_value, or
 * with new_value added if create_if_missing is true (which is the default) and
 * the item designated by path does not exist. All earlier steps in
 * the path must exist, or the target is returned unchanged. As with
 * the path oriented operators, negative integers that appear in the path count
 * from the end of JSON arrays. If the last path step is
 * an array index that is out of range, and create_if_missing is true,
 * the new value is added at the beginning of the array if
 * the index is negative, or at the end of the array if
 * it is positive.
 *
 * @example jsonb_set('[{"f1":1,"f2":null},2,null,3]', '{0,f1}', '[2,3,4]', false) → [{"f1": [2, 3, 4], "f2": null}, 2, null, 3]
 * jsonb_set('[{"f1":1,"f2":null},2]', '{0,f3}', '[2,3,4]') → [{"f1": 1, "f2": null, "f3": [2, 3, 4]}, 2]
 */
export function JSONB_SET (
  target: JSONBArg,
  path: ArrayArg<TextType>,
  newValue: JSONBArg,
  createIfMissing?: BooleanArg
): Expression<JSONBType> {
  return expression`JSONB_SET(${sv([...arguments])})`
}

/**
 * @description If new_value is not NULL, behaves identically to jsonb_set. Otherwise behaves according
 * to the value of null_value_treatment which must be one of 'raise_exception', 'use_json_null',
 * 'delete_key', or 'return_target'. The default is 'use_json_null'.
 *
 * @example jsonb_set_lax('[{"f1":1,"f2":null},2,null,3]', '{0,f1}', null) → [{"f1":null,"f2":null},2,null,3]
 * jsonb_set_lax('[{"f1":99,"f2":null},2]', '{0,f3}', null, true, 'return_target') → [{"f1": 99, "f2": null}, 2]
 */
export function JSONB_SET_LAX (
  target: JSONBArg,
  path: ArrayArg<TextType>,
  newValue: JSONBArg | null,
  createifMissing?: BooleanArg,
  nullValueTreatment?: CharacterArg): Expression<JSONBType> {
  return expression`JSONB_SET_LAX(${sv([...arguments])})`
}

/**
 * @description Returns target with new_value inserted. If the item designated by the path
 * is an array element, new_value will be inserted before that item if
 * insert_after is false (which is the default), or after it if insert_after
 * is true. If the item designated by the path is an object
 * field, new_value will be inserted only if the object does not already
 * contain that key. All earlier steps in the path must exist, or
 * the target is returned unchanged. As with the path oriented operators, negative
 * integers that appear in the path count from the end of JSON
 * arrays. If the last path step is an array index that is
 * out of range, the new value is added at the beginning of
 * the array if the index is negative, or at the end of
 * the array if it is positive.
 *
 * @example jsonb_insert('{"a": [0,1,2]}', '{a, 1}', '"new_value"') → {"a": [0, "new_value", 1, 2]}
 * jsonb_insert('{"a": [0,1,2]}', '{a, 1}', '"new_value"', true) → {"a": [0, 1, "new_value", 2]}
 */
export function JSONB_INSERT (
  target: JSONBArg,
  path: ArrayArg<TextType>,
  newValue: JSONBArg,
  insertAfter?: BooleanArg
): Expression<JSONBType> {
  return expression`JSONB_INSERT(${sv([...arguments])})`
}

/**
 * @description Deletes all object fields that have null values from the given JSON
 * value, recursively. Null values that are not object fields are untouched.
 *
 * @example json_strip_nulls('[{"f1":1, "f2":null}, 2, null, 3]') → [{"f1":1},2,null,3]
 */
export function JSON_STRIP_NULLS (arg: JSONArg): Expression<JSONType> {
  return expression`JSON_STRIP_NULLS(${sv([...arguments])})`
}

/**
 * @description Deletes all object fields that have null values from the given JSON
 * value, recursively. Null values that are not object fields are untouched.
 *
 * @example json_strip_nulls('[{"f1":1, "f2":null}, 2, null, 3]') → [{"f1":1},2,null,3]
 */
export function JSONB_STRIP_NULLS (arg: JSONBArg): Expression<JSONBType> {
  return expression`JSONB_STRIP_NULLS(${sv([...arguments])})`
}

/**
 * @description Checks whether the JSON path returns any item for the specified JSON
 * value. If the vars argument is specified, it must be a JSON
 * object, and its fields provide named values to be substituted into the
 * jsonpath expression. If the silent argument is specified and is true, the
 * function suppresses the same errors as the @? and @@ operators do.
 *
 * @example jsonb_path_exists('{"a":[1,2,3,4,5]}', '$.a[*] ? (@ >= $min && @ <= $max)', '{"min":2, "max":4}') → t
 */
export function JSONB_PATH_EXISTS (
  target: JSONBArg,
  path: CharacterArg,
  vars?: JSONBArg,
  silent?: BooleanArg
): Expression<BooleanType> {
  return expression`JSONB_PATH_EXISTS(${sv([...arguments])})`
}

/**
 * @description Returns the result of a JSON path predicate check for the specified
 * JSON value. Only the first item of the result is taken into
 * account. If the result is not Boolean, then NULL is returned. The
 * optional vars and silent arguments act the same as for jsonb_path_exists.
 *
 * @example jsonb_path_match('{"a":[1,2,3,4,5]}', 'exists($.a[*] ? (@ >= $min && @ <= $max))', '{"min":2, "max":4}') → t
 */
export function JSONB_PATH_MATCH (target: JSONBArg, path: CharacterArg, vars?: JSONBArg, silent?: BooleanArg): Expression<BooleanType> {
  return expression`JSONB_PATH_MATCH(${sv([...arguments])})`
}

/**
 * @description Returns all JSON items returned by the JSON path for the specified
 * JSON value. The optional vars and silent arguments act the same as
 * for jsonb_path_exists.
 *
 * @example select * from jsonb_path_query('{"a":[1,2,3,4,5]}', '$.a[*] ? (@ >= $min && @ <= $max)', '{"min":2, "max":4}') →
 *  jsonb_path_query
 * ------------------
 *  2
 *  3
 *  4
 */
export function JSONB_PATH_QUERY (target: JSONBArg, path: CharacterArg, vars?: JSONBArg, silent?: BooleanArg): Expression<JSONBType> {
  return expression`JSONB_PATH_QUERY(${sv([...arguments])})`
}

/**
 * @description Returns all JSON items returned by the JSON path for the specified
 * JSON value, as a JSON array. The optional vars and silent arguments
 * act the same as for jsonb_path_exists.
 *
 * @example jsonb_path_query_array('{"a":[1,2,3,4,5]}', '$.a[*] ? (@ >= $min && @ <= $max)', '{"min":2, "max":4}') → [2, 3, 4]
 */
export function JSONB_PATH_QUERY_ARRAY (target: JSONBArg, path: CharacterArg, vars?: JSONBArg, silent?: BooleanArg): Expression<JSONBType> {
  return expression`JSONB_PATH_QUERY_ARRAY(${sv([...arguments])})`
}

/**
 * @description Returns the first JSON item returned by the JSON path for the
 * specified JSON value. Returns NULL if there are no results. The optional
 * vars and silent arguments act the same as for jsonb_path_exists.
 *
 * @example jsonb_path_query_first('{"a":[1,2,3,4,5]}', '$.a[*] ? (@ >= $min && @ <= $max)', '{"min":2, "max":4}') → 2
 */
export function JSONB_PATH_QUERY_FIRST (target: JSONBArg, path: CharacterArg, vars?: JSONBArg, silent?: BooleanArg): Expression<JSONBType> {
  return expression`JSONB_PATH_QUERY_FIRST(${sv([...arguments])})`
}

/**
 * @description These functions act like their counterparts described above without the _tz suffix,
 * except that these functions support comparisons of date/time values that require timezone-aware
 * conversions. The example below requires interpretation of the date-only value 2015-08-02 as
 * a timestamp with time zone, so the result depends on the current
 * TimeZone setting. Due to this dependency, these functions are marked as stable,
 * which means these functions cannot be used in indexes. Their counterparts are
 * immutable, and so can be used in indexes; but they will throw
 * errors if asked to make such comparisons.
 *
 * @example jsonb_path_exists_tz('["2015-08-01 12:00:00 -05"]', '$[*] ? (@.datetime() < "2015-08-02".datetime())') → t
 */
export function JSONB_PATH_EXISTS_TZ (target: JSONBArg, path: CharacterArg, vars?: JSONBArg, silent?: BooleanArg): Expression<BooleanType> {
  return expression`JSONB_PATH_EXISTS_TZ(${sv([...arguments])})`
}

/**
 * @description These functions act like their counterparts described above without the _tz suffix,
 * except that these functions support comparisons of date/time values that require timezone-aware
 * conversions. The example below requires interpretation of the date-only value 2015-08-02 as
 * a timestamp with time zone, so the result depends on the current
 * TimeZone setting. Due to this dependency, these functions are marked as stable,
 * which means these functions cannot be used in indexes. Their counterparts are
 * immutable, and so can be used in indexes; but they will throw
 * errors if asked to make such comparisons.
 *
 * @example jsonb_path_exists_tz('["2015-08-01 12:00:00 -05"]', '$[*] ? (@.datetime() < "2015-08-02".datetime())') → t
 */
export function JSONB_PATH_MATCH_TZ (target: JSONBArg, path: CharacterArg, vars?: JSONBArg, silent?: BooleanArg): Expression<BooleanType> {
  return expression`JSONB_PATH_MATCH_TZ(${sv([...arguments])})`
}

/**
 * @description These functions act like their counterparts described above without the _tz suffix,
 * except that these functions support comparisons of date/time values that require timezone-aware
 * conversions. The example below requires interpretation of the date-only value 2015-08-02 as
 * a timestamp with time zone, so the result depends on the current
 * TimeZone setting. Due to this dependency, these functions are marked as stable,
 * which means these functions cannot be used in indexes. Their counterparts are
 * immutable, and so can be used in indexes; but they will throw
 * errors if asked to make such comparisons.
 *
 * @example jsonb_path_exists_tz('["2015-08-01 12:00:00 -05"]', '$[*] ? (@.datetime() < "2015-08-02".datetime())') → t
 */
export function JSONB_PATH_QUERY_TZ (target: JSONBArg, path: CharacterArg, vars?: JSONBArg, silent?: BooleanArg): Expression<JSONBType> {
  return expression`JSONB_PATH_QUERY_TZ(${sv([...arguments])})`
}

/**
 * @description These functions act like their counterparts described above without the _tz suffix,
 * except that these functions support comparisons of date/time values that require timezone-aware
 * conversions. The example below requires interpretation of the date-only value 2015-08-02 as
 * a timestamp with time zone, so the result depends on the current
 * TimeZone setting. Due to this dependency, these functions are marked as stable,
 * which means these functions cannot be used in indexes. Their counterparts are
 * immutable, and so can be used in indexes; but they will throw
 * errors if asked to make such comparisons.
 *
 * @example jsonb_path_exists_tz('["2015-08-01 12:00:00 -05"]', '$[*] ? (@.datetime() < "2015-08-02".datetime())') → t
 */
export function JSONB_PATH_QUERY_ARRAY_TZ (target: JSONBArg, path: CharacterArg, vars?: JSONBArg, silent?: BooleanArg): Expression<JSONBType> {
  return expression`JSONB_PATH_QUERY_ARRAY_TZ(${sv([...arguments])})`
}

/**
 * @description These functions act like their counterparts described above without the _tz suffix,
 * except that these functions support comparisons of date/time values that require timezone-aware
 * conversions. The example below requires interpretation of the date-only value 2015-08-02 as
 * a timestamp with time zone, so the result depends on the current
 * TimeZone setting. Due to this dependency, these functions are marked as stable,
 * which means these functions cannot be used in indexes. Their counterparts are
 * immutable, and so can be used in indexes; but they will throw
 * errors if asked to make such comparisons.
 *
 * @example jsonb_path_exists_tz('["2015-08-01 12:00:00 -05"]', '$[*] ? (@.datetime() < "2015-08-02".datetime())') → t
 */
export function JSONB_PATH_QUERY_FIRST_TZ (target: JSONBArg, path: CharacterArg, vars?: JSONBArg, silent?: BooleanArg): Expression<JSONBType> {
  return expression`JSONB_PATH_QUERY_FIRST_TZ(${sv([...arguments])})`
}

/**
 * @description Converts the given JSON value to pretty-printed, indented text.
 *
 * @example jsonb_pretty('[{"f1":1,"f2":null}, 2]') →
 * [
 *     {
 *         "f1": 1,
 *         "f2": null
 *     },
 *     2
 * ]
 */
export function JSONB_PRETTY (arg: JSONBArg): Expression<TextType> {
  return expression`JSONB_PRETTY(${sv([...arguments])})`
}

/**
 * @description Returns the type of the top-level JSON value as a text string.
 * Possible types are object, array, string, number, boolean, and null. (The null
 * result should not be confused with a SQL NULL; see the examples.)
 *
 * @example json_typeof('-123.4') → number
 * json_typeof('null'::json) → null
 * json_typeof(NULL::json) IS NULL → t
 */
export function JSON_TYPEOF (arg: JSONArg): Expression<TextType> {
  return expression`JSON_TYPEOF(${sv([...arguments])})`
}

/**
 * @description Returns the type of the top-level JSON value as a text string.
 * Possible types are object, array, string, number, boolean, and null. (The null
 * result should not be confused with a SQL NULL; see the examples.)
 *
 * @example json_typeof('-123.4') → number
 * json_typeof('null'::json) → null
 * json_typeof(NULL::json) IS NULL → t
 */
export function JSONB_TYPEOF (arg: JSONBArg): Expression<TextType> {
  return expression`JSONB_TYPEOF(${sv([...arguments])})`
}
