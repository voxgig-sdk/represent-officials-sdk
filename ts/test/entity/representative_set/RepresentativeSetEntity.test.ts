

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


describe('RepresentativeSetEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when REPRESENT_OFFICIALS_TEST_LIVE=TRUE.
  afterEach(liveDelay('REPRESENT_OFFICIALS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = RepresentOfficialsSDK.test()
    const ent = testsdk.RepresentativeSet()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.REPRESENT_OFFICIALS_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'representative_set.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":0},{"active":true,"name":"name","req":false,"type":"`$STRING`","index$":1},{"active":true,"name":"url","req":false,"type":"`$STRING`","index$":2}],"id":{"field":"id","name":"id"},"name":"representative_set","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"callback","orig":"callback","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"format","orig":"format","reqd":false,"type":"`$STRING`","index$":1},{"active":true,"example":20,"kind":"query","name":"limit","orig":"limit","reqd":false,"type":"`$INTEGER`","index$":2},{"active":true,"example":0,"kind":"query","name":"offset","orig":"offset","reqd":false,"type":"`$INTEGER`","index$":3},{"active":true,"kind":"query","name":"pretty","orig":"pretty","reqd":false,"type":"`$INTEGER`","index$":4}]},"contract":{"id":"GET /representative-sets/","json":"{\"operationId\":\"getRepresentativeSets\",\"parameters\":[{\"description\":\"Number of results per page (default: 20)\",\"in\":\"query\",\"name\":\"limit\",\"schema\":{\"default\":20,\"type\":\"integer\"}},{\"description\":\"Offset for pagination\",\"in\":\"query\",\"name\":\"offset\",\"schema\":{\"default\":0,\"type\":\"integer\"}},{\"description\":\"Output format\",\"in\":\"query\",\"name\":\"format\",\"schema\":{\"enum\":[\"json\",\"apibrowser\"],\"type\":\"string\"}},{\"description\":\"Pretty print JSON output\",\"in\":\"query\",\"name\":\"pretty\",\"schema\":{\"enum\":[0,1],\"type\":\"integer\"}},{\"description\":\"JSONP callback function name\",\"in\":\"query\",\"name\":\"callback\",\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"meta\":{\"properties\":{\"next\":{\"nullable\":true,\"type\":\"string\"},\"previous\":{\"nullable\":true,\"type\":\"string\"},\"total_count\":{\"type\":\"integer\"}},\"type\":\"object\"},\"objects\":{\"items\":{\"properties\":{\"name\":{\"type\":\"string\"},\"url\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/representative-sets/","segments":[{"lit":"representative-sets"}],"select":{"exist":["callback","format","limit","offset","pretty"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"representative_set","reqd":true,"type":"`$STRING`","index$":0}],"query":[{"active":true,"kind":"query","name":"callback","orig":"callback","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"format","orig":"format","reqd":false,"type":"`$STRING`","index$":1},{"active":true,"kind":"query","name":"pretty","orig":"pretty","reqd":false,"type":"`$INTEGER`","index$":2}]},"contract":{"id":"GET /representative-sets/{representativeSet}/","json":"{\"operationId\":\"getRepresentativeSet\",\"parameters\":[{\"description\":\"Representative set identifier (e.g., ontario-legislature)\",\"in\":\"path\",\"name\":\"representativeSet\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Output format\",\"in\":\"query\",\"name\":\"format\",\"schema\":{\"enum\":[\"json\",\"apibrowser\"],\"type\":\"string\"}},{\"description\":\"Pretty print JSON output\",\"in\":\"query\",\"name\":\"pretty\",\"schema\":{\"enum\":[0,1],\"type\":\"integer\"}},{\"description\":\"JSONP callback function name\",\"in\":\"query\",\"name\":\"callback\",\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"name\":{\"type\":\"string\"},\"url\":{\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/representative-sets/{representativeSet}/","rename":{"param":{"representativeSet":"id"}},"segments":[{"lit":"representative-sets"},{"var":"id"}],"select":{"exist":["callback","format","id","pretty"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"representative_set","name__orig":"representative_set","Name":"RepresentativeSet","name_":"representative_set","name-":"representative-set","NAME":"REPRESENTATIVE_SET","index$":6}, {"active":true,"entity":"representative_set","key$":"BasicRepresentativeSetFlow","kind":"basic","name":"BasicRepresentativeSetFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"representative_set_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"representative_set_ref01","srcdatavar":"representative_set_ref01_data","suffix":"_dt0"},"match":{"id":"representative_set01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-representative_set_ref01"}}],"index$":1}]}, 'RepresentativeSet')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let representative_set_ref01_data = Object.values(setup.data.existing.representative_set)[0] as any

    // LIST
    const representative_set_ref01_ent = client.RepresentativeSet()
    const representative_set_ref01_match: any = {}

    const representative_set_ref01_list = (await representative_set_ref01_ent.list(representative_set_ref01_match)).map((e: any) => e.data())


    // LOAD
    const representative_set_ref01_match_dt0: any = {}
    representative_set_ref01_match_dt0.id = representative_set_ref01_data.id
    const representative_set_ref01_data_dt0 = (await representative_set_ref01_ent.load(representative_set_ref01_match_dt0)).data()
    assert(representative_set_ref01_data_dt0.id === representative_set_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/representative_set/RepresentativeSetTestData.json')

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
    ['representative_set01','representative_set02','representative_set03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'REPRESENT_OFFICIALS_TEST_REPRESENTATIVE_SET_ENTID': idmap,
    'REPRESENT_OFFICIALS_TEST_LIVE': 'FALSE',
    'REPRESENT_OFFICIALS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['REPRESENT_OFFICIALS_TEST_REPRESENTATIVE_SET_ENTID']

  const live = 'TRUE' === env.REPRESENT_OFFICIALS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['REPRESENT_OFFICIALS_TEST_REPRESENTATIVE_SET_ENTID']
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
  
