import { literal } from '../../expressions'
import { BYTEA } from '../../types'
import { CONVERT, CONVERT_FROM, CONVERT_TO, DECODE, ENCODE, GET_BIT, GET_BYTE, SET_BIT, SET_BYTE, SHA224, SHA256, SHA384, SHA512 } from '../bytea'
import { BIT_LENGTH, BTRIM, LENGTH, MD5, OCTET_LENGTH, OVERLAY, POSITION, SUBSTR, SUBSTRING, TRIM } from '../string'

describe('bytea functions', () => {
  it('bytea || bytea → bytea', () => {
    expect(literal('\\X123456').cast(BYTEA()).concat(literal('\\X789A00BCDE').cast(BYTEA())).toQuery()).toEqual(
      [
        '$1::BYTEA || $2::BYTEA',
        [
          '\\X123456',
          '\\X789A00BCDE'
        ]
      ]
    )
  })

  it('bit_length ( bytea ) → integer', () => {
    expect(BIT_LENGTH(literal('\\X123456').cast(BYTEA())).toQuery()).toEqual(
      [
        'BIT_LENGTH($1::BYTEA)',
        [
          '\\X123456'
        ]
      ]
    )
  })

  it('octet_length ( bytea ) → integer', () => {
    expect(OCTET_LENGTH(literal('\\X123456').cast(BYTEA())).toQuery()).toEqual(
      [
        'OCTET_LENGTH($1::BYTEA)',
        [
          '\\X123456'
        ]
      ]
    )
  })

  it('overlay ( bytes bytea PLACING newsubstring bytea FROM start integer [ FOR count integer ] ) → bytea', () => {
    expect(OVERLAY(literal('\\X123456').cast(BYTEA()), literal('\\002\\003').cast(BYTEA()), 2, 3).toQuery()).toEqual(
      [
        'OVERLAY($1::BYTEA PLACING $2::BYTEA FROM $3 FOR $4)',
        [
          '\\X123456',
          '\\002\\003',
          2,
          3
        ]
      ]
    )
  })

  it('position ( substring bytea IN bytes bytea ) → integer', () => {
    expect(POSITION(literal('\\X123456').cast(BYTEA()), literal('\\X123456789').cast(BYTEA())).toQuery()).toEqual(
      [
        'POSITION($1::BYTEA IN $2::BYTEA)',
        [
          '\\X123456',
          '\\X123456789'
        ]
      ]
    )
  })

  it('substring ( bytes bytea [ FROM start integer ] [ FOR count integer ] ) → bytea', () => {
    expect(SUBSTRING(literal('\\X123456789').cast(BYTEA()), 3, 2).toQuery()).toEqual(
      [
        'SUBSTRING($1::BYTEA FROM $2 FOR $3)',
        [
          '\\X123456789',
          3,
          2
        ]
      ]
    )
  })

  it('trim ( [ BOTH ] bytesremoved bytea FROM bytes bytea ) → bytea', () => {
    expect(TRIM(literal('\\X9012').cast(BYTEA()), literal('\\X1234567890').cast(BYTEA()), 'BOTH').toQuery()).toEqual(
      [
        'TRIM(BOTH $1::BYTEA FROM $2::BYTEA)',
        [
          '\\X1234567890',
          '\\X9012'
        ]
      ]
    )
  })

  it('btrim ( bytes bytea, bytesremoved bytea ) → bytea', () => {
    expect(BTRIM(literal('\\X1234567890').cast(BYTEA()), literal('\\X9012').cast(BYTEA())).toQuery()).toEqual(
      [
        'BTRIM($1::BYTEA, $2::BYTEA)',
        [
          '\\X1234567890',
          '\\X9012'
        ]
      ]
    )
  })

  it('get_bit ( bytes bytea, n bigint ) → integer', () => {
    expect(GET_BIT(literal('\\X1234567890').cast(BYTEA()), 30).toQuery()).toEqual(
      [
        'GET_BIT($1::BYTEA, $2)',
        [
          '\\X1234567890',
          30
        ]
      ]
    )
  })

  it('get_byte ( bytes bytea, n integer ) → integer', () => {
    expect(GET_BYTE(literal('\\X1234567890').cast(BYTEA()), 4).toQuery()).toEqual(
      [
        'GET_BYTE($1::BYTEA, $2)',
        [
          '\\X1234567890',
          4
        ]
      ]
    )
  })

  it('length ( bytea ) → integer', () => {
    expect(LENGTH(literal('\\X1234567890').cast(BYTEA())).toQuery()).toEqual(
      [
        'LENGTH($1::BYTEA)',
        [
          '\\X1234567890'
        ]
      ]
    )
  })

  it('length ( bytes bytea, encoding name ) → integer', () => {
    expect(LENGTH(literal('JOSE').cast(BYTEA()), 'UTF8').toQuery()).toEqual(
      [
        'LENGTH($1::BYTEA, $2)',
        [
          'JOSE',
          'UTF8'
        ]
      ]
    )
  })

  it('md5 ( bytea ) → text', () => {
    expect(MD5(literal('TH\\000OMAS').cast(BYTEA())).toQuery()).toEqual(
      [
        'MD5($1::BYTEA)',
        [
          'TH\\000OMAS'
        ]
      ]
    )
  })

  it('set_bit ( bytes bytea, n bigint, newvalue integer ) → bytea', () => {
    expect(SET_BIT(literal('\\X1234567890').cast(BYTEA()), 30, 0).toQuery()).toEqual(
      [
        'SET_BIT($1::BYTEA, $2, $3)',
        [
          '\\X1234567890',
          30,
          0
        ]
      ]
    )
  })

  it('set_byte ( bytes bytea, n integer, newvalue integer ) → bytea', () => {
    expect(SET_BYTE(literal('\\X1234567890').cast(BYTEA()), 4, 64).toQuery()).toEqual(
      [
        'SET_BYTE($1::BYTEA, $2, $3)',
        [
          '\\X1234567890',
          4,
          64
        ]
      ]
    )
  })

  it('sha224 ( bytea ) → bytea', () => {
    expect(SHA224(literal('ABC').cast(BYTEA())).toQuery()).toEqual(
      [
        'SHA224($1::BYTEA)',
        [
          'ABC'
        ]
      ]
    )
  })

  it('sha256 ( bytea ) → bytea', () => {
    expect(SHA256(literal('ABC').cast(BYTEA())).toQuery()).toEqual(
      [
        'SHA256($1::BYTEA)',
        [
          'ABC'
        ]
      ]
    )
  })

  it('sha384 ( bytea ) → bytea', () => {
    expect(SHA384(literal('ABC').cast(BYTEA())).toQuery()).toEqual(
      [
        'SHA384($1::BYTEA)',
        [
          'ABC'
        ]
      ]
    )
  })

  it('sha512 ( bytea ) → bytea', () => {
    expect(SHA512(literal('ABC').cast(BYTEA())).toQuery()).toEqual(
      [
        'SHA512($1::BYTEA)',
        [
          'ABC'
        ]
      ]
    )
  })

  it('substr ( bytes bytea, start integer [, count integer ] ) → bytea', () => {
    expect(SUBSTR(literal('\\X1234567890').cast(BYTEA()), 3, 2).toQuery()).toEqual(
      [
        'SUBSTR($1::BYTEA, $2, $3)',
        [
          '\\X1234567890',
          3,
          2
        ]
      ]
    )
  })

  it('convert ( bytes bytea, src_encoding name, dest_encoding name ) → bytea', () => {
    expect(CONVERT('TEXT_IN_UTF8', 'UTF8', 'LATIN1').toQuery()).toEqual(
      [
        'CONVERT($1, $2, $3)',
        [
          'TEXT_IN_UTF8',
          'UTF8',
          'LATIN1'
        ]
      ]
    )
  })

  it('convert_from ( bytes bytea, src_encoding name ) → text', () => {
    expect(CONVERT_FROM('TEXT_IN_UTF8', 'UTF8').toQuery()).toEqual(
      [
        'CONVERT_FROM($1, $2)',
        [
          'TEXT_IN_UTF8',
          'UTF8'
        ]
      ]
    )
  })

  it('convert_to ( string text, dest_encoding name ) → bytea', () => {
    expect(CONVERT_TO('SOME_TEXT', 'UTF8').toQuery()).toEqual(
      [
        'CONVERT_TO($1, $2)',
        [
          'SOME_TEXT',
          'UTF8'
        ]
      ]
    )
  })

  it('encode ( bytes bytea, format text ) → text', () => {
    expect(ENCODE('123\\000\\001', 'BASE64').toQuery()).toEqual(
      [
        'ENCODE($1, $2)',
        [
          '123\\000\\001',
          'BASE64'
        ]
      ]
    )
  })

  it('decode ( string text, format text ) → bytea', () => {
    expect(DECODE('MTIZAAE=', 'BASE64').toQuery()).toEqual(
      [
        'DECODE($1, $2)',
        [
          'MTIZAAE=',
          'BASE64'
        ]
      ]
    )
  })
})
