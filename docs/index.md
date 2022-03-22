## Overview

This library was inspired by the idea of writing a complete query builder for Postgres. One that would completely get rid of the use of string literals when describing SQL queries.

The library was written according to the official Postgres documentation, and includes the entire basic set of functionality for working with this DBMS.
Functionality overview:
- Data manipulation and retrieval functions (`SELECT`, `INSERT`, `DELETE`, `UPDATE`, `VALUES`)
- Table and index management functions (`CREATE`, `DROP`, `ALTER`)
- Methods of working with SQL expressions. (Unary and binary operators)
- Huge set of standard function mappings
- Methods for describing table schemas and other data sources
- Tagged Template Strings (In case you need more)

The library was developed with strong typing and type inference in mind, using all the available power of typescript.

Unlike other query builders, `grespost` has a declarative interface. Which, in itself, is much closer to how we write sql queries natively.

The library itself does not know how to make requests, but satisfies the interface of the popular nodejs postgres driver `node-pg`

## 📚 Documentation

### SOURCE SCHEMAS

Description of schemas of data sources (tables, views) is one of the important elements of working with this library. Schemas allow you to get information about types, as well as provide a convenient interface for interacting with column identifiers and building expressions.

The schema is described using the `source` function with the following signature:
```ts
function source<T extends Record<string, Type>> (name: string, types: T): Table<T>
```

As you can see, the `Type` type is used to describe the column types, which maps to the Postgres Data Type. This library includes the following set of supported types:
```typescript
// Bit/Byte/Bool types
function BOOLEAN(): BooleanType
function BYTEA(): ByteaType
function BIT(n?: number): BitType
function VARBIT(n?: number): VarbitType

// String types
function TEXT(): TextType
function CHAR(n?: number): CharType
function VARCHAR(n?: number): VarcharType
function UUID(): UUIDType

// Math types
function SMALLINT(): SmallintType
function INTEGER(): IntegerType
function BIGINT(): BigintType
function NUMERIC(): NumerciType
function REAL(): RealType
function DOUBLE(): DoubleType // Aka DOUBLE PRECISION (FLOAT8)

// Serial types
function SMALLSERIAL(): SmallintType
function SERIAL(): IntegerType
function BIGSERIAL(): BigintType

// Text Search types
function TSQUERY(): TSQueryType
function TSVECTOR(): TSVecorType

// Date/Time types
function DATE(): DateType
function INTERVAL(): IntervalType
function TIME(): TimeType
function TIMETZ(): TimetzType
function TIMESTAMP(): TimestampType
function TIMESTAMPTZ(): TimestamptzType

// Complex types
function ARRAY(of: Type): ArrayType<Type>
function JSON<T>(): JSONType<T>
function JSONB<T>(): JSONBType<T>
```
All of the listed data types have a set of methods for describing the column constraints required when creating a table:
```ts
interface Type {
  required (conf?: ConstraintConfig): Type

  default (value: any, conf?: ConstraintConfig): Type

  check (expression: Condition, conf?: ConstraintConfig & { noInherit?: boolean }): Type

  generated (type: 'ALWAYS' | 'BY DEFAULT', conf?: ConstraintConfig & { expression?: Expression, identity?: any }): Type

  unique (params?: IndexParametersConfig & ConstraintConfig): Type

  primary (params?: IndexParametersConfig & ConstraintConfig): Type

  references (table: string | Table, conf?: ReferenceConfig<string | Expression> & ConstraintConfig): Type
}
```

Now we have everything we need to describe the table schema.
For example, I will describe a couple of tables (Users and Permissions)
```ts
// schemas.ts
import { source, UUID, TEXT, GEN_RANDOM_UUID } from 'grespost'

export type User = typeof UsersTable.$.type
export const UsersTable = source('users', {
  id: UUID().primary().default(GEN_RANDOM_UUID()),
  name: TEXT().required()
})

export type Permission = typeof PermissionsTable.$.type
export const PermissionsTable = source('permissions', {
  id: UUID().primary().default(GEN_RANDOM_UUID()),
  name: TEXT().required(),
  userId: UUID().references(UsersTable)
})
```

