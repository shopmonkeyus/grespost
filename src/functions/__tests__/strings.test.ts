import { literal } from '../../expressions'
import { CHAR } from '../../types'
import { ASCII, BIT_LENGTH, BTRIM, CHAR_LENGTH, CHR, CONCAT, CONCAT_WS, FORMAT, INITCAP, LEFT, LENGTH, LOWER, LPAD, LTRIM, MD5, NORMALIZE, OCTET_LENGTH, OVERLAY, PARSE_IDENT, PG_CLIENT_ENCODING, POSITION, QUOTE_IDENT, QUOTE_LITERAL, QUOTE_NULLABLE, REGEXP_MATCH, REGEXP_MATCHES, REGEXP_REPLACE, REGEXP_SPLIT_TO_ARRAY, REGEXP_SPLIT_TO_TABLE, REPEAT, REPLACE, REVERSE, RIGHT, RPAD, RTRIM, SPLIT_PART, STARTS_WITH, STRPOS, SUBSTR, SUBSTRING, TO_ASCII, TO_CHAR, TO_HEX, TRANSLATE, TRIM, UPPER } from '../string'

describe('string functions', () => {
  it('bit_length ( text ) → integer', () => {
    expect(BIT_LENGTH('JOSE').toQuery()).toEqual(
      [
        'BIT_LENGTH($1)',
        [
          'JOSE'
        ]
      ]
    )
  })

  it('char_length ( text ) → integer', () => {
    expect(CHAR_LENGTH('JOSÉ').toQuery()).toEqual(
      [
        'CHAR_LENGTH($1)',
        [
          'JOSÉ'
        ]
      ]
    )
  })

  it('character_length ( text ) → integer', () => {
    expect(CHAR_LENGTH('JOSÉ').toQuery()).toEqual(
      [
        'CHAR_LENGTH($1)',
        [
          'JOSÉ'
        ]
      ]
    )
  })

  it('lower ( text ) → text', () => {
    expect(LOWER('TOM').toQuery()).toEqual(
      [
        'LOWER($1)',
        [
          'TOM'
        ]
      ]
    )
  })

  it('normalize ( text [, form ] ) → text', () => {
    expect(NORMALIZE('\\0061\\0308BC', 'NFC').toQuery()).toEqual(
      [
        'NORMALIZE($1, NFC)',
        [
          '\\0061\\0308BC'
        ]
      ]
    )
    expect(NORMALIZE('\\0061\\0308BC').toQuery()).toEqual(
      [
        'NORMALIZE($1)',
        [
          '\\0061\\0308BC'
        ]
      ]
    )
  })

  it('octet_length ( text ) → integer', () => {
    expect(OCTET_LENGTH('JOSÉ').toQuery()).toEqual(
      [
        'OCTET_LENGTH($1)',
        [
          'JOSÉ'
        ]
      ]
    )
  })

  it('octet_length ( character ) → integer', () => {
    expect(OCTET_LENGTH(literal('ABC ').cast(CHAR(4))).toQuery()).toEqual(
      [
        'OCTET_LENGTH($1::CHAR($2))',
        [
          'ABC ',
          4
        ]
      ]
    )
  })

  it('overlay ( string text PLACING newsubstring text FROM start integer [ FOR count integer ] ) → text', () => {
    expect(OVERLAY('TXXXXAS', 'HOM', 2, 0).toQuery()).toEqual(
      [
        'OVERLAY($1 PLACING $2 FROM $3 FOR $4)',
        [
          'TXXXXAS',
          'HOM',
          2,
          0
        ]
      ]
    )
    expect(OVERLAY('TXXXXAS', 'HOM', 2).toQuery()).toEqual(
      [
        'OVERLAY($1 PLACING $2 FROM $3)',
        [
          'TXXXXAS',
          'HOM',
          2
        ]
      ]
    )
  })

  it('position ( substring text IN string text ) → integer', () => {
    expect(POSITION('OM', 'THOMAS').toQuery()).toEqual(
      [
        'POSITION($1 IN $2)',
        [
          'OM',
          'THOMAS'
        ]
      ]
    )
  })

  it('substring ( string text [ FROM start integer ] [ FOR count integer ] ) → text', () => {
    expect(SUBSTRING('THOMAS', 2, 3).toQuery()).toEqual(
      [
        'SUBSTRING($1 FROM $2 FOR $3)',
        [
          'THOMAS',
          2,
          3
        ]
      ]
    )
    expect(SUBSTRING('THOMAS', 3).toQuery()).toEqual(
      [
        'SUBSTRING($1 FROM $2)',
        [
          'THOMAS',
          3
        ]
      ]
    )
    expect(SUBSTRING('THOMAS').toQuery()).toEqual(
      [
        'SUBSTRING($1)',
        [
          'THOMAS'
        ]
      ]
    )
  })

  it('substring ( string text FROM pattern text ) → text', () => {
    expect(SUBSTRING('THOMAS', '...$').toQuery()).toEqual(
      [
        'SUBSTRING($1 FROM $2)',
        [
          'THOMAS',
          '...$'
        ]
      ]
    )
  })

  it('substring ( string text FROM pattern text FOR escape text ) → text', () => {
    expect(SUBSTRING('THOMAS', '%#"O_A#"_', '#').toQuery()).toEqual(
      [
        'SUBSTRING($1 FROM $2 FOR $3)',
        [
          'THOMAS',
          '%#"O_A#"_',
          '#'
        ]
      ]
    )
  })

  it('trim ( [ LEADING | TRAILING | BOTH ] [ characters text ] FROM string text ) → text', () => {
    expect(TRIM('XYZ', 'YXTOMXX', 'BOTH').toQuery()).toEqual(
      [
        'TRIM(BOTH $1 FROM $2)',
        [
          'YXTOMXX',
          'XYZ'
        ]
      ]
    )
    expect(TRIM('XYZ').toQuery()).toEqual(
      ['TRIM(FROM $1)', ['XYZ']]
    )
  })

  it('trim ( [ LEADING | TRAILING | BOTH ] [ FROM ] string text [, characters text ] ) → text', () => {
    expect(TRIM('YXTOMXX', 'XYZ', 'BOTH').toQuery()).toEqual(
      [
        'TRIM(BOTH $1 FROM $2)',
        [
          'XYZ',
          'YXTOMXX'
        ]
      ]
    )
  })

  it('upper ( text ) → text', () => {
    expect(UPPER('TOM').toQuery()).toEqual(
      [
        'UPPER($1)',
        [
          'TOM'
        ]
      ]
    )
  })

  it('ascii ( text ) → integer', () => {
    expect(ASCII('X').toQuery()).toEqual(
      [
        'ASCII($1)',
        [
          'X'
        ]
      ]
    )
  })

  it('btrim ( string text [, characters text ] ) → text', () => {
    expect(BTRIM('XYXTRIMYYX', 'XYZ').toQuery()).toEqual(
      [
        'BTRIM($1, $2)',
        [
          'XYXTRIMYYX',
          'XYZ'
        ]
      ]
    )
  })

  it('chr ( integer ) → text', () => {
    expect(CHR(65).toQuery()).toEqual(
      [
        'CHR($1)',
        [
          65
        ]
      ]
    )
  })

  it('concat ( val1 "any" [, val2 "any" [, ...] ] ) → text', () => {
    expect(CONCAT('ABCDE', 2, null, 22).toQuery()).toEqual(
      [
        'CONCAT($1, $2, $3, $4)',
        [
          'ABCDE',
          2,
          null,
          22
        ]
      ]
    )
  })

  it('concat_ws ( sep text, val1 "any" [, val2 "any" [, ...] ] ) → text', () => {
    expect(CONCAT_WS(',', 'ABCDE', 2, null, 22).toQuery()).toEqual(
      [
        'CONCAT_WS($1, $2, $3, $4, $5)',
        [
          ',',
          'ABCDE',
          2,
          null,
          22
        ]
      ]
    )
  })

  it('format ( formatstr text [, formatarg "any" [, ...] ] ) → text', () => {
    expect(FORMAT('HELLO %S, %1$S', 'WORLD').toQuery()).toEqual(
      [
        'FORMAT($1, $2)',
        [
          'HELLO %S, %1$S',
          'WORLD'
        ]
      ]
    )
  })

  it('initcap ( text ) → text', () => {
    expect(INITCAP('HI THOMAS').toQuery()).toEqual(
      [
        'INITCAP($1)',
        [
          'HI THOMAS'
        ]
      ]
    )
  })

  it('left ( string text, n integer ) → text', () => {
    expect(LEFT('ABCDE', 2).toQuery()).toEqual(
      [
        'LEFT($1, $2)',
        [
          'ABCDE',
          2
        ]
      ]
    )
  })

  it('length ( text ) → integer', () => {
    expect(LENGTH('JOSE').toQuery()).toEqual(
      [
        'LENGTH($1)',
        [
          'JOSE'
        ]
      ]
    )
  })

  it('lpad ( string text, length integer [, fill text ] ) → text', () => {
    expect(LPAD('HI', 5, 'XY').toQuery()).toEqual(
      [
        'LPAD($1, $2, $3)',
        [
          'HI',
          5,
          'XY'
        ]
      ]
    )
  })

  it('ltrim ( string text [, characters text ] ) → text', () => {
    expect(LTRIM('ZZZYTEST', 'XYZ').toQuery()).toEqual(
      [
        'LTRIM($1, $2)',
        [
          'ZZZYTEST',
          'XYZ'
        ]
      ]
    )
  })

  it('md5 ( text ) → text', () => {
    expect(MD5('ABC').toQuery()).toEqual(
      [
        'MD5($1)',
        [
          'ABC'
        ]
      ]
    )
  })

  it('parse_ident ( qualified_identifier text [, strict_mode boolean DEFAULT true ] ) → text[]', () => {
    expect(PARSE_IDENT('"SOMESCHEMA".SOMETABLE').toQuery()).toEqual(
      [
        'PARSE_IDENT($1)',
        [
          '"SOMESCHEMA".SOMETABLE'
        ]
      ]
    )
  })

  it('pg_client_encoding ( ) → name', () => {
    expect(PG_CLIENT_ENCODING().toQuery()).toEqual(
      [
        'PG_CLIENT_ENCODING()',
        []
      ]
    )
  })

  it('quote_ident ( text ) → text', () => {
    expect(QUOTE_IDENT('FOO BAR').toQuery()).toEqual(
      [
        'QUOTE_IDENT($1)',
        [
          'FOO BAR'
        ]
      ]
    )
  })

  it('quote_literal ( text ) → text', () => {
    expect(QUOTE_LITERAL('O\'REILLY').toQuery()).toEqual(
      [
        'QUOTE_LITERAL($1)',
        [
          "O'REILLY"
        ]
      ]
    )
  })

  it('quote_literal ( anyelement ) → text', () => {
    expect(QUOTE_LITERAL(42.5).toQuery()).toEqual(
      [
        'QUOTE_LITERAL($1)',
        [
          42.5
        ]
      ]
    )
  })

  it('quote_nullable ( text ) → text', () => {
    expect(QUOTE_NULLABLE(null).toQuery()).toEqual(
      [
        'QUOTE_NULLABLE($1)',
        [
          null
        ]
      ]
    )
  })

  it('quote_nullable ( anyelement ) → text', () => {
    expect(QUOTE_NULLABLE(42.5).toQuery()).toEqual(
      [
        'QUOTE_NULLABLE($1)',
        [
          42.5
        ]
      ]
    )
  })

  it('regexp_match ( string text, pattern text [, flags text ] ) → text[]', () => {
    expect(REGEXP_MATCH('FOOBARBEQUEBAZ', '(BAR)(BEQUE)').toQuery()).toEqual(
      [
        'REGEXP_MATCH($1, $2)',
        [
          'FOOBARBEQUEBAZ',
          '(BAR)(BEQUE)'
        ]
      ]
    )
  })

  it('regexp_matches ( string text, pattern text [, flags text ] ) → setof text[]', () => {
    expect(REGEXP_MATCHES('FOOBARBEQUEBAZ', 'BA.', 'G').toQuery()).toEqual(
      [
        'REGEXP_MATCHES($1, $2, $3)',
        [
          'FOOBARBEQUEBAZ',
          'BA.',
          'G'
        ]
      ]
    )
  })

  it('regexp_replace ( string text, pattern text, replacement text [, flags text ] ) → text', () => {
    expect(REGEXP_REPLACE('THOMAS', '.[MN]A.', 'M').toQuery()).toEqual(
      [
        'REGEXP_REPLACE($1, $2, $3)',
        [
          'THOMAS',
          '.[MN]A.',
          'M'
        ]
      ]
    )
  })

  it('regexp_split_to_array ( string text, pattern text [, flags text ] ) → text[]', () => {
    expect(REGEXP_SPLIT_TO_ARRAY('HELLO WORLD', '\\S+').toQuery()).toEqual(
      [
        'REGEXP_SPLIT_TO_ARRAY($1, $2)',
        [
          'HELLO WORLD',
          '\\S+'
        ]
      ]
    )
  })

  it('regexp_split_to_table ( string text, pattern text [, flags text ] ) → setof text', () => {
    expect(REGEXP_SPLIT_TO_TABLE('HELLO WORLD', '\\S+').toQuery()).toEqual(
      [
        'REGEXP_SPLIT_TO_TABLE($1, $2)',
        [
          'HELLO WORLD',
          '\\S+'
        ]
      ]
    )
  })

  it('repeat ( string text, number integer ) → text', () => {
    expect(REPEAT('PG', 4).toQuery()).toEqual(
      [
        'REPEAT($1, $2)',
        [
          'PG',
          4
        ]
      ]
    )
  })

  it('replace ( string text, from text, to text ) → text', () => {
    expect(REPLACE('ABCDEFABCDEF', 'CD', 'XX').toQuery()).toEqual(
      [
        'REPLACE($1, $2, $3)',
        [
          'ABCDEFABCDEF',
          'CD',
          'XX'
        ]
      ]
    )
  })

  it('reverse ( text ) → text', () => {
    expect(REVERSE('ABCDE').toQuery()).toEqual(
      [
        'REVERSE($1)',
        [
          'ABCDE'
        ]
      ]
    )
  })

  it('right ( string text, n integer ) → text', () => {
    expect(RIGHT('ABCDE', 2).toQuery()).toEqual(
      [
        'RIGHT($1, $2)',
        [
          'ABCDE',
          2
        ]
      ]
    )
  })

  it('rpad ( string text, length integer [, fill text ] ) → text', () => {
    expect(RPAD('HI', 5, 'XY').toQuery()).toEqual(
      [
        'RPAD($1, $2, $3)',
        [
          'HI',
          5,
          'XY'
        ]
      ]
    )
  })

  it('rtrim ( string text [, characters text ] ) → text', () => {
    expect(RTRIM('TESTXXZX', 'XYZ').toQuery()).toEqual(
      [
        'RTRIM($1, $2)',
        [
          'TESTXXZX',
          'XYZ'
        ]
      ]
    )
  })

  it('split_part ( string text, delimiter text, n integer ) → text', () => {
    expect(SPLIT_PART('ABC~@~DEF~@~GHI', '~@~', 2).toQuery()).toEqual(
      [
        'SPLIT_PART($1, $2, $3)',
        [
          'ABC~@~DEF~@~GHI',
          '~@~',
          2
        ]
      ]
    )
  })

  it('strpos ( string text, substring text ) → integer', () => {
    expect(STRPOS('HIGH', 'IG').toQuery()).toEqual(
      [
        'STRPOS($1, $2)',
        [
          'HIGH',
          'IG'
        ]
      ]
    )
  })

  it('substr ( string text, start integer [, count integer ] ) → text', () => {
    expect(SUBSTR('ALPHABET', 3).toQuery()).toEqual(
      [
        'SUBSTR($1, $2)',
        [
          'ALPHABET',
          3
        ]
      ]
    )
    expect(SUBSTR('ALPHABET', 3, 2).toQuery()).toEqual(
      [
        'SUBSTR($1, $2, $3)',
        [
          'ALPHABET',
          3,
          2
        ]
      ]
    )
  })

  it('starts_with ( string text, prefix text ) → boolean', () => {
    expect(STARTS_WITH('ALPHABET', 'ALPH').toQuery()).toEqual(
      [
        'STARTS_WITH($1, $2)',
        [
          'ALPHABET',
          'ALPH'
        ]
      ]
    )
  })

  it('to_ascii ( string text ) → text', () => {
    expect(TO_ASCII('KARÉL').toQuery()).toEqual(
      [
        'TO_ASCII($1)',
        [
          'KARÉL'
        ]
      ]
    )
  })

  it('to_ascii ( string text, encoding name ) → text', () => {
    expect(TO_ASCII('KARÉL').toQuery()).toEqual(
      [
        'TO_ASCII($1)',
        [
          'KARÉL'
        ]
      ]
    )
  })

  it('to_ascii ( string text, encoding integer ) → text', () => {
    expect(TO_ASCII('KARÉL').toQuery()).toEqual(
      [
        'TO_ASCII($1)',
        [
          'KARÉL'
        ]
      ]
    )
  })

  it('to_hex ( integer ) → text', () => {
    expect(TO_HEX(2147483647).toQuery()).toEqual(
      [
        'TO_HEX($1)',
        [
          2147483647
        ]
      ]
    )
  })

  it('to_hex ( bigint ) → text', () => {
    expect(TO_HEX(2147483647).toQuery()).toEqual(
      [
        'TO_HEX($1)',
        [
          2147483647
        ]
      ]
    )
  })

  it('translate ( string text, from text, to text ) → text', () => {
    expect(TRANSLATE('12345', '143', 'AX').toQuery()).toEqual(
      [
        'TRANSLATE($1, $2, $3)',
        [
          '12345',
          '143',
          'AX'
        ]
      ]
    )
  })

  it('TO_CHAR', () => {
    expect(TO_CHAR('123', '321').toQuery()).toEqual(['TO_CHAR($1, $2)', ['123', '321']])
  })
})
