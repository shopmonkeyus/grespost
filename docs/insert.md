# INSERT
INSERT — create new rows in a table

## Synopsis
```ts
function INSERT(config: InsertConfig): QueryDefinition;

interface InsertConfig {
  with?: WithConfig
  into: Table
  overriding?: 'SYSTEM' | 'USER'
  values: 'DEFAULT' | Query | Record<string, any>[] | {
    columns?: string[],
    values: any[][]
  }
  onConflict?: {
    targets?: {
      names: (string | string[])[]
      where?: Condition
    },
    constraint?: string
    action: 'DO NOTHING' | {
      set: AnyExpression[] | Record<string, any>
      where?: Condition
    }
  }
  returning?: FieldsConfig | '*'
}
```

```sql
[ WITH with.recursive:[ RECURSIVE ] with.ctes[] [, ...] ]
INSERT INTO into.name [ AS into.alias ] [ ( into.columns[] [, ...] ) ]
    [ OVERRIDING overriding VALUE ]
    { VALUES values[] [, ...] }
    [ ON CONFLICT [ onConflict.targets | onConflict.constraint ] onConflict.action ]
    [ RETURNING returning ]

where onConflict can be one of:

    ( { onConflict.targets.names[] | ( onConflict.targets.names[][] ) } [, ...] ) [ WHERE onConflict.targets.where ]

    ON CONSTRAINT onConflict.constraint

and onConflict.action is one of:

    DO NOTHING
    DO UPDATE SET { onConflict.action.set [, ...] } [ WHERE onConflict.action.where ]
```
