import { Expression, expression } from '../expressions'
import { sql, sv } from '../template'
import { keyword } from '../template/keyword'
import {
  ArrayType,
  BitArg,
  BooleanType,
  ByteaArg,
  IntegerType,
  CharacterArg,
  TextType,
  BitType,
  MathArg,
  IntegerArg,
  TSVectorArg,
  BooleanArg,
  BigintArg,
  TimestampArg,
  IntervalArg,
  ByteaType,
  UUIDType
} from '../types'

export function GEN_RANDOM_UUID (): Expression<UUIDType> {
  return expression`GEN_RANDOM_UUID()`
}

export function BIT_LENGTH (arg: CharacterArg | ByteaArg | BitArg): Expression<IntegerType> {
  return expression`BIT_LENGTH(${arg})`
}

export function CHAR_LENGTH (arg: CharacterArg): Expression<IntegerType> {
  return expression`CHAR_LENGTH(${arg})`
}

export function LOWER (arg: CharacterArg): Expression<TextType> {
  return expression`LOWER(${arg})`
}

/**
 * @description Converts the string to the specified Unicode normalization form.
 * The optional form key word specifies the form: NFC (the default), NFD, NFKC, or NFKD.
 * This function can only be used when the server encoding is UTF8.
 */
export function NORMALIZE (arg: CharacterArg, form?: 'NFC' | 'NFD' | 'NFKC' | 'NFKD'): Expression<TextType> {
  const formkw = form ? sql`, ${keyword(form, ['NFC', 'NFD', 'NFKC', 'NFKD'])}` : sql``
  return expression`NORMALIZE(${arg}${formkw})`
}

export function OCTET_LENGTH (arg: CharacterArg | ByteaArg | BitArg): Expression<IntegerType> {
  return expression`OCTET_LENGTH(${arg})`
}

export function OVERLAY (str: CharacterArg, repl: CharacterArg, fromStart: IntegerArg, forCount?: IntegerArg): Expression<TextType>
export function OVERLAY (str: ByteaArg, repl: ByteaArg, fromStart: IntegerArg, forCount?: IntegerArg): Expression<ByteaType>
export function OVERLAY (str: BitArg, repl: BitArg, fromStart: IntegerArg, forCount?: IntegerArg): Expression<BitType>
export function OVERLAY (
  str: CharacterArg | ByteaArg | BitArg,
  repl: CharacterArg | ByteaArg | BitArg,
  fromStart: IntegerArg,
  forCount?: IntegerArg
): Expression<TextType> | Expression<ByteaType> | Expression<BitType> {
  return expression`OVERLAY(${str} PLACING ${repl} FROM ${fromStart}${forCount !== undefined ? sql` FOR ${forCount}` : sql``})`
}

export function POSITION (str: CharacterArg, search: CharacterArg): Expression<IntegerType>
export function POSITION (str: ByteaArg, search: ByteaArg): Expression<IntegerType>
export function POSITION (str: BitArg, search: BitArg): Expression<IntegerType>
export function POSITION (str: CharacterArg | ByteaArg | BitArg, search: CharacterArg | ByteaArg | BitArg): Expression<IntegerType> {
  return expression`POSITION(${str} IN ${search})`
}

export function SUBSTRING (str: CharacterArg, fromStart: IntegerArg, forCount?: IntegerArg): Expression<TextType>
export function SUBSTRING (str: ByteaArg, fromStart: IntegerArg, forCount?: IntegerArg): Expression<ByteaType>
export function SUBSTRING (str: BitArg, fromStart?: IntegerArg, forCount?: IntegerArg): Expression<BitType>
export function SUBSTRING (str: CharacterArg, pattern: CharacterArg, forEscape?: CharacterArg): Expression<TextType>
export function SUBSTRING (
  str: CharacterArg | ByteaArg | BitArg,
  from?: CharacterArg | IntegerArg,
  forr?: CharacterArg | IntegerArg
): Expression<TextType> | Expression<ByteaType> | Expression<BitType> {
  const FOR = forr !== undefined ? sql` FOR ${forr}` : sql``
  const FROM = from !== undefined ? sql` FROM ${from}${FOR}` : sql``
  return expression`SUBSTRING(${str}${FROM})`
}

