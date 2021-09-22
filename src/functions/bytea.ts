import { BigintType, BitArg, BitType, ByteaArg, ByteaType, IntegerType, MathLiteral, CharacterArg, BigintArg, IntegerArg, TextType } from '../types'
import { Expression, expression } from '../expressions'
import { sv } from '../template'

export function GET_BIT (arg: ByteaArg | BitArg, offset: BigintArg): Expression<IntegerType> {
  return expression`GET_BIT(${sv([...arguments])})`
}

export function GET_BYTE (arg: ByteaArg, offset: IntegerArg): Expression<IntegerType> {
  return expression`GET_BYTE(${sv([...arguments])})`
}

export function SET_BIT (arg: BitArg, offset: Expression<BigintType> | MathLiteral, value: IntegerArg): Expression<BitType>
export function SET_BIT (arg: ByteaArg, offset: Expression<BigintType> | MathLiteral, value: IntegerArg): Expression<ByteaType>
export function SET_BIT (arg: ByteaArg | BitArg, offset: Expression<BigintType> | MathLiteral, value: IntegerArg): Expression<ByteaType> | Expression<BitType> {
  return expression`SET_BIT(${sv([...arguments])})`
}

export function SET_BYTE (arg: ByteaArg, offset: IntegerArg, value: IntegerArg): Expression<ByteaType> {
  return expression`SET_BYTE(${sv([...arguments])})`
}

export function SHA224 (arg: ByteaArg): Expression<ByteaType> {
  return expression`SHA224(${sv([...arguments])})`
}

export function SHA256 (arg: ByteaArg): Expression<ByteaType> {
  return expression`SHA256(${sv([...arguments])})`
}

export function SHA384 (arg: ByteaArg): Expression<ByteaType> {
  return expression`SHA384(${sv([...arguments])})`
}

export function SHA512 (arg: ByteaArg): Expression<ByteaType> {
  return expression`SHA512(${sv([...arguments])})`
}

/**
 * @description Converts a binary string representing text in encoding src_encoding to a binary string in encoding dest_encoding
 */
export function CONVERT (arg: ByteaArg, src: CharacterArg, dest: CharacterArg): Expression<ByteaType> {
  return expression`CONVERT(${sv([...arguments])})`
}

/**
 * @description Converts a binary string representing text in encoding src_encoding to text in the database encoding
 */
export function CONVERT_FROM (arg: ByteaArg, src: CharacterArg): Expression<TextType> {
  return expression`CONVERT_FROM(${sv([...arguments])})`
}

/**
 * @description Converts a text string (in the database encoding) to a binary string encoded in encoding dest_encoding
 */
export function CONVERT_TO (arg: CharacterArg, dest: CharacterArg): Expression<ByteaType> {
  return expression`CONVERT_TO(${sv([...arguments])})`
}

/**
 * @description Encodes binary data into a textual representation; supported format values are: base64, escape, hex.
 */
export function ENCODE (arg: ByteaArg, format: CharacterArg): Expression<TextType> {
  return expression`ENCODE(${sv([...arguments])})`
}

/**
 * @description Decodes binary data from a textual representation; supported format values are the same as for encode.
 */
export function DECODE (arg: CharacterArg, format: CharacterArg): Expression<ByteaType> {
  return expression`DECODE(${sv([...arguments])})`
}
