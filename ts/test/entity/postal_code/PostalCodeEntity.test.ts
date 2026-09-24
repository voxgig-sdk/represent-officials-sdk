

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { RepresentOfficialsSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('PostalCodeEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when REPRESENT_OFFICIALS_TEST_LIVE=TRUE.
  afterEach(liveDelay('REPRESENT_OFFICIALS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = RepresentOfficialsSDK.test()
    const ent = testsdk.PostalCode()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.REPRESENT_OFFICIALS_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'postal_code.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"boundaries_centroid":{"a":true,"h":"Boundaries Centroid","n":"boundaries_centroid","r":false,"sh":"Boundaries containing the postal code's centroid","t":"`$ARRAY`","key$":"boundaries_centroid","index$":0},"boundaries_concordance":{"a":true,"h":"Boundaries Concordance","n":"boundaries_concordance","r":false,"sh":"Boundaries linked to postal code via official data","t":"`$ARRAY`","key$":"boundaries_concordance","index$":1},"centroid":{"a":true,"h":"Centroid","n":"centroid","r":false,"t":"`$OBJECT`","key$":"centroid","index$":2},"city":{"a":true,"h":"City","n":"city","r":false,"sh":"City name","t":"`$STRING`","key$":"city","index$":3},"code":{"a":true,"h":"Code","n":"code","r":false,"sh":"The postal code","t":"`$STRING`","key$":"code","index$":4},"province":{"a":true,"h":"Province","n":"province","r":false,"sh":"Province code","t":"`$STRING`","key$":"province","index$":5},"representatives_centroid":{"a":true,"h":"Representatives Centroid","n":"representatives_centroid","r":false,"sh":"Representatives for boundaries containing centroid","t":"`$ARRAY`","key$":"representatives_centroid","index$":6},"representatives_concordance":{"a":true,"h":"Representatives Concordance","n":"representatives_concordance","r":false,"sh":"Representatives for boundaries via concordance","t":"`$ARRAY`","key$":"representatives_concordance","index$":7}},"name":"postal_code","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /postcodes/{postalCode}/","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"postal_code","or":"postal_code","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"callback","or":"callback","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"format","or":"format","r":false,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"pretty","or":"pretty","r":false,"t":"`$INTEGER`","index$":2},{"a":true,"k":"query","n":"set","or":"set","r":false,"t":"`$STRING`","index$":3}]},"k":"http","m":"GET","o":"/postcodes/{postalCode}/","q":{"exist":["callback","format","postal_code","pretty","set"]},"r":{"param":{"postalCode":"postal_code"}},"s":[{"lit":"postcodes"},{"var":"postal_code"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"postal_code","name__orig":"postal_code","Name":"PostalCode","name_":"postal_code","name-":"postal-code","NAME":"POSTAL_CODE","index$":4}, {"active":true,"entity":"postal_code","key$":"BasicPostalCodeFlow","kind":"basic","name":"BasicPostalCodeFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"postal_code_ref01","srcdatavar":"postal_code_ref01_data","suffix":"_dt0"},"m":{"id":"postal_code01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-postal_code_ref01"}}],"index$":0}]}, 'PostalCode', {"GET /postcodes/{postalCode}/":{"protocol":"http","operationId":"getByPostalCode","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"code":{"type":"string","description":"The postal code","key$":"code"},"city":{"type":"string","description":"City name","key$":"city"},"province":{"type":"string","description":"Province code","key$":"province"},"centroid":{"type":"object","properties":{"type":{"type":"string"},"coordinates":{"type":"array","items":{"type":"number"}}},"key$":"centroid"},"boundaries_centroid":{"type":"array","description":"Boundaries containing the postal code's centroid","items":{"type":"object"},"key$":"boundaries_centroid"},"boundaries_concordance":{"type":"array","description":"Boundaries linked to postal code via official data","items":{"type":"object"},"key$":"boundaries_concordance"},"representatives_centroid":{"type":"array","description":"Representatives for boundaries containing centroid","items":{"type":"object"},"key$":"representatives_centroid"},"representatives_concordance":{"type":"array","description":"Representatives for boundaries via concordance","items":{"type":"object"},"key$":"representatives_concordance"}},"index$":0}}}},"503":{"description":"Rate limit exceeded"}},"parameters":[{"name":"postalCode","in":"path","required":true,"description":"Canadian postal code in uppercase with no spaces (e.g., L5G4L3)","schema":{"type":"string","pattern":"^[A-Z][0-9][A-Z][0-9][A-Z][0-9]$"},"index$":0},{"name":"sets","in":"query","description":"Limit results to specific boundary sets (comma-separated)","schema":{"type":"string"},"index$":1},{"name":"format","in":"query","description":"Output format","schema":{"type":"string","enum":["json","apibrowser"]},"index$":2},{"name":"pretty","in":"query","description":"Pretty print JSON output","schema":{"type":"integer","enum":[0,1]},"index$":3},{"name":"callback","in":"query","description":"JSONP callback function name","schema":{"type":"string"},"index$":4}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let postal_code_ref01_data = Object.values(setup.data.existing.postal_code)[0] as any

    // LOAD: skipped — no entity id field and load requires path params.
    // Entity-var is declared here so later flow steps still compile.
    const postal_code_ref01_ent = client.PostalCode()


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/postal_code/PostalCodeTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = RepresentOfficialsSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['postal_code01','postal_code02','postal_code03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'REPRESENT_OFFICIALS_TEST_POSTAL_CODE_ENTID': idmap,
    'REPRESENT_OFFICIALS_TEST_LIVE': 'FALSE',
    'REPRESENT_OFFICIALS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['REPRESENT_OFFICIALS_TEST_POSTAL_CODE_ENTID']

  const live = 'TRUE' === env.REPRESENT_OFFICIALS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['REPRESENT_OFFICIALS_TEST_POSTAL_CODE_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new RepresentOfficialsSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.REPRESENT_OFFICIALS_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
