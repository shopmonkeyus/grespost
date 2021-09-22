import { Sqlable } from '.'
import { eident } from './eident'

export const identifier = (...path: string[]) => {
  return new Identifier(path)
}

export class Identifier implements Sqlable {
  constructor (public path: string[]) {}

  toSql () {
    return this.path.map(eident).join('.')
  }
}
