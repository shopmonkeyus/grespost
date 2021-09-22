import { Expression, expression } from '../expressions'
import { sql } from '../template'
import {
  ArrayType,
  IntegerType,
  RealType,
  CharacterArg,
  TextType,
  TSQueryType,
  TSVectorType,
  ArrayArg,
  TSQueryArg,
  TSVectorArg,
  JSONArg,
  JSONBArg,
  IntegerArg
} from '../types'

/**
 * @description Converts an array of lexemes to a tsvector.
 * The given strings are used as-is without further processing.
 *
 * @sql array_to_tsvector('{fat,cat,rat}'::text[]): 'cat' 'fat' 'rat'
 */
export function ARRAY_TO_TSVECTOR (arg: ArrayArg<TextType>): Expression<TSVectorType> {
  return expression`ARRAY_TO_TSVECTOR(${sql.join([...arguments])})`
}

/**
 * @description Returns the OID of the current default text search configuration (as set by default_text_search_config).
 *
 * @sql get_current_ts_config(): english
 */
export function GET_CURRENT_TS_CONFIG (): Expression<TextType> {
  return expression`GET_CURRENT_TS_CONFIG()`
}

/**
 * @description Returns the number of lexemes plus operators in the tsquery.
 *
 * @sql numnode('(fat & rat) | cat'::tsquery): 5
 */
export function NUMNODE (arg: TSQueryArg): Expression<IntegerType> {
  return expression`NUMNODE(${sql.join([...arguments])})`
}

/**
 * @description Converts text to a tsquery, normalizing words according to the specified or default configuration.
 * Any punctuation in the string is ignored (it does not determine query operators).
 * The resulting query matches documents containing all non-stopwords in the text.
 *
 * @sql plainto_tsquery('english', 'The Fat Rats'): 'fat' & 'rat'
 */
export function PLAINTO_TSQUERY (query: CharacterArg, lang?: CharacterArg): Expression<TSQueryType> {
  return expression`PLAINTO_TSQUERY(${sql.join([...arguments])})`
}

/**
 * @description Converts text to a tsquery, normalizing words according to the specified or default configuration.
 * Any punctuation in the string is ignored (it does not determine query operators).
 * The resulting query matches phrases containing all non-stopwords in the text.
 *
 * @sql phraseto_tsquery('english', 'The Fat Rats'): 'fat' <-> 'rat'
 */
export function PHRASETO_TSQUERY (query: CharacterArg, lang?: CharacterArg): Expression<TSQueryType> {
  return expression`PHRASETO_TSQUERY(${sql.join([...arguments])})`
}

/**
 * @description Converts text to a tsquery, normalizing words according to the specified or default configuration.
 * Quoted word sequences are converted to phrase tests.
 * The word “or” is understood as producing an OR operator, and a dash produces a NOT operator; other punctuation is ignored.
 * This approximates the behavior of some common web search tools.
 *
 * @sql websearch_to_tsquery('english', '\"fat rat\" or cat dog'): 'fat' <-> 'rat' | 'cat' & 'dog'
 */
export function WEBSEARCH_TO_TSQUERY (query: CharacterArg, lang?: CharacterArg): Expression<TSQueryType> {
  return expression`WEBSEARCH_TO_TSQUERY(${sql.join([...arguments])})`
}

/**
 * @description Produces a representation of the indexable portion of a tsquery.
 * A result that is empty or just T indicates a non-indexable query.
 *
 * @sql querytree('foo & ! bar'::tsquery): 'foo'
 */
export function QUERYTREE (query: TSQueryArg): Expression<TextType> {
  return expression`QUERYTREE(${sql.join([...arguments])})`
}

/**
 * @description Assigns the specified weight to elements of the vector [ that are listed in lexemes ].
 *
 * @sql
 *  setweight('fat:2,4 cat:3 rat:5B'::tsvector, 'A'): 'cat':3A 'fat':2A,4A 'rat':5A
 *  setweight('fat:2,4 cat:3 rat:5,6B'::tsvector, 'A', '{cat,rat}'): 'cat':3A 'fat':2,4 'rat':5A,6A
 */
