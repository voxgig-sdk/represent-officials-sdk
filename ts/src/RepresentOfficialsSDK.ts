// RepresentOfficials Ts SDK

import { BoundaryEntity } from './entity/BoundaryEntity'
import { BoundarySetEntity } from './entity/BoundarySetEntity'
import { CandidateEntity } from './entity/CandidateEntity'
import { ElectionEntity } from './entity/ElectionEntity'
import { PostalCodeEntity } from './entity/PostalCodeEntity'
import { RepresentatifEntity } from './entity/RepresentatifEntity'
import { RepresentativeSetEntity } from './entity/RepresentativeSetEntity'

export type * from './RepresentOfficialsTypes'


import { inspect } from 'node:util'

import type { Context, Feature } from './types'

import { config } from './Config'
import { RepresentOfficialsEntityBase } from './RepresentOfficialsEntityBase'
import { Utility } from './utility/Utility'


import { BaseFeature } from './feature/base/BaseFeature'


const stdutil = new Utility()


class RepresentOfficialsSDK {
  _mode: string = 'live'
  _options: any
  _utility = new Utility()
  _features: Feature[]
  _rootctx: Context

  constructor(options?: any) {

    this._rootctx = this._utility.makeContext({
      client: this,
      utility: this._utility,
      config,
      options,
      shared: new WeakMap()
    })

    this._options = this._utility.makeOptions(this._rootctx)

    const struct = this._utility.struct
    const getpath = struct.getpath
    const items = struct.items

    if (true === getpath(this._options.feature, 'test.active')) {
      this._mode = 'test'
    }

    this._rootctx.options = this._options

    this._features = []

    const featureAdd = this._utility.featureAdd
    const featureInit = this._utility.featureInit

    items(this._options.feature, (fitem: [string, any]) => {
      const fname = fitem[0]
      const fopts = fitem[1]
      if (fopts.active) {
        featureAdd(this._rootctx, this._rootctx.config.makeFeature(fname))
      }
    })

    if (null != this._options.extend) {
      for (let f of this._options.extend) {
        featureAdd(this._rootctx, f)
      }
    }

    for (let f of this._features) {
      featureInit(this._rootctx, f)
    }

    const featureHook = this._utility.featureHook
    featureHook(this._rootctx, 'PostConstruct')
  }


  options() {
    return this._utility.struct.clone(this._options)
  }


  utility() {
    return this._utility.struct.clone(this._utility)
  }


  async prepare(fetchargs?: any) {
    const utility = this._utility
    const struct = utility.struct
    const clone = struct.clone

    const {
      makeContext,
      makeFetchDef,
      prepareHeaders,
      prepareAuth,
    } = utility

    fetchargs = fetchargs || {}

    let ctx: Context = makeContext({
      opname: 'prepare',
      ctrl: fetchargs.ctrl || {},
    }, this._rootctx)

    const options = this._options

    // Build spec directly from SDK options + user-provided fetch args.
    const spec: any = {
      base: options.base,
      prefix: options.prefix,
      suffix: options.suffix,
      path: fetchargs.path || '',
      method: fetchargs.method || 'GET',
      params: fetchargs.params || {},
      query: fetchargs.query || {},
      headers: prepareHeaders(ctx),
      body: fetchargs.body,
      step: 'start',
    }

    ctx.spec = spec

    // Merge user-provided headers over SDK defaults.
    if (fetchargs.headers) {
      const uheaders = fetchargs.headers
      for (let key in uheaders) {
        spec.headers[key] = uheaders[key]
      }
    }

    // Apply SDK auth (apikey, auth prefix, etc.)
    const authResult = prepareAuth(ctx)
    if (authResult instanceof Error) {
      return authResult
    }

    return makeFetchDef(ctx)
  }


  async direct(fetchargs?: any) {
    const utility = this._utility
    const fetcher = utility.fetcher
    const makeContext = utility.makeContext

    const fetchdef = await this.prepare(fetchargs)
    if (fetchdef instanceof Error) {
      return fetchdef
    }

    let ctx: Context = makeContext({
      opname: 'direct',
      ctrl: (fetchargs || {}).ctrl || {},
    }, this._rootctx)

    try {
      const fetched = await fetcher(ctx, fetchdef.url, fetchdef)

      if (null == fetched) {
        return { ok: false, err: ctx.error('direct_no_response', 'response: undefined') }
      }
      else if (fetched instanceof Error) {
        return { ok: false, err: fetched }
      }

      const status = fetched.status

      // No body responses (204 No Content, 304 Not Modified) and explicit
      // zero content-length must skip JSON parsing — fetched.json() would
      // throw `Unexpected end of JSON input` on an empty body.
      const headers = fetched.headers
      const contentLength = headers && 'function' === typeof headers.get
        ? headers.get('content-length')
        : (headers || {})['content-length']
      const noBody = 204 === status || 304 === status || '0' === String(contentLength)

      let json: any = undefined
      if (!noBody) {
        try {
          json = 'function' === typeof fetched.json ? await fetched.json() : fetched.json
        }
        catch (parseErr) {
          // Body wasn't valid JSON — surface the raw response rather than
          // throwing. data stays undefined; callers can inspect status/headers.
          json = undefined
        }
      }

      return {
        ok: status >= 200 && status < 300,
        status,
        headers: fetched.headers,
        data: json,
      }
    }
    catch (err: any) {
      return { ok: false, err }
    }
  }