export function TRIM (from: ByteaArg, chars: ByteaArg, type?: 'BOTH'): Expression<ByteaType>
export function TRIM (from: CharacterArg, chars?: CharacterArg, type?: 'LEADING' | 'TRAILING' | 'BOTH'): Expression<TextType>
export function TRIM (from: CharacterArg | ByteaArg, chars?: CharacterArg | ByteaArg, type?: 'LEADING' | 'TRAILING' | 'BOTH'): Expression<TextType> | Expression<ByteaType> {
  const TYPE = type !== undefined ? sql`${keyword(type, ['LEADING', 'TRAILING', 'BOTH'])} ` : sql``
  const CHARS = chars !== undefined ? sql`${chars} ` : sql``
  return expression`TRIM(${TYPE}${CHARS}FROM ${from})`
}

export function UPPER (arg: CharacterArg): Expression<TextType> {
  return expression`UPPER(${arg})`
}

export function ASCII (arg: CharacterArg): Expression<IntegerType> {
  return expression`ASCII(${arg})`
}

export function BTRIM (str: CharacterArg, chars?: CharacterArg): Expression<TextType>
export function BTRIM (str: ByteaArg, chars?: ByteaArg): Expression<ByteaType>
export function BTRIM (str: CharacterArg | ByteaArg, chars?: CharacterArg | ByteaArg): Expression<TextType> | Expression<ByteaType> {
  return expression`BTRIM(${sv([...arguments])})`
}

export function CHR (code: IntegerArg): Expression<TextType> {
  return expression`CHR(${sv([...arguments])})`
}

export function CONCAT (...args: any[]): Expression<TextType> {
  return expression`CONCAT(${sv([...args])})`
}

export function CONCAT_WS (separator: CharacterArg, ...args: any[]): Expression<TextType> {
  return expression`CONCAT_WS(${separator}, ${sv([...args])})`
}

export function FORMAT (format: CharacterArg, ...args: any[]): Expression<TextType> {
  return expression`FORMAT(${format}, ${sv([...args])})`
}

export function INITCAP (arg: CharacterArg): Expression<TextType> {
  return expression`INITCAP(${arg})`
}

export function LEFT (str: CharacterArg, count: IntegerArg): Expression<TextType> {
  return expression`LEFT(${str}, ${count})`
}

export function LENGTH (arg: CharacterArg | TSVectorArg | BitArg): Expression<IntegerType>
export function LENGTH (arg: ByteaArg, encoding?: CharacterArg): Expression<IntegerType>
export function LENGTH (arg: CharacterArg | ByteaArg | BitArg | TSVectorArg, encoding?: CharacterArg): Expression<IntegerType> {
  return expression`LENGTH(${sv([...arguments])})`
}

export function LPAD (str: CharacterArg, count: IntegerArg, fill?: CharacterArg): Expression<TextType> {
  return expression`LPAD(${sv([...arguments])})`
}

export function LTRIM (str: CharacterArg, chars?: CharacterArg): Expression<TextType> {
  return expression`LTRIM(${sv([...arguments])})`
}

export function MD5 (arg: CharacterArg | ByteaArg): Expression<TextType> {
  return expression`MD5(${arg})`
}

export function PARSE_IDENT (arg: CharacterArg, strict?: BooleanArg): Expression<ArrayType<TextType>> {
  return expression`PARSE_IDENT(${sv([...arguments])})`
}

export function PG_CLIENT_ENCODING (): Expression<TextType> {
  return expression`PG_CLIENT_ENCODING()`
}

export function QUOTE_IDENT (arg: CharacterArg): Expression<TextType> {
  return expression`QUOTE_IDENT(${arg})`
}

export function QUOTE_LITERAL (arg: any): Expression<TextType> {
  return expression`QUOTE_LITERAL(${arg})`
}

export function QUOTE_NULLABLE (arg: any): Expression<TextType> {
  return expression`QUOTE_NULLABLE(${arg})`
}

export function REGEXP_MATCH (str: CharacterArg, regexp: CharacterArg, flags?: CharacterArg): Expression<ArrayType<TextType>> {
  return expression`REGEXP_MATCH(${sv([...arguments])})`
}