export function SETWEIGHT (vector: TSVectorArg, weight: CharacterArg, lexemes?: ArrayArg<TextType>): Expression<TSVectorType> {
  return expression`SETWEIGHT(${sql.join([...arguments])})`
}

/**
 * @description Removes positions and weights from the tsvector.
 *
 * @sql strip('fat:2,4 cat:3 rat:5A'::tsvector): 'cat' 'fat' 'rat'
 */
export function STRIP (vector: TSVectorArg): Expression<TSVectorType> {
  return expression`STRIP(${sql.join([...arguments])})`
}

/**
 * @description Converts text to a tsquery, normalizing words according to the specified or default configuration.
 * The words must be combined by valid tsquery operators.
 *
 * @sql to_tsquery('english', 'The & Fat & Rats'): 'fat' & 'rat'
 */
export function TO_TSQUERY (query: CharacterArg, lang?: CharacterArg): Expression<TSQueryType> {
  return expression`TO_TSQUERY(${sql.join([...arguments])})`
}

/**
 * @description TEXT: Converts text to a tsvector, normalizing words according to the specified or default configuration.
 * Position information is included in the result.
 * JSON | JSONB: Converts each string value in the JSON document to a tsvector, normalizing words according to the specified or default configuration.
 * The results are then concatenated in document order to produce the output.
 * Position information is generated as though one stopword exists between each pair of string values.
 * (Beware that “document order” of the fields of a JSON object is implementation-dependent when the input is jsonb; observe the difference in the examples.)
 *
 * @sql
 *  to_tsvector('english', 'The Fat Rats'): 'fat':2 'rat':3
 *  to_tsvector('english', '{"aa": "The Fat Rats", "b": "dog"}'::json) → 'dog':5 'fat':2 'rat':3
 *  to_tsvector('english', '{"aa": "The Fat Rats", "b": "dog"}'::jsonb) → 'dog':1 'fat':4 'rat':5
 */
export function TO_TSVECTOR (document: CharacterArg | JSONArg | JSONBArg, lang?: CharacterArg): Expression<TSVectorType> {
  return expression`TO_TSVECTOR(${sql.join([...arguments])})`
}

/**
 * @description Selects each item in the JSON document that is requested by the filter and converts each one to a tsvector,
 * normalizing words according to the specified or default configuration.
 * The results are then concatenated in document order to produce the output.
 * Position information is generated as though one stopword exists between each pair of selected items.
 * (Beware that “document order” of the fields of a JSON object is implementation-dependent when the input is jsonb.)
 * The filter must be a jsonb array containing zero or more of these keywords: "string" (to include all string values),
 * "numeric" (to include all numeric values), "boolean" (to include all boolean values), "key" (to include all keys),
 * or "all" (to include all the above). As a special case, the filter can also be a simple JSON value that is one of these keywords.
 *
 * @sql jsonb_to_tsvector ( [ config regconfig, ] document jsonb, filter jsonb ): tsvector
 */
export function JSON_TO_TSVECTOR (document: JSONArg, filter: JSONBArg, config?: CharacterArg): Expression<TSVectorType> {
  return expression`JSON_TO_TO_TSVECTOR(${sql.join([...arguments])})`
}

/**
 * @description jsonb_to_tsvector ( [ config regconfig, ] document jsonb, filter jsonb ): tsvector
 *
 * @sql Selects each item in the JSON document that is requested by the filter and converts each one to a tsvector,
 * normalizing words according to the specified or default configuration.
 * The results are then concatenated in document order to produce the output.
 * Position information is generated as though one stopword exists between each pair of selected items.
 * (Beware that “document order” of the fields of a JSON object is implementation-dependent when the input is jsonb.)
 * The filter must be a jsonb array containing zero or more of these keywords: "string" (to include all string values),
 * "numeric" (to include all numeric values), "boolean" (to include all boolean values), "key" (to include all keys),
 * or "all" (to include all the above). As a special case, the filter can also be a simple JSON value that is one of these keywords.
 */
