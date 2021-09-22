import { literal } from '../../expressions'
import { ARRAY, INTEGER, JSON, JSONB, TEXT } from '../../types'
import { ROW } from '../boolean'
import { TO_JSON, ARRAY_TO_JSON, ROW_TO_JSON, JSON_BUILD_ARRAY, JSON_BUILD_OBJECT, JSON_OBJECT, TO_JSONB, JSONB_OBJECT, JSONB_INSERT, JSONB_PATH_EXISTS, JSONB_PATH_EXISTS_TZ, JSONB_PATH_MATCH, JSONB_PATH_QUERY, JSONB_PATH_QUERY_ARRAY, JSONB_PATH_QUERY_FIRST, JSONB_PRETTY, JSONB_SET, JSONB_SET_LAX, JSON_ARRAY_ELEMENTS, JSON_ARRAY_ELEMENTS_TEXT, JSON_ARRAY_LENGTH, JSON_EACH, JSON_EACH_TEXT, JSON_EXTRACT_PATH, JSON_EXTRACT_PATH_TEXT, JSON_OBJECT_KEYS, JSON_POPULATE_RECORDSET, JSON_STRIP_NULLS, JSON_TO_RECORD, JSON_TO_RECORDSET, JSON_TYPEOF, JSONB_TYPEOF, JSONB_STRIP_NULLS, JSONB_TO_RECORDSET, JSONB_TO_RECORD, JSONB_POPULATE_RECORDSET, JSONB_OBJECT_KEYS, JSONB_EXTRACT_PATH_TEXT, JSONB_EXTRACT_PATH, JSONB_EACH_TEXT, JSONB_EACH, JSONB_ARRAY_LENGTH, JSONB_ARRAY_ELEMENTS_TEXT, JSONB_ARRAY_ELEMENTS, JSONB_PATH_QUERY_FIRST_TZ, JSONB_PATH_QUERY_ARRAY_TZ, JSONB_PATH_QUERY_TZ, JSONB_PATH_MATCH_TZ, JSON_POPULATE_RECORD, JSONB_POPULATE_RECORD, JSONB_BUILD_ARRAY, JSONB_BUILD_OBJECT } from '../json'

