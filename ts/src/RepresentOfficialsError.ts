
import { Context } from './Context'


class RepresentOfficialsError extends Error {

  isRepresentOfficialsError = true

  sdk = 'RepresentOfficials'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  RepresentOfficialsError
}

