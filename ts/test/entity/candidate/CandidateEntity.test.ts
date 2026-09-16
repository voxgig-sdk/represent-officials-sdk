

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


describe('CandidateEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when REPRESENT_OFFICIALS_TEST_LIVE=TRUE.
  afterEach(liveDelay('REPRESENT_OFFICIALS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = RepresentOfficialsSDK.test()
    const ent = testsdk.Candidate()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.REPRESENT_OFFICIALS_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'candidate.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"meta","req":false,"type":"`$OBJECT`","index$":0},{"active":true,"name":"objects","req":false,"type":"`$ARRAY`","index$":1}],"name":"candidate","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"callback","orig":"callback","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"format","orig":"format","reqd":false,"type":"`$STRING`","index$":1},{"active":true,"example":20,"kind":"query","name":"limit","orig":"limit","reqd":false,"type":"`$INTEGER`","index$":2},{"active":true,"example":0,"kind":"query","name":"offset","orig":"offset","reqd":false,"type":"`$INTEGER`","index$":3},{"active":true,"kind":"query","name":"pretty","orig":"pretty","reqd":false,"type":"`$INTEGER`","index$":4}]},"contract":{"id":"GET /candidates/","json":"{\"operationId\":\"getCandidates\",\"parameters\":[{\"description\":\"Number of results per page (default: 20)\",\"in\":\"query\",\"name\":\"limit\",\"schema\":{\"default\":20,\"type\":\"integer\"}},{\"description\":\"Offset for pagination\",\"in\":\"query\",\"name\":\"offset\",\"schema\":{\"default\":0,\"type\":\"integer\"}},{\"description\":\"Output format\",\"in\":\"query\",\"name\":\"format\",\"schema\":{\"enum\":[\"json\",\"apibrowser\"],\"type\":\"string\"}},{\"description\":\"Pretty print JSON output\",\"in\":\"query\",\"name\":\"pretty\",\"schema\":{\"enum\":[0,1],\"type\":\"integer\"}},{\"description\":\"JSONP callback function name\",\"in\":\"query\",\"name\":\"callback\",\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"meta\":{\"properties\":{\"next\":{\"nullable\":true,\"type\":\"string\"},\"previous\":{\"nullable\":true,\"type\":\"string\"},\"total_count\":{\"type\":\"integer\"}},\"type\":\"object\"},\"objects\":{\"items\":{\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/candidates/","segments":[{"lit":"candidates"}],"select":{"exist":["callback","format","limit","offset","pretty"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"candidate","name__orig":"candidate","Name":"Candidate","name_":"candidate","name-":"candidate","NAME":"CANDIDATE","index$":2}, {"active":true,"entity":"candidate","key$":"BasicCandidateFlow","kind":"basic","name":"BasicCandidateFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"candidate_ref01"}}],"index$":0}]}, 'Candidate')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let candidate_ref01_data = Object.values(setup.data.existing.candidate)[0] as any

    // LIST
    const candidate_ref01_ent = client.Candidate()
    const candidate_ref01_match: any = {}

    const candidate_ref01_list = (await candidate_ref01_ent.list(candidate_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/candidate/CandidateTestData.json')

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
    ['candidate01','candidate02','candidate03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'REPRESENT_OFFICIALS_TEST_CANDIDATE_ENTID': idmap,
    'REPRESENT_OFFICIALS_TEST_LIVE': 'FALSE',
    'REPRESENT_OFFICIALS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['REPRESENT_OFFICIALS_TEST_CANDIDATE_ENTID']

  const live = 'TRUE' === env.REPRESENT_OFFICIALS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['REPRESENT_OFFICIALS_TEST_CANDIDATE_ENTID']
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
  
