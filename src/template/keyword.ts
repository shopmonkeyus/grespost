import { Sqlable } from '.'

export const keyword = (name: string, check?: string[]) => {
  if (check && !check.includes(name.toUpperCase())) {
    throw new Error(`'${name}' keyword is not valid. Should be one of '${check.join(' | ')}'`)
  }
  return new Keyword(name)
}

export class Keyword implements Sqlable {
  constructor (public name: string) { }

  toSql () {
    return this.name.toUpperCase()
  }
}
