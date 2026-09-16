

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


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"boundaries_centroid","req":false,"short":"Boundaries containing the postal code's centroid","type":"`$ARRAY`","index$":0},{"active":true,"name":"boundaries_concordance","req":false,"short":"Boundaries linked to postal code via official data","type":"`$ARRAY`","index$":1},{"active":true,"name":"centroid","req":false,"type":"`$OBJECT`","index$":2},{"active":true,"name":"city","req":false,"short":"City name","type":"`$STRING`","index$":3},{"active":true,"name":"code","req":false,"short":"The postal code","type":"`$STRING`","index$":4},{"active":true,"name":"province","req":false,"short":"Province code","type":"`$STRING`","index$":5},{"active":true,"name":"representatives_centroid","req":false,"short":"Representatives for boundaries containing centroid","type":"`$ARRAY`","index$":6},{"active":true,"name":"representatives_concordance","req":false,"short":"Representatives for boundaries via concordance","type":"`$ARRAY`","index$":7}],"name":"postal_code","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"postal_code","orig":"postal_code","reqd":true,"type":"`$STRING`","index$":0}],"query":[{"active":true,"kind":"query","name":"callback","orig":"callback","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"format","orig":"format","reqd":false,"type":"`$STRING`","index$":1},{"active":true,"kind":"query","name":"pretty","orig":"pretty","reqd":false,"type":"`$INTEGER`","index$":2},{"active":true,"kind":"query","name":"set","orig":"set","reqd":false,"type":"`$STRING`","index$":3}]},"contract":{"id":"GET /postcodes/{postalCode}/","json":"{\"operationId\":\"getByPostalCode\",\"parameters\":[{\"description\":\"Canadian postal code in uppercase with no spaces (e.g., L5G4L3)\",\"in\":\"path\",\"name\":\"postalCode\",\"required\":true,\"schema\":{\"pattern\":\"^[A-Z][0-9][A-Z][0-9][A-Z][0-9]$\",\"type\":\"string\"}},{\"description\":\"Limit results to specific boundary sets (comma-separated)\",\"in\":\"query\",\"name\":\"sets\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Output format\",\"in\":\"query\",\"name\":\"format\",\"schema\":{\"enum\":[\"json\",\"apibrowser\"],\"type\":\"string\"}},{\"description\":\"Pretty print JSON output\",\"in\":\"query\",\"name\":\"pretty\",\"schema\":{\"enum\":[0,1],\"type\":\"integer\"}},{\"description\":\"JSONP callback function name\",\"in\":\"query\",\"name\":\"callback\",\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"boundaries_centroid\":{\"description\":\"Boundaries containing the postal code's centroid\",\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"boundaries_concordance\":{\"description\":\"Boundaries linked to postal code via official data\",\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"centroid\":{\"properties\":{\"coordinates\":{\"items\":{\"type\":\"number\"},\"type\":\"array\"},\"type\":{\"type\":\"string\"}},\"type\":\"object\"},\"city\":{\"description\":\"City name\",\"type\":\"string\"},\"code\":{\"description\":\"The postal code\",\"type\":\"string\"},\"province\":{\"description\":\"Province code\",\"type\":\"string\"},\"representatives_centroid\":{\"description\":\"Representatives for boundaries containing centroid\",\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"representatives_concordance\":{\"description\":\"Representatives for boundaries via concordance\",\"items\":{\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"503\":{\"description\":\"Rate limit exceeded\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/postcodes/{postalCode}/","rename":{"param":{"postalCode":"postal_code"}},"segments":[{"lit":"postcodes"},{"var":"postal_code"}],"select":{"exist":["callback","format","postal_code","pretty","set"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["postcode"]]},"key$":"postal_code","name__orig":"postal_code","Name":"PostalCode","name_":"postal_code","name-":"postal-code","NAME":"POSTAL_CODE","index$":4}, {"active":true,"entity":"postal_code","key$":"BasicPostalCodeFlow","kind":"basic","name":"BasicPostalCodeFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"postal_code_ref01","srcdatavar":"postal_code_ref01_data","suffix":"_dt0"},"match":{"id":"postal_code01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-postal_code_ref01"}}],"index$":0}]}, 'PostalCode')
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
    ['postal_code01','postal_code02','postal_code03','postcode01','postcode02','postcode03'],
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
  