export function JSONB_TO_TSVECTOR (document: JSONBArg, filter: JSONBArg, config?: CharacterArg): Expression<TSVectorType> {
  return expression`JSONB_TO_TO_TSVECTOR(${sql.join([...arguments])})`
}

/**
 * @description Removes any occurrence of the given lexeme from the vector.
 *
 * @sql ts_delete('fat:2,4 cat:3 rat:5A'::tsvector, 'fat'): 'cat':3 'rat':5A
 * @sql ts_delete('fat:2,4 cat:3 rat:5A'::tsvector, ARRAY['fat','rat']): 'cat':3
 */
export function TS_DELETE (vector: TSVectorArg, lexeme: CharacterArg | ArrayArg<TextType>): Expression<TSVectorType> {
  return expression`TS_DELETE(${sql.join([...arguments])})`
}

/**
 * @description Selects only elements with the given weights from the vector.
 * @sql ts_filter('fat:2,4 cat:3b,7c rat:5A'::tsvector, '{a,b}'): 'cat':3B 'rat':5A
 */
export function TS_FILTER (vector: TSVectorArg, weight: ArrayArg<TextType>): Expression<TSVectorType> {
  return expression`TS_FILTER(${sql.join([...arguments])})`
}

/**
 * @description Displays, in an abbreviated form, the match(es) for the query in the document
 * (or in string values within the JSON document), which must be raw text not a tsvector.
 * Words in the document are normalized according to the specified or default configuration before matching to the query.
 * Use of this function is discussed in Section 12.3.4, which also describes the available options.
 *
 * @sql ts_headline('The fat cat ate the rat.', 'cat'): The fat <b>cat</b> ate the rat.
 */
export function TS_HEADLINE (document: CharacterArg | JSONArg | JSONBArg, query: TSQueryArg, options?: CharacterArg, config?: CharacterArg): Expression<TextType> {
  return expression`TS_HEADLINE(${sql.join([...arguments])})`
}

/**
 * @description Computes a score showing how well the vector matches the query. See Section 12.3.3 for details.
 * @sql ts_rank(to_tsvector('raining cats and dogs'), 'cat'): 0.06079271
 */
export function TS_RANK (
  vector: TSVectorArg,
  query: TSQueryArg,
  weights?: ArrayArg<RealType>,
  normalization?: IntegerArg
): Expression<RealType> {
  return expression`TS_RANK(${sql.join([...arguments])})`
}

/**
 * @description Computes a score showing how well the vector matches the query, using a cover density algorithm. See Section 12.3.3 for details.
 * @sql ts_rank_cd(to_tsvector('raining cats and dogs'), 'cat'): 0.1
 */
export function TS_RANK_CD (
  vector: TSVectorArg,
  query: TSQueryArg,
  weights?: ArrayArg<RealType>,
  normalization?: IntegerArg
): Expression<RealType> {
  return expression`TS_RANK_CD(${sql.join([...arguments])})`
}

/**
 * @description Replaces occurrences of target with substitute within the query. See Section 12.4.2.1 for details.
 * @sql ts_rewrite('a & b'::tsquery, 'a'::tsquery, 'foo|bar'::tsquery): 'b' & ( 'foo' | 'bar' )
 */
export function TS_REWRITE (query: TSQueryArg, target: TSQueryArg, substitute: TSQueryArg): Expression<TSQueryType>
export function TS_REWRITE (query: TSQueryArg, select: CharacterArg): Expression<TSQueryType>
export function TS_REWRITE (query: TSQueryArg, target: TSQueryArg | CharacterArg, substitute?: TSQueryArg): Expression<TSQueryType> {
  return expression`TS_REWRITE(${sql.join([...arguments])})`
}

/**
 * @description Constructs a phrase query that searches for matches of query1 and query2 at successive lexemes (same as <-> operator).
 * @sql tsquery_phrase(to_tsquery('fat'), to_tsquery('cat')): 'fat' <-> 'cat'
 */
export function TSQUERY_PHRASE (q1: TSQueryArg, q2: TSQueryArg, distance?: IntegerArg): Expression<TSQueryType> {
  return expression`TSQUERY_PHRASE(${sql.join([...arguments])})`
}

