## Grespost

Эта библиотека была вдохновлена идеей написания полноценного конструктора запросов для Postgres. Такого, который позволил бы полностью избавится от использования строковых литералов при описаниии SQL запросов.

Библиотека писалась согласно официальной документации Postgres, и включает в себя весь базовый набор функционала для работы с данной СУБД. 
А именно:
- Функции манипуляции и получения данных (`SELECT`, `INSERT`, `DELETE`, `UPDATE`, `VALUES`)
- Функции менеджмента таблиц и индексов (`CREATE`, `DROP`, `ALTER`)
- Методы работы с SQL выражениями. (Унарные и бинарные операторы)
- Огромный набор маппингов стандартных функций
- Методы описания схем таблиц и других источников данных
- Тегированные шаблонные строки (На случай если мы что то упустили)

Библиотека разрабатывалась с мыслями о строгой типизации и выведении типов, использовалось всё доступное могущество typescript.

В отличии от других конструкторов запросов `grespost` имеет декларативный интерфейс. Что, само по себе, намного ближе к тому как мы пишем sql запросы нативно.

Сама по себе библиотека не умеет делать запросы, однако удовлетворяет интерфейс популярного драйвера `node-pg`

### 🔥 Install

```sh
npm i grespost
```

## 📚 Documentation

### Source schema declaration

Описание схем источников данных (таблиц, отображений) один из важных элемнтов работы с данной библиотекой. Схеммы позволяют получить информацию о типах, а так же предоставляют удобный интерфейс взаимодействия с идентификаторами колонок и построения выражений.

Для описания схеммы испольуется функция `source` со следующей сигнатурой:
```ts
function source<T extends Record<string, Type>> (name: string, types: T): Table<T>
```

Как видно, для описания схеммы используется тип `Type` который описывает Postgres Data Type. Данная библиотека включает в себя следующий наборт поддерживаемых типов:
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
function DOUBLE(): DoubleType // Aka FLOAT8 or DOUBLE PRECISION

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
Все перечислинные типы данных имеют набор методов для описания констрейнтов колонок, необходимых при создании таблицы:
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

Теперь у нас есть всё необходимое что бы описать схемму таблицы.
Для примера я опишу пару таблиц (Юзеры и Пермиссии)
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

Как видите при обьявлении схемм мы воспользовались стандартной функцией postgres `GEN_RANDOM_UUID()`, данная библиотека имеет огромное количество маппингов на стандартные функции postgres, полный их перечень можно увидеть [здесь](https://github.com/shopmonkeyus/grespost/tree/master/src/functions).

### Table creation
Создание таблицы в `grespost` производится с использованием функции `CREATE_TABLE` которая имеет следующую сигнатуру:

```typescript
function CREATE_TABLE(config: CreateTableConfig): QueryDefinition

interface CreateTableConfig {
  namespace?: 'GLOBAL' | 'LOCAL'
  type?: 'TEMPORARY' | 'UNLOGGED'
  ifNotExists?: boolean
  name: string | Table
  partitionOf?: string

  definition?: {
    columns: Record<string, Type>
    constraints?: Template[]
  }

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
Как видите создание sql запроса происходит декларативно, через описание некторого javascript обьекта, на выходе данная функция вернёт класс который можно передать напрямую в `node-pg`

Давайте для примера создадим нашу таблицу Юзеры:
```ts
import { UsersTable, PermissionsTable } from './schemas'
import pg from 'pg'
import { CREATE_TABLE } from 'grespost'

const createUsersTable = CREATE_TABLE({
  ifNotExists: true,
  name: UsersTable,
  definition: {
    columns: UsersTable.$.types
  }
})

console.log(createUsersTable.toQuery())
/*
  СREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY DEFAULT GEN_RANDOM_UUID()
    name TEXT NOT NULL
  )
*/

pg.query(createUsersTable) // void
```




### ⭐️ Show your support

Give a ⭐️ if this project helped you!

### 🤝 Contributing

Contributions, issues and feature requests are welcome!
Feel free to check [issues page](https://github.com/shopmonkeyus/grespost/issues)

#### TODO
- TRANSACTIONS
- PGSQL 14


### 👤 Authors

**shopmonkeyus**

* Website: https://www.shopmonkey.io/
* Github: [@shopmonkeyus](https://github.com/shopmonkeyus)
* LinkedIn: [@https:\/\/www.linkedin.com\/company\/shopmonkey\/](https://linkedin.com/in/https:\/\/www.linkedin.com\/company\/shopmonkey\/)

**Igor Solomakha**

* Github: [@sujimoshi](https://github.com/Sujimoshi)
* LinkedIn: [@Igor Solomakha](https://www.linkedin.com/in/isolomakha/)