  _boundary?: BoundaryEntity

  // Idiomatic facade: `client.boundary.list()` / `client.boundary.load({ id })`.
  get boundary(): BoundaryEntity {
    return (this._boundary ??= new BoundaryEntity(this, undefined))
  }

  /** @deprecated Use `client.boundary` instead. */
  Boundary(data?: any) {
    const self = this
    return new BoundaryEntity(self,data)
  }


  _boundary_set?: BoundarySetEntity

  // Idiomatic facade: `client.boundary_set.list()` / `client.boundary_set.load({ id })`.
  get boundary_set(): BoundarySetEntity {
    return (this._boundary_set ??= new BoundarySetEntity(this, undefined))
  }

  /** @deprecated Use `client.boundary_set` instead. */
  BoundarySet(data?: any) {
    const self = this
    return new BoundarySetEntity(self,data)
  }


  _candidate?: CandidateEntity

  // Idiomatic facade: `client.candidate.list()` / `client.candidate.load({ id })`.
  get candidate(): CandidateEntity {
    return (this._candidate ??= new CandidateEntity(this, undefined))
  }

  /** @deprecated Use `client.candidate` instead. */
  Candidate(data?: any) {
    const self = this
    return new CandidateEntity(self,data)
  }


  _election?: ElectionEntity

  // Idiomatic facade: `client.election.list()` / `client.election.load({ id })`.
  get election(): ElectionEntity {
    return (this._election ??= new ElectionEntity(this, undefined))
  }

  /** @deprecated Use `client.election` instead. */
  Election(data?: any) {
    const self = this
    return new ElectionEntity(self,data)
  }


  _postal_code?: PostalCodeEntity

  // Idiomatic facade: `client.postal_code.list()` / `client.postal_code.load({ id })`.
  get postal_code(): PostalCodeEntity {
    return (this._postal_code ??= new PostalCodeEntity(this, undefined))
  }

  /** @deprecated Use `client.postal_code` instead. */
  PostalCode(data?: any) {
    const self = this
    return new PostalCodeEntity(self,data)
  }


  _representatif?: RepresentatifEntity

  // Idiomatic facade: `client.representatif.list()` / `client.representatif.load({ id })`.
  get representatif(): RepresentatifEntity {
    return (this._representatif ??= new RepresentatifEntity(this, undefined))
  }

  /** @deprecated Use `client.representatif` instead. */
  Representatif(data?: any) {
    const self = this
    return new RepresentatifEntity(self,data)
  }


  _representative_set?: RepresentativeSetEntity

  // Idiomatic facade: `client.representative_set.list()` / `client.representative_set.load({ id })`.
  get representative_set(): RepresentativeSetEntity {
    return (this._representative_set ??= new RepresentativeSetEntity(this, undefined))
  }

  /** @deprecated Use `client.representative_set` instead. */
  RepresentativeSet(data?: any) {
    const self = this
    return new RepresentativeSetEntity(self,data)
  }




  static test(testoptsarg?: any, sdkoptsarg?: any) {
    const struct = stdutil.struct
    const setpath = struct.setpath
    const getdef = struct.getdef
    const clone = struct.clone
    const setprop = struct.setprop

    const sdkopts = getdef(clone(sdkoptsarg), {})
    const testopts = getdef(clone(testoptsarg), {})
    setprop(testopts, 'active', true)
    setpath(sdkopts, 'feature.test', testopts)

    const testsdk = new RepresentOfficialsSDK(sdkopts)
    testsdk._mode = 'test'

    return testsdk
  }


  tester(testopts?: any, sdkopts?: any) {
    return RepresentOfficialsSDK.test(testopts, sdkopts)
  }


  toJSON() {
    return { name: 'RepresentOfficials' }
  }

  toString() {
    return 'RepresentOfficials ' + this._utility.struct.jsonify(this.toJSON())
  }

  [inspect.custom]() {
    return this.toString()
  }

}




const SDK = RepresentOfficialsSDK


export {
  stdutil,

  BaseFeature,
  RepresentOfficialsEntityBase,

  RepresentOfficialsSDK,
  SDK,
}


