import { ADD_TABLE_CONSTRAINT, ALTER_TABLE, AnyExpression, CREATE_TABLE, DROP_TABLE, FOREIGN_KEY, GEN_RANDOM_UUID, INSERT, JSON_AGG, JSON_BUILD_OBJECT, QueryDefinition, SELECT, source, TEXT, UPDATE, UUID, VALUES } from '../'
import events from 'events'
import { Pool, QueryResult } from 'pg'

declare module 'pg' {
  interface Pool extends events.EventEmitter {
    query<T extends Record<string, AnyExpression>>(
      query: QueryDefinition<T>
    ): Promise<QueryResult<{
      [K in keyof T]: T[K]['type']['primitive']
    }>>
  }
}

describe('example tests', () => {
  const pg = new Pool({
    user: 'postgres',
    database: 'postgres',
    password: 'root',
    host: 'postgres'
  })

  afterAll(async () => {
    await pg.query(DROP_TABLE({ ifExists: true, names: [UsersTable, PermissionsTable] }))
    await pg.end()
  })

  const UsersTable = source('users', {
    id: UUID().required().primary().default(GEN_RANDOM_UUID()),
    name: TEXT().required()
  })

  const PermissionsTable = source('permissions', {
    id: UUID().required().primary().default(GEN_RANDOM_UUID()),
    name: TEXT().required(),
    userId: UUID()
  })

  describe('create', () => {
    it('create users', async () => {
      const query = CREATE_TABLE({
        name: UsersTable,
        definition: {
          columns: UsersTable.$.types
        }
      })

      const { rows } = await pg.query(query)

      expect(query.toQuery()).toEqual(['CREATE TABLE users ( id UUID NOT NULL  PRIMARY KEY  DEFAULT GEN_RANDOM_UUID() , "name" TEXT NOT NULL  )', []])
      expect(rows).toEqual([])
    })

    it('create permissions', async () => {
      const query = CREATE_TABLE({
        name: PermissionsTable,
        definition: {
          columns: PermissionsTable.$.types
        }
      })
      const { rows } = await pg.query(query)

      expect(query.toQuery()).toEqual(['CREATE TABLE permissions ( id UUID NOT NULL  PRIMARY KEY  DEFAULT GEN_RANDOM_UUID() , "name" TEXT NOT NULL , "userId" UUID  )', []])
      expect(rows).toEqual([])
    })
  })

  describe('alter table', () => {
    it('add foreign key', async () => {
      const query = ALTER_TABLE({
        table: PermissionsTable,
        actions: [ADD_TABLE_CONSTRAINT(FOREIGN_KEY(['userId'], UsersTable))]
      })
      const { rows } = await pg.query(query)

      expect(query.toQuery()).toEqual(['ALTER TABLE permissions ADD FOREIGN KEY ( "userId" ) REFERENCES users ', []])
      expect(rows).toEqual([])
    })
  })

  describe('foreign key works', () => {
    it('throws when try to create with null relation', async () => {
      const query = INSERT({
        into: PermissionsTable,
        values: [{
          id: GEN_RANDOM_UUID(),
          name: 'Igor',
          userId: GEN_RANDOM_UUID()
        }],
        returning: '*'
      })

      try {
        const res = await pg.query(query)
      } catch (e) {
        expect(e.message).toEqual('insert or update on table "permissions" violates foreign key constraint "permissions_userId_fkey"')
      }
    })

    it('insert user', async () => {
      const query = INSERT({
        into: UsersTable,
        values: [{
          name: 'Igor'
        }],
        returning: '*'
      })

      const { rows: [user] } = await pg.query(query)

      expect(user.name).toEqual('Igor')
    })
  })

  describe('create and update permission', () => {
    it('#', async () => {
      const insertQuery = INSERT({
        into: PermissionsTable,
        values: [{
          name: 'WRITE'
        }],
        returning: '*'
      })

      const { rows: [permission] } = await pg.query(insertQuery)

      const updateQuery = UPDATE({
        table: PermissionsTable,
        set: {
          userId: UsersTable.id
        },
        from: UsersTable,
        where: [PermissionsTable.name.eq('WRITE'), 'AND', UsersTable.name.eq('Igor')],
        returning: { permission: PermissionsTable.$.all(), userName: UsersTable.name }
      })

      const { rows: [updated] } = await pg.query(updateQuery)

      expect(updated.id).toEqual(permission.id)
    })
  })

  describe('drop table', () => {
    it('drop users and permissions', async () => {
      const query = DROP_TABLE({ names: [UsersTable, PermissionsTable] })
      const { rows } = await pg.query(query)

      expect(query.toQuery()).toEqual(['DROP TABLE users, permissions', []])
      expect(rows).toEqual([])
    })
  })
})