export function REGEXP_MATCHES (str: CharacterArg, regexp: CharacterArg, flags?: CharacterArg): Expression<ArrayType<TextType>> {
  return expression`REGEXP_MATCHES(${sv([...arguments])})`
}

export function REGEXP_REPLACE (str: CharacterArg, regexp: CharacterArg, replacement: CharacterArg, flags?: CharacterArg): Expression<TextType> {
  return expression`REGEXP_REPLACE(${sv([...arguments])})`
}

export function REGEXP_SPLIT_TO_ARRAY (str: CharacterArg, regexp: CharacterArg, flags?: CharacterArg): Expression<ArrayType<TextType>> {
  return expression`REGEXP_SPLIT_TO_ARRAY(${sv([...arguments])})`
}

export function REGEXP_SPLIT_TO_TABLE (str: CharacterArg, regexp: CharacterArg, flags?: CharacterArg): Expression<TextType> {
  return expression`REGEXP_SPLIT_TO_TABLE(${sv([...arguments])})`
}

export function REPEAT (str: CharacterArg, count: IntegerArg): Expression<TextType> {
  return expression`REPEAT(${sv([...arguments])})`
}

export function REPLACE (str: CharacterArg, from: CharacterArg, to: CharacterArg): Expression<TextType> {
  return expression`REPLACE(${sv([...arguments])})`
}

export function REVERSE (str: CharacterArg): Expression<TextType> {
  return expression`REVERSE(${sv([...arguments])})`
}

export function RIGHT (str: CharacterArg, count: IntegerArg): Expression<TextType> {
  return expression`RIGHT(${sv([...arguments])})`
}

export function RPAD (str: CharacterArg, count: IntegerArg, pad?: CharacterArg): Expression<TextType> {
  return expression`RPAD(${sv([...arguments])})`
}

export function RTRIM (str: CharacterArg, chars?: CharacterArg): Expression<TextType> {
  return expression`RTRIM(${sv([...arguments])})`
}

export function SPLIT_PART (str: CharacterArg, separator: CharacterArg, limit: IntegerArg): Expression<TextType> {
  return expression`SPLIT_PART(${sv([...arguments])})`
}

export function STRPOS (str: CharacterArg, find: CharacterArg): Expression<IntegerType> {
  return expression`STRPOS(${sv([...arguments])})`
}

export function SUBSTR (str: CharacterArg, start: IntegerArg, length?: IntegerArg): Expression<TextType>
export function SUBSTR (str: ByteaArg, start: IntegerArg, length?: IntegerArg): Expression<ByteaType>
export function SUBSTR (str: CharacterArg | ByteaArg, start: IntegerArg, length?: IntegerArg): Expression<TextType> | Expression<ByteaType> {
  return expression`SUBSTR(${sv([...arguments])})`
}

export function STARTS_WITH (str: CharacterArg, prefix: CharacterArg): Expression<BooleanType> {
  return expression`STARTS_WITH(${sv([...arguments])})`
}

/**
 * @description Converts string to ASCII from another encoding, which may be identified by name or number.
 * If encoding is omitted the database encoding is assumed (which in practice is the only useful case).
 * The conversion consists primarily of dropping accents.
 * Conversion is only supported from LATIN1, LATIN2, LATIN9, and WIN1250 encodings.
 * (See the unaccent module for another, more flexible solution.)
 */
export function TO_ASCII (str: CharacterArg, encoding?: IntegerArg): Expression<TextType> {
  return expression`TO_ASCII(${sv([...arguments])})`
}

export function TO_HEX (str: BigintArg): Expression<TextType> {
  return expression`TO_HEX(${sv([...arguments])})`
}

export function TRANSLATE (str: CharacterArg, from: CharacterArg, to: CharacterArg): Expression<TextType> {
  return expression`TRANSLATE(${sv([...arguments])})`
}

export function TO_CHAR (from: TimestampArg, to: CharacterArg): Expression<TextType>
export function TO_CHAR (from: IntervalArg, to: CharacterArg): Expression<TextType>
export function TO_CHAR (from: MathArg, to: CharacterArg): Expression<TextType>
export function TO_CHAR (from: MathArg | IntervalArg | TimestampArg, to: CharacterArg): Expression<TextType> {
  return expression`TO_CHAR(${sv([...arguments])})`
}
