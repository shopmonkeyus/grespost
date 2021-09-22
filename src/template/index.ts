export * from './identifier'
export * from './keyword'
export * from './eident'

export interface Sqlable {
  toSql(): string
}

export const sql = (strings: TemplateStringsArray, ...literals: any[]) => {
  return new Template([...strings], literals)
}

export const ES = { toSql: () => '' }

export const sv = (values: any[], separator = ', ', wrap = '') => {
  const [l = '', r = ''] = wrap.split('')
  if (values.length === 0) return sql``
  const commas = new Array(values.length - 1).fill(separator)
  return new Template([l, ...commas, r], values)
}

export const operator = (operator: string) => {
  const op = operator.slice(0)
  if (!/^[+\-*/<>=~!@#%^&|`?]{1,63}$/.test(op)) throw new Error(`Invalid operator: ${op}`)
  if (/(--|\/\*)/gm.test(op)) throw new Error(`Invalid operator: ${op}`)
  if (op.length > 1 && /[+-]$/.test(op) && !/^[~!@#%^&|`?]+[+-]$/.test(op)) throw new Error(`Invalid operator: ${op}`)
  return { toSql: () => op }
}

export class Template {
  constructor (public strings: string[], public literals: any[]) { }

  get text () {
    return this.toQuery()[0]
  }

  get values () {
    return this.toQuery()[1]
  }

  toQuery (start = 1): [string, any[]] {
    let str = ''
    const vals = []

    for (let i = 0; i < this.literals.length; i++) {
      if (this.literals[i] instanceof Template) {
        const [s, l] = this.literals[i].toQuery(start)
        str += `${this.strings[i]}${s}`
        vals.push(...l)
        start += l.length
      } else {
        if (this.literals[i] && typeof this.literals[i].toSql === 'function') {
          str += `${this.strings[i]}${this.literals[i].toSql()}`
        } else {
          str += `${this.strings[i]}$${start}`
          vals.push(this.literals[i])
          start++
        }
      }
    }

    str += this.strings[this.strings.length - 1]

    return [str, vals]
  }
}