/**
 * @description Converts a tsvector to an array of lexemes.
 * @sql tsvector_to_array('fat:2,4 cat:3 rat:5A'::tsvector): {cat,fat,rat}
 */
export function TSVECTOR_TO_ARRAY (vector: TSVectorArg): Expression<ArrayType<TextType>> {
  return expression`TSVECTOR_TO_ARRAY(${sql.join([...arguments])})`
}

// /**
//  * @description Extracts and normalizes tokens from the document according to the specified or default text search configuration, and returns information about how each token was processed. See Section 12.8.1 for details.
//  * @sql ts_debug('english', 'The Brightest supernovaes') → (asciiword,\"Word, all ASCII\",The,{english_stem},english_stem,{}) ...
//  */
// export function TS_DEBUG ( [ CONFIG REGCONFIG, ] DOCUMENT TEXT ) → SETOF RECORD ( ALIAS TEXT, DESCRIPTION TEXT, TOKEN TEXT, DICTIONARIES REGDICTIONARY[], DICTIONARY REGDICTIONARY, LEXEMES TEXT[] ) {
//   return func('TS_DEBUG ',  [...arguments])
// }

// /**
//  * @description Returns an array of replacement lexemes if the input token is known to the dictionary,
//  * or an empty array if the token is known to the dictionary but it is a stop word,
//  * or NULL if it is not a known word. See Section 12.8.3 for details.
//  * @sql ts_lexize('english_stem', 'stars') → {star}
//  */
// export function TS_LEXIZE (dict: CharacterArg, token: CharacterArg ): Expression<ArrayType<TextType>> {
//   return func('TS_LEXIZE',  [...arguments])
// }

// /**
//  * @description Extracts tokens from the document using the named parser. See Section 12.8.2 for details.
//  * @sql ts_parse('default', 'foo - bar') → (1,foo) ...
//  */
// export function TS_PARSE (parser: CharacterArg, document: CharacterArg) → SETOF RECORD ( TOKID INTEGER, TOKEN TEXT ) {
//   return func('TS_PARSE ',  [...arguments])
// }

// /**
//  * @description Extracts tokens from the document using a parser specified by OID. See Section 12.8.2 for details.
//  * @sql ts_parse(3722, 'foo - bar') → (1,foo) ...
//  */
// export function TS_PARSE ( PARSER_OID OID, DOCUMENT TEXT ) → SETOF RECORD ( TOKID INTEGER, TOKEN TEXT ) {
//   return func('TS_PARSE ',  [...arguments])
// }

// /**
//  * @description Returns a table that describes each type of token the named parser can recognize. See Section 12.8.2 for details.
//  * @sql ts_token_type('default') → (1,asciiword,\"Word, all ASCII\") ...
//  */
// export function TS_TOKEN_TYPE ( PARSER_NAME TEXT ) → SETOF RECORD ( TOKID INTEGER, ALIAS TEXT, DESCRIPTION TEXT ) {
//   return func('TS_TOKEN_TYPE ',  [...arguments])
// }

// /**
//  * @description Returns a table that describes each type of token a parser specified by OID can recognize. See Section 12.8.2 for details.
//  * @sql ts_token_type(3722) → (1,asciiword,\"Word, all ASCII\") ...
//  */
// export function TS_TOKEN_TYPE ( PARSER_OID OID ) → SETOF RECORD ( TOKID INTEGER, ALIAS TEXT, DESCRIPTION TEXT ) {
//   return func('TS_TOKEN_TYPE ',  [...arguments])
// }

// /**
//  * @description Executes the sqlquery, which must return a single tsvector column, and returns statistics about each distinct lexeme contained in the data. See Section 12.4.4 for details.
//  * @sql ts_stat('SELECT vector FROM apod') → (foo,10,15) ...
//  */
// export function TS_STAT ( SQLQUERY TEXT [, WEIGHTS TEXT ] ) → SETOF RECORD ( WORD TEXT, NDOC INTEGER, NENTRY INTEGER ) {
//   return func('TS_STAT ',  [...arguments])
// }
