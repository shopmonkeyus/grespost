import { literal } from '../../expressions'
import { TEXT, TSVECTOR, TSQUERY, JSONB, ARRAY, JSON } from '../../types'
import { ARR, UNNEST } from '../array'
import { ARRAY_TO_TSVECTOR, GET_CURRENT_TS_CONFIG, NUMNODE, PLAINTO_TSQUERY, PHRASETO_TSQUERY, WEBSEARCH_TO_TSQUERY, QUERYTREE, SETWEIGHT, STRIP, TO_TSQUERY, TO_TSVECTOR, JSON_TO_TSVECTOR, TS_DELETE, TS_FILTER, TS_HEADLINE, TS_RANK, TS_RANK_CD, TS_REWRITE, TSQUERY_PHRASE, TSVECTOR_TO_ARRAY, JSONB_TO_TSVECTOR } from '../search'
import { LENGTH } from '../string'

describe('text search functions', () => {
  it('array_to_tsvector ( text[] ) → tsvector', () => {
    expect(ARRAY_TO_TSVECTOR(['FAT', 'CAT', 'RAT']).toQuery()).toEqual(
      [
        'ARRAY_TO_TSVECTOR($1)',
        [
          [
            'FAT',
            'CAT',
            'RAT'
          ]
        ]
      ]
    )
  })

  it('get_current_ts_config ( ) → regconfig', () => {
    expect(GET_CURRENT_TS_CONFIG().toQuery()).toEqual(
      [
        'GET_CURRENT_TS_CONFIG()',
        []
      ]
    )
  })

  it('length ( tsvector ) → integer', () => {
    expect(LENGTH(literal('FAT:2,4 CAT:3 RAT:5A').cast(TSVECTOR())).toQuery()).toEqual(
      [
        'LENGTH($1::TSVECTOR)',
        [
          'FAT:2,4 CAT:3 RAT:5A'
        ]
      ]
    )
  })

  it('numnode ( tsquery ) → integer', () => {
    expect(NUMNODE(literal('(FAT & RAT) | CAT').cast(TSQUERY())).toQuery()).toEqual(
      [
        'NUMNODE($1::TSQUERY)',
        [
          '(FAT & RAT) | CAT'
        ]
      ]
    )
  })

  it('plainto_tsquery ( [ config regconfig, ] query text ) → tsquery', () => {
    expect(PLAINTO_TSQUERY('ENGLISH', 'THE FAT RATS').toQuery()).toEqual(
      [
        'PLAINTO_TSQUERY($1, $2)',
        [
          'ENGLISH',
          'THE FAT RATS'
        ]
      ]
    )
  })

  it('phraseto_tsquery ( [ config regconfig, ] query text ) → tsquery', () => {
    expect(PHRASETO_TSQUERY('ENGLISH', 'THE FAT RATS').toQuery()).toEqual(
      [
        'PHRASETO_TSQUERY($1, $2)',
        [
          'ENGLISH',
          'THE FAT RATS'
        ]
      ]
    )
    expect(PHRASETO_TSQUERY('ENGLISH', 'THE CAT AND RATS').toQuery()).toEqual(
      [
        'PHRASETO_TSQUERY($1, $2)',
        [
          'ENGLISH',
          'THE CAT AND RATS'
        ]
      ]
    )
  })

  it('websearch_to_tsquery ( [ config regconfig, ] query text ) → tsquery', () => {
    expect(WEBSEARCH_TO_TSQUERY('ENGLISH', '"FAT RAT" OR CAT DOG').toQuery()).toEqual(
      [
        'WEBSEARCH_TO_TSQUERY($1, $2)',
        [
          'ENGLISH',
          '"FAT RAT" OR CAT DOG'
        ]
      ]
    )
  })

  it('querytree ( tsquery ) → text', () => {
    expect(QUERYTREE(literal('FOO & ! BAR').cast(TSQUERY())).toQuery()).toEqual(
      [
        'QUERYTREE($1::TSQUERY)',
        [
          'FOO & ! BAR'
        ]
      ]
    )
  })

  it('setweight ( vector tsvector, weight "char" ) → tsvector', () => {
    expect(SETWEIGHT(literal('FAT:2,4 CAT:3 RAT:5B').cast(TSVECTOR()), 'A').toQuery()).toEqual(
      [
        'SETWEIGHT($1::TSVECTOR, $2)',
        [
          'FAT:2,4 CAT:3 RAT:5B',
          'A'
        ]
      ]
    )
  })

  it('setweight ( vector tsvector, weight "char", lexemes text[] ) → tsvector', () => {
    expect(SETWEIGHT(literal('FAT:2,4 CAT:3 RAT:5,6B').cast(TSVECTOR()), 'A', ['CAT', 'RAT']).toQuery()).toEqual(
      [
        'SETWEIGHT($1::TSVECTOR, $2, $3)',
        [
          'FAT:2,4 CAT:3 RAT:5,6B',
          'A',
          [
            'CAT',
            'RAT'
          ]
        ]
      ]
    )
  })

  it('strip ( tsvector ) → tsvector', () => {
    expect(STRIP(literal('FAT:2,4 CAT:3 RAT:5A').cast(TSVECTOR())).toQuery()).toEqual(
      [
        'STRIP($1::TSVECTOR)',
        [
          'FAT:2,4 CAT:3 RAT:5A'
        ]
      ]
    )
  })

  it('to_tsquery ( [ config regconfig, ] query text ) → tsquery', () => {
    expect(TO_TSQUERY('ENGLISH', 'THE & FAT & RATS').toQuery()).toEqual(
      [
        'TO_TSQUERY($1, $2)',
        [
          'ENGLISH',
          'THE & FAT & RATS'
        ]
      ]
    )
  })

  it('to_tsvector ( [ config regconfig, ] document text ) → tsvector', () => {
    expect(TO_TSVECTOR('ENGLISH', 'THE FAT RATS').toQuery()).toEqual(
      [
        'TO_TSVECTOR($1, $2)',
        [
          'ENGLISH',
          'THE FAT RATS'
        ]
      ]
    )
  })

  it('to_tsvector ( [ config regconfig, ] document json ) → tsvector', () => {
    expect(TO_TSVECTOR(literal('{"AA": "THE FAT RATS", "B": "DOG"}').cast(JSON()), 'ENGLISH').toQuery()).toEqual(
      [
        'TO_TSVECTOR($1::JSON, $2)',
        [
          '{"AA": "THE FAT RATS", "B": "DOG"}',
          'ENGLISH'
        ]
      ]
    )
    expect(TO_TSVECTOR(literal('{"AA": "THE FAT RATS", "B": "DOG"}').cast(JSONB()), 'ENGLISH').toQuery()).toEqual(
      [
        'TO_TSVECTOR($1::JSONB, $2)',
        [
          '{"AA": "THE FAT RATS", "B": "DOG"}',
          'ENGLISH'
        ]
      ]
    )
  })

  it('to_tsvector ( [ config regconfig, ] document jsonb ) → tsvector', () => {
    expect(TO_TSVECTOR(literal('{"AA": "THE FAT RATS", "B": "DOG"}').cast(JSON())).toQuery()).toEqual(
      [
        'TO_TSVECTOR($1::JSON)',
        [
          '{"AA": "THE FAT RATS", "B": "DOG"}'
        ]
      ]
    )
    expect(TO_TSVECTOR(literal('{"AA": "THE FAT RATS", "B": "DOG"}').cast(JSONB())).toQuery()).toEqual(
      [
        'TO_TSVECTOR($1::JSONB)',
        [
          '{"AA": "THE FAT RATS", "B": "DOG"}'
        ]
      ]
    )
  })

  it('json_to_tsvector ( [ config regconfig, ] document json, filter jsonb ) → tsvector', () => {
    expect(JSON_TO_TSVECTOR(literal('{"A": "THE FAT RATS", "B": 123}').cast(JSON()), '["STRING", "NUMERIC"]').toQuery()).toEqual(
      [
        'JSON_TO_TO_TSVECTOR($1::JSON, $2)',
        [
          '{"A": "THE FAT RATS", "B": 123}',
          '["STRING", "NUMERIC"]'
        ]
      ]
    )
    expect(JSON_TO_TSVECTOR(literal('{"CAT": "THE FAT RATS", "DOG": 123}').cast(JSON()), '"ALL"').toQuery()).toEqual(
      [
        'JSON_TO_TO_TSVECTOR($1::JSON, $2)',
        [
          '{"CAT": "THE FAT RATS", "DOG": 123}',
          '"ALL"'
        ]
      ]
    )
  })

  it('jsonb_to_tsvector ( [ config regconfig, ] document jsonb, filter jsonb ) → tsvector', () => {
    expect(JSONB_TO_TSVECTOR(literal('{"A": "THE FAT RATS", "B": 123}').cast(JSONB()), '["STRING", "NUMERIC"]').toQuery()).toEqual(
      [
        'JSONB_TO_TO_TSVECTOR($1::JSONB, $2)',
        [
          '{"A": "THE FAT RATS", "B": 123}',
          '["STRING", "NUMERIC"]'
        ]
      ]
    )
    expect(JSONB_TO_TSVECTOR(literal('{"CAT": "THE FAT RATS", "DOG": 123}').cast(JSONB()), '"ALL"').toQuery()).toEqual(
      [
        'JSONB_TO_TO_TSVECTOR($1::JSONB, $2)',
        [
          '{"CAT": "THE FAT RATS", "DOG": 123}',
          '"ALL"'
        ]
      ]
    )
  })

  it('ts_delete ( vector tsvector, lexeme text ) → tsvector', () => {
    expect(TS_DELETE(literal('FAT:2,4 CAT:3 RAT:5A').cast(TSVECTOR()), 'FAT').toQuery()).toEqual(
      [
        'TS_DELETE($1::TSVECTOR, $2)',
        [
          'FAT:2,4 CAT:3 RAT:5A',
          'FAT'
        ]
      ]
    )
  })

  it('ts_delete ( vector tsvector, lexemes text[] ) → tsvector', () => {
    expect(TS_DELETE(literal('FAT:2,4 CAT:3 RAT:5A').cast(TSVECTOR()), ARR('FAT', 'RAT')).toQuery()).toEqual(
      [
        'TS_DELETE($1::TSVECTOR, ARRAY[$2, $3])',
        [
          'FAT:2,4 CAT:3 RAT:5A',
          'FAT',
          'RAT'
        ]
      ]
    )
  })

  it('ts_filter ( vector tsvector, weights "char"[] ) → tsvector', () => {
    expect(TS_FILTER(literal('FAT:2,4 CAT:3B,7C RAT:5A').cast(TSVECTOR()), ['A', 'B']).toQuery()).toEqual(
      [
        'TS_FILTER($1::TSVECTOR, $2)',
        [
          'FAT:2,4 CAT:3B,7C RAT:5A',
          [
            'A',
            'B'
          ]
        ]
      ]
    )
  })

  it('ts_headline ( [ config regconfig, ] document text, query tsquery [, options text ] ) → text', () => {
    expect(TS_HEADLINE('THE FAT CAT ATE THE RAT.', 'CAT').toQuery()).toEqual(
      [
        'TS_HEADLINE($1, $2)',
        [
          'THE FAT CAT ATE THE RAT.',
          'CAT'
        ]
      ]
    )
  })

  it('ts_headline ( [ config regconfig, ] document json, query tsquery [, options text ] ) → text', () => {
    expect(TS_HEADLINE(literal('{"CAT":"RAINING CATS AND DOGS"}').cast(JSONB()), 'CAT').toQuery()).toEqual(
      [
        'TS_HEADLINE($1::JSONB, $2)',
        [
          '{"CAT":"RAINING CATS AND DOGS"}',
          'CAT'
        ]
      ]
    )
  })

  it('ts_headline ( [ config regconfig, ] document jsonb, query tsquery [, options text ] ) → text', () => {
    expect(TS_HEADLINE(literal('{"CAT":"RAINING CATS AND DOGS"}').cast(JSONB()), 'CAT').toQuery()).toEqual(
      [
        'TS_HEADLINE($1::JSONB, $2)',
        [
          '{"CAT":"RAINING CATS AND DOGS"}',
          'CAT'
        ]
      ]
    )
  })

  it('ts_rank ( [ weights real[], ] vector tsvector, query tsquery [, normalization integer ] ) → real', () => {
    expect(TS_RANK(TO_TSVECTOR('RAINING CATS AND DOGS'), 'CAT').toQuery()).toEqual(
      [
        'TS_RANK(TO_TSVECTOR($1), $2)',
        [
          'RAINING CATS AND DOGS',
          'CAT'
        ]
      ]
    )
  })

  it('ts_rank_cd ( [ weights real[], ] vector tsvector, query tsquery [, normalization integer ] ) → real', () => {
    expect(TS_RANK_CD(TO_TSVECTOR('RAINING CATS AND DOGS'), 'CAT').toQuery()).toEqual(
      [
        'TS_RANK_CD(TO_TSVECTOR($1), $2)',
        [
          'RAINING CATS AND DOGS',
          'CAT'
        ]
      ]
    )
  })

  it('ts_rewrite ( query tsquery, target tsquery, substitute tsquery ) → tsquery', () => {
    expect(TS_REWRITE(literal('A & B').cast(TSQUERY()), literal('A').cast(TSQUERY()), 'FOO|BAR').cast(TSQUERY()).toQuery()).toEqual(
      [
        'TS_REWRITE($1::TSQUERY, $2::TSQUERY, $3)::TSQUERY',
        [
          'A & B',
          'A',
          'FOO|BAR'
        ]
      ]
    )
  })

  it('ts_rewrite ( query tsquery, select text ) → tsquery', () => {
    expect(TS_REWRITE(literal('A & B').cast(TSQUERY()), 'SELECT T,S FROM ALIASES').toQuery()).toEqual(
      [
        'TS_REWRITE($1::TSQUERY, $2)',
        [
          'A & B',
          'SELECT T,S FROM ALIASES'
        ]
      ]
    )
  })

  it('tsquery_phrase ( query1 tsquery, query2 tsquery ) → tsquery', () => {
    expect(TSQUERY_PHRASE(TO_TSQUERY('FAT'), TO_TSQUERY('CAT')).toQuery()).toEqual(
      [
        'TSQUERY_PHRASE(TO_TSQUERY($1), TO_TSQUERY($2))',
        [
          'FAT',
          'CAT'
        ]
      ]
    )
  })

  it('tsquery_phrase ( query1 tsquery, query2 tsquery, distance integer ) → tsquery', () => {
    expect(TSQUERY_PHRASE(TO_TSQUERY('FAT'), TO_TSQUERY('CAT'), 10).toQuery()).toEqual(
      [
        'TSQUERY_PHRASE(TO_TSQUERY($1), TO_TSQUERY($2), $3)',
        [
          'FAT',
          'CAT',
          10
        ]
      ]
    )
  })

  it('tsvector_to_array ( tsvector ) → text[]', () => {
    expect(TSVECTOR_TO_ARRAY(literal('FAT:2,4 CAT:3 RAT:5A').cast(TSVECTOR())).toQuery()).toEqual(
      [
        'TSVECTOR_TO_ARRAY($1::TSVECTOR)',
        [
          'FAT:2,4 CAT:3 RAT:5A'
        ]
      ]
    )
  })

  it('unnest ( tsvector ) → setof record ( lexeme text, positions smallint[], weights text )', () => {
    expect(UNNEST(literal('CAT:3 FAT:2,4 RAT:5A').cast(TSVECTOR())).toQuery()).toEqual(
      [
        'UNNEST($1::TSVECTOR)',
        [
          'CAT:3 FAT:2,4 RAT:5A'
        ]
      ]
    )
  })
})