As you can see, when declaring schemas, we used the standard postgres function `GEN_RANDOM_UUID()`, this library has a huge number of mappings to standard postgres functions, a complete list of them you can find [here] (https://github.com/shopmonkeyus/grespost/tree/ master/src/functions).
### Table creation deletion and altering

#### CREATE TABLE
Creating a table in `grespost` is done using the `CREATE_TABLE` function which has the following signature:

```typescript
function CREATE_TABLE(config: CreateTableConfig): QueryDefinition

interface CreateTableConfig {
  namespace?: 'GLOBAL' | 'LOCAL'
  type?: 'TEMPORARY' | 'UNLOGGED'
  ifNotExists?: boolean
  partitionOf?: string
  schema: Table | string | {
    name: Table | string
    columns: Table | Record<string, Type>
  }
  constraints?: Template[]
  forValues?: PartitionBoundConfig
  inherits?: string[]
  partitionBy?: {
    type: 'RANGE' | 'LIST' | 'HASH',
    by: (string | Expression)[]
  }
  using?: string
  with?: Record<string, any> | 'WITHOUT OIDS'
  onCommit?: 'PRESERVE ROWS' | 'DELETE ROWS' | 'DROP'
  tablespace?: string
}
```
As you can see, the creation of an sql query occurs declaratively, through the declaration of some javascript object, at the output this function will return a class that can be passed directly to `node-pg`

Let's create our `users` table as an example:
```ts
import { UsersTable, PermissionsTable } from './schemas'
import pg from 'pg'
import { CREATE_TABLE } from 'grespost'

/*
  СREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY DEFAULT GEN_RANDOM_UUID()
    name TEXT NOT NULL
  )
*/
await pg.query(CREATE_TABLE({
  ifNotExists: true,
  schema: UsersTable,
}))

await pg.query(CREATE_TABLE({ schema: PermissionsTable }))
```

#### ALTER TABLE

Изменение схем таблиц важный элемент эволюции любого проекта. Для этих целей `grespost` предоставляет метод `ALTER_TABLE`:
```ts
function ALTER_TABLE (config: AlterTableConfig): QueryDefinition

interface AlterTableConfig {
  ifExists?: boolean;
  table: Table | {
    only?: boolean;
    table: Table
  }
  actions: Template[]
}
```

а так же набор функций для построения/изменения констрейнтов колонок (alter table actions):
```ts
// Actions:
function RENAME_TABLE (name: string): Template
function RENAME_CONSTRAINT (old: string, name: string): Template
function RENAME_COLUMN (old: string, name: string): Template
function SET_TABLE_SCHEMA (schema: string): Template
function ATTACH_PARTITION (name: string, forValues: PartitionBoundConfig): Template
function DETACH_PARTITION (name: string): Template
function ADD_COLUMN (name: string, type: Type, config: { constraints?: Template[], collation: string, ifNotExists?: boolean }): Template
function DROP_COLUMN (name: string, config: { ifExists?: boolean, type?: 'RESTRICT' | 'CACADE' }): Template
function SET_COLUMN_DEFAULT (name: string, value: any): Template
function DROP_COLUMN_DEFAULT (name: string): Template
function SET_COLUMN_NOT_NULL (name: string): Template
function DROP_COLUMN_NOT_NULL (name: string): Template
function DROP_CONSTRAINT (name: string, config: { ifExists?: boolean, type?: 'RESTRICT' | 'CACADE' }): Template
function ADD_TABLE_CONSTRAINT (constraint: Template, notValid?: boolean): Template
```

Для примера давайте изменим required констрейнт колонки `name` нашей таблицы `users`, а так же добавим для неё дефолтное значение:
```ts
import { UsersTable } from './schemas'
import pg from 'pg'
import { ALTER_TABLE, SET_COLUMN_NOT_NULL } from 'grespost'

/*
  ALTER TABLE IF EXISTS users 
    ALTER COLUMN name SET NOT NULL
    ALTER COLUMN name SET DEFAULT 'Anonymous'
*/
await pg.query(ALTER_TABLE({
  ifExists: true,
  table: UsersTable,
  actions: [
    SET_COLUMN_NOT_NULL('name'),
    SET_COLUMN_DEFAULT('name', 'Anonymous')
  ]
}))
```

#### DROP TABLE
Для удаления таблицы воспользуйтесь функцией `DROP_TABLE`:
```ts
function DROP_TABLE (config: DropTableConfig): QueryDefinition

interface DropTableConfig {
  ifExists?: boolean
  names: (string | Table)[]
  constraint?: 'CASCADE' | 'RESTRICT'
}

// Example of deletion of permissions table:
DROP_TABLE({ ifExists: true, names: [PermissionsTable] }) 
```

### Data Manipulation

#### INSERT
`INSERT` inserts new rows into a table. One can insert one or more rows specified by value expressions, or zero or more rows resulting from a query.



## ⭐️ Show your support

Give a ⭐️ if this project helped you!

## 🤝 Contributing

Contributions, issues and feature requests are welcome!
Feel free to check [issues page](https://github.com/shopmonkeyus/grespost/issues)

### TODO
- TRANSACTIONS
- PGSQL 14


## 👤 Authors

**shopmonkeyus**

* Website: https://www.shopmonkey.io/
* Github: [@shopmonkeyus](https://github.com/shopmonkeyus)
* LinkedIn: [@shopmonkey](https://linkedin.com/in/https:\/\/www.linkedin.com\/company\/shopmonkey\/)

**Igor Solomakha**

* Github: [@sujimoshi](https://github.com/Sujimoshi)
* LinkedIn: [@Igor Solomakha](https://www.linkedin.com/in/isolomakha/)