describe('json functions', () => {
  it('to_json ( anyelement ) → json', () => {
    expect(TO_JSON(literal('FRED SAID "HI."').cast(TEXT())).toQuery()).toEqual(
      [
        'TO_JSON($1::TEXT)',
        [
          'FRED SAID "HI."'
        ]
      ]
    )
    expect(TO_JSONB(ROW(42, literal('FRED SAID "HI."').cast(TEXT()))).toQuery()).toEqual(
      [
        'TO_JSONB(ROW($1, $2::TEXT))',
        [
          42,
          'FRED SAID "HI."'
        ]
      ]
    )
  })

  it('to_jsonb ( anyelement ) → jsonb', () => {
    expect(TO_JSON(literal('FRED SAID "HI."').cast(TEXT())).toQuery()).toEqual(
      [
        'TO_JSON($1::TEXT)',
        [
          'FRED SAID "HI."'
        ]
      ]
    )
    expect(TO_JSONB(ROW(42, literal('FRED SAID "HI."').cast(TEXT()))).toQuery()).toEqual(
      [
        'TO_JSONB(ROW($1, $2::TEXT))',
        [
          42,
          'FRED SAID "HI."'
        ]
      ]
    )
  })

  it('array_to_json ( anyarray [, boolean ] ) → json', () => {
    expect(ARRAY_TO_JSON(literal([[1, 5], [99, 100]]).cast(ARRAY(INTEGER()))).toQuery()).toEqual(
      [
        'ARRAY_TO_JSON($1::INTEGER[])',
        [
          [
            [
              1,
              5
            ],
            [
              99,
              100
            ]
          ]
        ]
      ]
    )
  })

  it('row_to_json ( record [, boolean ] ) → json', () => {
    expect(ROW_TO_JSON(ROW(1, 'FOO')).toQuery()).toEqual(
      [
        'ROW_TO_JSON(ROW($1, $2))',
        [
          1,
          'FOO'
        ]
      ]
    )
  })

  it('json_build_array ( VARIADIC "any" ) → json', () => {
    expect(JSON_BUILD_ARRAY(1, 2, 'FOO', 4, 5).toQuery()).toEqual(
      [
        'JSON_BUILD_ARRAY($1, $2, $3, $4, $5)',
        [
          1,
          2,
          'FOO',
          4,
          5
        ]
      ]
    )
  })

  it('jsonb_build_array ( VARIADIC "any" ) → jsonb', () => {
    expect(JSONB_BUILD_ARRAY(1, 2, 'FOO', 4, 5).toQuery()).toEqual(
      [
        'JSONB_BUILD_ARRAY($1, $2, $3, $4, $5)',
        [
          1,
          2,
          'FOO',
          4,
          5
        ]
      ]
    )
  })

  it('json_build_object ( VARIADIC "any" ) → json', () => {
    expect(JSON_BUILD_OBJECT('FOO', 1, 2, ROW(3, 'BAR')).toQuery()).toEqual(
      [
        'JSON_BUILD_OBJECT($1, $2, $3, ROW($4, $5))',
        [
          'FOO',
          1,
          2,
          3,
          'BAR'
        ]
      ]
    )
  })

  it('jsonb_build_object ( VARIADIC "any" ) → jsonb', () => {
    expect(JSONB_BUILD_OBJECT('FOO', 1, 2, ROW(3, 'BAR')).toQuery()).toEqual(
      [
        'JSONB_BUILD_OBJECT($1, $2, $3, ROW($4, $5))',
        [
          'FOO',
          1,
          2,
          3,
          'BAR'
        ]
      ]
    )
  })

  it('json_object ( text[] ) → json', () => {
    expect(JSON_OBJECT(['A', '1', 'B', '"DEF"', 'C', '3.5']).toQuery()).toEqual(
      [
        'JSON_OBJECT($1)',
        [
          [
            'A',
            '1',
            'B',
            '"DEF"',
            'C',
            '3.5'
          ]
        ]
      ]
    )
    expect(JSON_OBJECT([['A', '1'], ['B', '"DEF"'], ['C', '3.5']]).toQuery()).toEqual(
      [
        'JSON_OBJECT($1)',
        [
          [
            [
              'A',
              '1'
            ],
            [
              'B',
              '"DEF"'
            ],
            [
              'C',
              '3.5'
            ]
          ]
        ]
      ]
    )
  })

  it('jsonb_object ( text[] ) → jsonb', () => {
    expect(JSONB_OBJECT(['A', '1', 'B', '"DEF"', 'C', '3.5']).toQuery()).toEqual(
      [
        'JSONB_OBJECT($1)',
        [
          [
            'A',
            '1',
            'B',
            '"DEF"',
            'C',
            '3.5'
          ]
        ]
      ]
    )
    expect(JSONB_OBJECT([['A', '1'], ['B', '"DEF"'], ['C', '3.5']]).toQuery()).toEqual(
      [
        'JSONB_OBJECT($1)',
        [
          [
            [
              'A',
              '1'
            ],
            [
              'B',
              '"DEF"'
            ],
            [
              'C',
              '3.5'
            ]
          ]
        ]
      ]
    )
  })

  it('json_object ( keys text[], values text[] ) → json', () => {
    expect(JSON_OBJECT(['A', 'B'], ['1', '2']).toQuery()).toEqual(
      [
        'JSON_OBJECT($1, $2)',
        [
          [
            'A',
            'B'
          ],
          [
            '1',
            '2'
          ]
        ]
      ]
    )
  })

  it('jsonb_object ( keys text[], values text[] ) → jsonb', () => {
    expect(JSONB_OBJECT(['A', 'B'], ['1', '2']).toQuery()).toEqual(
      [
        'JSONB_OBJECT($1, $2)',
        [
          [
            'A',
            'B'
          ],
          [
            '1',
            '2'
          ]
        ]
      ]
    )
  })

  it('json_array_elements ( json ) → setof json', () => {
    expect(JSON_ARRAY_ELEMENTS('[1,true, [2,false]]').toQuery()).toEqual(
      [
        'JSON_ARRAY_ELEMENTS($1)',
        [
          '[1,true, [2,false]]'
        ]
      ]
    )
  })

  it('jsonb_array_elements ( jsonb ) → setof jsonb', () => {
    expect(JSONB_ARRAY_ELEMENTS('[1,true, [2,false]]').toQuery()).toEqual(
      [
        'JSONB_ARRAY_ELEMENTS($1)',
        [
          '[1,true, [2,false]]'
        ]
      ]
    )
  })

  it('json_array_elements_text ( json ) → setof text', () => {
    expect(JSON_ARRAY_ELEMENTS_TEXT('["FOO", "BAR"]').toQuery()).toEqual(
      [
        'JSON_ARRAY_ELEMENTS_TEXT($1)',
        [
          '["FOO", "BAR"]'
        ]
      ]
    )
  })

  it('jsonb_array_elements_text ( jsonb ) → setof text', () => {
    expect(JSONB_ARRAY_ELEMENTS_TEXT('["FOO", "BAR"]').toQuery()).toEqual(
      [
        'JSONB_ARRAY_ELEMENTS_TEXT($1)',
        [
          '["FOO", "BAR"]'
        ]
      ]
    )
  })

  it('json_array_length ( json ) → integer', () => {
    expect(JSON_ARRAY_LENGTH('[1,2,3,{"F1":1,"F2":[5,6]},4]').toQuery()).toEqual(
      [
        'JSON_ARRAY_LENGTH($1)',
        [
          '[1,2,3,{"F1":1,"F2":[5,6]},4]'
        ]
      ]
    )
  })

  it('jsonb_array_length ( jsonb ) → integer', () => {
    expect(JSONB_ARRAY_LENGTH('[1,2,3,{"F1":1,"F2":[5,6]},4]').toQuery()).toEqual(
      [
        'JSONB_ARRAY_LENGTH($1)',
        [
          '[1,2,3,{"F1":1,"F2":[5,6]},4]'
        ]
      ]
    )
  })

  it('json_each ( json ) → setof record ( key text, value json )', () => {
    expect(JSON_EACH('{"A":"FOO", "B":"BAR"}').toQuery()).toEqual(
      [
        'JSON_EACH($1)',
        [
          '{"A":"FOO", "B":"BAR"}'
        ]
      ]
    )
  })

  it('jsonb_each ( jsonb ) → setof record ( key text, value jsonb )', () => {
    expect(JSONB_EACH('{"A":"FOO", "B":"BAR"}').toQuery()).toEqual(
      [
        'JSONB_EACH($1)',
        [
          '{"A":"FOO", "B":"BAR"}'
        ]
      ]
    )
  })

  it('json_each_text ( json ) → setof record ( key text, value text )', () => {
    expect(JSON_EACH_TEXT('{"A":"FOO", "B":"BAR"}').toQuery()).toEqual(
      [
        'JSON_EACH_TEXT($1)',
        [
          '{"A":"FOO", "B":"BAR"}'
        ]
      ]
    )
  })

  it('jsonb_each_text ( jsonb ) → setof record ( key text, value text )', () => {
    expect(JSONB_EACH_TEXT('{"A":"FOO", "B":"BAR"}').toQuery()).toEqual(
      [
        'JSONB_EACH_TEXT($1)',
        [
          '{"A":"FOO", "B":"BAR"}'
        ]
      ]
    )
  })

  it('json_extract_path ( from_json json, VARIADIC path_elems text[] ) → json', () => {
    expect(JSON_EXTRACT_PATH('{"F2":{"F3":1},"F4":{"F5":99,"F6":"FOO"}}', 'F4', 'F6').toQuery()).toEqual(
      [
        'JSON_EXTRACT_PATH($1, $2, $3)',
        [
          '{"F2":{"F3":1},"F4":{"F5":99,"F6":"FOO"}}',
          'F4',
          'F6'
        ]
      ]
    )
  })

  it('jsonb_extract_path ( from_json jsonb, VARIADIC path_elems text[] ) → jsonb', () => {
    expect(JSONB_EXTRACT_PATH('{"F2":{"F3":1},"F4":{"F5":99,"F6":"FOO"}}', 'F4', 'F6').toQuery()).toEqual(
      [
        'JSONB_EXTRACT_PATH($1, $2, $3)',
        [
          '{"F2":{"F3":1},"F4":{"F5":99,"F6":"FOO"}}',
          'F4',
          'F6'
        ]
      ]
    )
  })

  it('json_extract_path_text ( from_json json, VARIADIC path_elems text[] ) → text', () => {
    expect(JSON_EXTRACT_PATH_TEXT('{"F2":{"F3":1},"F4":{"F5":99,"F6":"FOO"}}', 'F4', 'F6').toQuery()).toEqual(
      [
        'JSON_EXTRACT_PATH_TEXT($1, $2, $3)',
        [
          '{"F2":{"F3":1},"F4":{"F5":99,"F6":"FOO"}}',
          'F4',
          'F6'
        ]
      ]
    )
  })

  it('jsonb_extract_path_text ( from_json jsonb, VARIADIC path_elems text[] ) → text', () => {
    expect(JSONB_EXTRACT_PATH_TEXT('{"F2":{"F3":1},"F4":{"F5":99,"F6":"FOO"}}', 'F4', 'F6').toQuery()).toEqual(
      [
        'JSONB_EXTRACT_PATH_TEXT($1, $2, $3)',
        [
          '{"F2":{"F3":1},"F4":{"F5":99,"F6":"FOO"}}',
          'F4',
          'F6'
        ]
      ]
    )
  })

  it('json_object_keys ( json ) → setof text', () => {
    expect(JSON_OBJECT_KEYS('{"F1":"ABC","F2":{"F3":"A", "F4":"B"}}').toQuery()).toEqual(
      [
        'JSON_OBJECT_KEYS($1)',
        [
          '{"F1":"ABC","F2":{"F3":"A", "F4":"B"}}'
        ]
      ]
    )
  })

  it('jsonb_object_keys ( jsonb ) → setof text', () => {
    expect(JSONB_OBJECT_KEYS('{"F1":"ABC","F2":{"F3":"A", "F4":"B"}}').toQuery()).toEqual(
      [
        'JSONB_OBJECT_KEYS($1)',
        [
          '{"F1":"ABC","F2":{"F3":"A", "F4":"B"}}'
        ]
      ]
    )
  })

  it('json_populate_record ( base anyelement, from_json json ) → setof anyelement', () => {
    expect(JSON_POPULATE_RECORD(null, '[{"A":1,"B":2}, {"A":3,"B":4}]').toQuery()).toEqual(
      [
        'JSON_POPULATE_RECORD($1, $2)',
        [
          null,
          '[{"A":1,"B":2}, {"A":3,"B":4}]'
        ]
      ]
    )
  })

  it('jsonb_populate_record ( base anyelement, from_json jsonb ) → setof anyelement', () => {
    expect(JSONB_POPULATE_RECORD(null, '[{"A":1,"B":2}, {"A":3,"B":4}]').toQuery()).toEqual(
      [
        'JSONB_POPULATE_RECORD($1, $2)',
        [
          null,
          '[{"A":1,"B":2}, {"A":3,"B":4}]'
        ]
      ]
    )
  })

  it('json_populate_recordset ( base anyelement, from_json json ) → setof anyelement', () => {
    expect(JSON_POPULATE_RECORDSET(null, '[{"A":1,"B":2}, {"A":3,"B":4}]').toQuery()).toEqual(
      [
        'JSON_POPULATE_RECORDSET($1, $2)',
        [
          null,
          '[{"A":1,"B":2}, {"A":3,"B":4}]'
        ]
      ]
    )
  })

  it('jsonb_populate_recordset ( base anyelement, from_json jsonb ) → setof anyelement', () => {
    expect(JSONB_POPULATE_RECORDSET(null, '[{"A":1,"B":2}, {"A":3,"B":4}]').toQuery()).toEqual(
      [
        'JSONB_POPULATE_RECORDSET($1, $2)',
        [
          null,
          '[{"A":1,"B":2}, {"A":3,"B":4}]'
        ]
      ]
    )
  })

  it('json_to_record ( json ) → record', () => {
    expect(JSON_TO_RECORD('{"A":1,"B":[1,2,3],"C":[1,2,3],"E":"BAR","R": {"A": 123, "B": "A B C"}}').toQuery()).toEqual(
      [
        'JSON_TO_RECORD($1)',
        [
          '{"A":1,"B":[1,2,3],"C":[1,2,3],"E":"BAR","R": {"A": 123, "B": "A B C"}}'
        ]
      ]
    )
  })

  it('jsonb_to_record ( jsonb ) → record', () => {
    expect(JSONB_TO_RECORD('{"A":1,"B":[1,2,3],"C":[1,2,3],"E":"BAR","R": {"A": 123, "B": "A B C"}}').toQuery()).toEqual(
      [
        'JSONB_TO_RECORD($1)',
        [
          '{"A":1,"B":[1,2,3],"C":[1,2,3],"E":"BAR","R": {"A": 123, "B": "A B C"}}'
        ]
      ]
    )
  })

  it('json_to_recordset ( json ) → setof record', () => {
    expect(JSON_TO_RECORDSET('[{"A":1,"B":"FOO"}, {"A":"2","C":"BAR"}]').toQuery()).toEqual(
      [
        'JSON_TO_RECORDSET($1)',
        [
          '[{"A":1,"B":"FOO"}, {"A":"2","C":"BAR"}]'
        ]
      ]
    )
  })

  it('jsonb_to_recordset ( jsonb ) → setof record', () => {
    expect(JSONB_TO_RECORDSET('[{"A":1,"B":"FOO"}, {"A":"2","C":"BAR"}]').toQuery()).toEqual(
      [
        'JSONB_TO_RECORDSET($1)',
        [
          '[{"A":1,"B":"FOO"}, {"A":"2","C":"BAR"}]'
        ]
      ]
    )
  })

  it('jsonb_set ( target jsonb, path text[], new_value jsonb [, create_if_missing boolean ] ) → jsonb', () => {
    expect(JSONB_SET('[{"F1":1,"F2":null},2,null,3]', ['0', 'F3'], '[2,3,4]', false).toQuery()).toEqual(
      [
        'JSONB_SET($1, $2, $3, $4)',
        [
          '[{"F1":1,"F2":null},2,null,3]',
          [
            '0',
            'F3'
          ],
          '[2,3,4]',
          false
        ]
      ]
    )
    expect(JSONB_SET('[{"F1":1,"F2":null},2]', ['0', 'F3'], '[2,3,4]').toQuery()).toEqual(
      [
        'JSONB_SET($1, $2, $3)',
        [
          '[{"F1":1,"F2":null},2]',
          [
            '0',
            'F3'
          ],
          '[2,3,4]'
        ]
      ]
    )
  })

  it('jsonb_set_lax ( target jsonb, path text[], new_value jsonb [, create_if_missing boolean [, null_value_treatment text ]] ) → jsonb', () => {
    expect(JSONB_SET_LAX('[{"F1":1,"F2":null},2,null,3]', ['0', 'F3'], null).toQuery()).toEqual(
      [
        'JSONB_SET_LAX($1, $2, $3)',
        [
          '[{"F1":1,"F2":null},2,null,3]',
          [
            '0',
            'F3'
          ],
          null
        ]
      ]
    )
    expect(JSONB_SET_LAX('[{"F1":99,"F2":null},2]', ['0', 'F3'], null, true, 'RETURN_TARGET').toQuery()).toEqual(
      [
        'JSONB_SET_LAX($1, $2, $3, $4, $5)',
        [
          '[{"F1":99,"F2":null},2]',
          [
            '0',
            'F3'
          ],
          null,
          true,
          'RETURN_TARGET'
        ]
      ]
    )
  })

  it('jsonb_insert ( target jsonb, path text[], new_value jsonb [, insert_after boolean ] ) → jsonb', () => {
    expect(JSONB_INSERT('{"A": [0,1,2]}', ['A', '1'], '"NEW_VALUE"').toQuery()).toEqual(
      [
        'JSONB_INSERT($1, $2, $3)',
        [
          '{"A": [0,1,2]}',
          [
            'A',
            '1'
          ],
          '"NEW_VALUE"'
        ]
      ]
    )
    expect(JSONB_INSERT('{"A": [0,1,2]}', ['A', '1'], '"NEW_VALUE"', true).toQuery()).toEqual(
      [
        'JSONB_INSERT($1, $2, $3, $4)',
        [
          '{"A": [0,1,2]}',
          [
            'A',
            '1'
          ],
          '"NEW_VALUE"',
          true
        ]
      ]
    )
  })

  it('json_strip_nulls ( json ) → json', () => {
    expect(JSON_STRIP_NULLS('[{"F1":1, "F2":null}, 2, null, 3]').toQuery()).toEqual(
      [
        'JSON_STRIP_NULLS($1)',
        [
          '[{"F1":1, "F2":null}, 2, null, 3]'
        ]
      ]
    )
  })

  it('jsonb_strip_nulls ( jsonb ) → jsonb', () => {
    expect(JSONB_STRIP_NULLS('[{"F1":1, "F2":null}, 2, null, 3]').toQuery()).toEqual(
      [
        'JSONB_STRIP_NULLS($1)',
        [
          '[{"F1":1, "F2":null}, 2, null, 3]'
        ]
      ]
    )
  })

  it('jsonb_path_exists ( target jsonb, path jsonpath [, vars jsonb [, silent boolean ]] ) → boolean', () => {
    expect(JSONB_PATH_EXISTS('{"A":[1,2,3,4,5]}', '$.A[*] ? (@ >= $MIN && @ <= $MAX)', '{"MIN":2, "MAX":4}').toQuery()).toEqual(
      [
        'JSONB_PATH_EXISTS($1, $2, $3)',
        [
          '{"A":[1,2,3,4,5]}',
          '$.A[*] ? (@ >= $MIN && @ <= $MAX)',
          '{"MIN":2, "MAX":4}'
        ]
      ]
    )
  })

  it('jsonb_path_match ( target jsonb, path jsonpath [, vars jsonb [, silent boolean ]] ) → boolean', () => {
    expect(JSONB_PATH_MATCH('{"A":[1,2,3,4,5]}', 'EXISTS($.A[*] ? (@ >= $MIN && @ <= $MAX))', '{"MIN":2, "MAX":4}').toQuery()).toEqual(
      [
        'JSONB_PATH_MATCH($1, $2, $3)',
        [
          '{"A":[1,2,3,4,5]}',
          'EXISTS($.A[*] ? (@ >= $MIN && @ <= $MAX))',
          '{"MIN":2, "MAX":4}'
        ]
      ]
    )
  })

  it('jsonb_path_query ( target jsonb, path jsonpath [, vars jsonb [, silent boolean ]] ) → setof jsonb', () => {
    expect(JSONB_PATH_QUERY('{"A":[1,2,3,4,5]}', '$.A[*] ? (@ >= $MIN && @ <= $MAX)', '{"MIN":2, "MAX":4}').toQuery()).toEqual(
      [
        'JSONB_PATH_QUERY($1, $2, $3)',
        [
          '{"A":[1,2,3,4,5]}',
          '$.A[*] ? (@ >= $MIN && @ <= $MAX)',
          '{"MIN":2, "MAX":4}'
        ]
      ]
    )
  })

  it('jsonb_path_query_array ( target jsonb, path jsonpath [, vars jsonb [, silent boolean ]] ) → jsonb', () => {
    expect(JSONB_PATH_QUERY_ARRAY('{"A":[1,2,3,4,5]}', '$.A[*] ? (@ >= $MIN && @ <= $MAX)', '{"MIN":2, "MAX":4}').toQuery()).toEqual(
      [
        'JSONB_PATH_QUERY_ARRAY($1, $2, $3)',
        [
          '{"A":[1,2,3,4,5]}',
          '$.A[*] ? (@ >= $MIN && @ <= $MAX)',
          '{"MIN":2, "MAX":4}'
        ]
      ]
    )
  })

  it('jsonb_path_query_first ( target jsonb, path jsonpath [, vars jsonb [, silent boolean ]] ) → jsonb', () => {
    expect(JSONB_PATH_QUERY_FIRST('{"A":[1,2,3,4,5]}', '$.A[*] ? (@ >= $MIN && @ <= $MAX)', '{"MIN":2, "MAX":4}').toQuery()).toEqual(
      [
        'JSONB_PATH_QUERY_FIRST($1, $2, $3)',
        [
          '{"A":[1,2,3,4,5]}',
          '$.A[*] ? (@ >= $MIN && @ <= $MAX)',
          '{"MIN":2, "MAX":4}'
        ]
      ]
    )
  })

  it('jsonb_path_exists_tz ( target jsonb, path jsonpath [, vars jsonb [, silent boolean ]] ) → boolean', () => {
    expect(JSONB_PATH_EXISTS_TZ('["2015-08-01 12:00:00 -05"]', '$[*] ? (@.DATETIME() < "2015-08-02".DATETIME())').toQuery()).toEqual(
      [
        'JSONB_PATH_EXISTS_TZ($1, $2)',
        [
          '["2015-08-01 12:00:00 -05"]',
          '$[*] ? (@.DATETIME() < "2015-08-02".DATETIME())'
        ]
      ]
    )
  })

  it('jsonb_path_match_tz ( target jsonb, path jsonpath [, vars jsonb [, silent boolean ]] ) → boolean', () => {
    expect(JSONB_PATH_MATCH_TZ('["2015-08-01 12:00:00 -05"]', '$[*] ? (@.DATETIME() < "2015-08-02".DATETIME())').toQuery()).toEqual(
      [
        'JSONB_PATH_MATCH_TZ($1, $2)',
        [
          '["2015-08-01 12:00:00 -05"]',
          '$[*] ? (@.DATETIME() < "2015-08-02".DATETIME())'
        ]
      ]
    )
  })

  it('jsonb_path_query_tz ( target jsonb, path jsonpath [, vars jsonb [, silent boolean ]] ) → setof jsonb', () => {
    expect(JSONB_PATH_QUERY_TZ('["2015-08-01 12:00:00 -05"]', '$[*] ? (@.DATETIME() < "2015-08-02".DATETIME())').toQuery()).toEqual(
      [
        'JSONB_PATH_QUERY_TZ($1, $2)',
        [
          '["2015-08-01 12:00:00 -05"]',
          '$[*] ? (@.DATETIME() < "2015-08-02".DATETIME())'
        ]
      ]
    )
  })

  it('jsonb_path_query_array_tz ( target jsonb, path jsonpath [, vars jsonb [, silent boolean ]] ) → jsonb', () => {
    expect(JSONB_PATH_QUERY_ARRAY_TZ('["2015-08-01 12:00:00 -05"]', '$[*] ? (@.DATETIME() < "2015-08-02".DATETIME())').toQuery()).toEqual(
      [
        'JSONB_PATH_QUERY_ARRAY_TZ($1, $2)',
        [
          '["2015-08-01 12:00:00 -05"]',
          '$[*] ? (@.DATETIME() < "2015-08-02".DATETIME())'
        ]
      ]
    )
  })

  it('jsonb_path_query_first_tz ( target jsonb, path jsonpath [, vars jsonb [, silent boolean ]] ) → jsonb', () => {
    expect(JSONB_PATH_QUERY_FIRST_TZ('["2015-08-01 12:00:00 -05"]', '$[*] ? (@.DATETIME() < "2015-08-02".DATETIME())').toQuery()).toEqual(
      [
        'JSONB_PATH_QUERY_FIRST_TZ($1, $2)',
        [
          '["2015-08-01 12:00:00 -05"]',
          '$[*] ? (@.DATETIME() < "2015-08-02".DATETIME())'
        ]
      ]
    )
  })

  it('jsonb_pretty ( jsonb ) → text', () => {
    expect(JSONB_PRETTY('[{"F1":1,"F2":null}, 2]').toQuery()).toEqual(
      [
        'JSONB_PRETTY($1)',
        [
          '[{"F1":1,"F2":null}, 2]'
        ]
      ]
    )
  })

  it('json_typeof ( json ) → text', () => {
    expect(JSONB_TYPEOF('-123.4').toQuery()).toEqual(
      [
        'JSONB_TYPEOF($1)',
        [
          '-123.4'
        ]
      ]
    )
  })

  it('jsonb_typeof ( jsonb ) → text', () => {
    expect(JSON_TYPEOF('-123.4').toQuery()).toEqual(
      [
        'JSON_TYPEOF($1)',
        [
          '-123.4'
        ]
      ]
    )
    expect(JSONB_TYPEOF(literal(null).cast(JSONB())).toQuery()).toEqual(
      [
        'JSONB_TYPEOF($1::JSONB)',
        [
          null
        ]
      ]
    )
  })
})
