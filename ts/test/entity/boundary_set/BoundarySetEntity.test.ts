

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


describe('BoundarySetEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when REPRESENT_OFFICIALS_TEST_LIVE=TRUE.
  afterEach(liveDelay('REPRESENT_OFFICIALS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = RepresentOfficialsSDK.test()
    const ent = testsdk.BoundarySet()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.REPRESENT_OFFICIALS_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'boundary_set.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"domain":{"a":true,"h":"Domain","n":"domain","r":false,"t":"`$STRING`","key$":"domain","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":1},"name":{"a":true,"h":"Name","n":"name","r":false,"t":"`$STRING`","key$":"name","index$":2},"url":{"a":true,"h":"Url","n":"url","r":false,"t":"`$STRING`","key$":"url","index$":3}},"id":{"field":"id","name":"id"},"name":"boundary_set","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /boundary-sets/","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"callback","or":"callback","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"domain","or":"domain","r":false,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"format","or":"format","r":false,"t":"`$STRING`","index$":2},{"a":true,"ex":20,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":3},{"a":true,"k":"query","n":"name","or":"name","r":false,"t":"`$STRING`","index$":4},{"a":true,"ex":0,"k":"query","n":"offset","or":"offset","r":false,"t":"`$INTEGER`","index$":5},{"a":true,"k":"query","n":"pretty","or":"pretty","r":false,"t":"`$INTEGER`","index$":6}]},"k":"http","m":"GET","o":"/boundary-sets/","q":{"exist":["callback","domain","format","limit","name","offset","pretty"]},"r":{},"s":[{"lit":"boundary-sets"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /boundary-sets/{boundarySet}/","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"boundary_set","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"callback","or":"callback","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"format","or":"format","r":false,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"pretty","or":"pretty","r":false,"t":"`$INTEGER`","index$":2}]},"k":"http","m":"GET","o":"/boundary-sets/{boundarySet}/","q":{"exist":["callback","format","id","pretty"]},"r":{"param":{"boundarySet":"id"}},"s":[{"lit":"boundary-sets"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"boundary_set","name__orig":"boundary_set","Name":"BoundarySet","name_":"boundary_set","name-":"boundary-set","NAME":"BOUNDARY_SET","index$":1}, {"active":true,"entity":"boundary_set","key$":"BasicBoundarySetFlow","kind":"basic","name":"BasicBoundarySetFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"boundary_set_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"boundary_set_ref01","srcdatavar":"boundary_set_ref01_data","suffix":"_dt0"},"m":{"id":"boundary_set01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-boundary_set_ref01"}}],"index$":1}]}, 'BoundarySet', {"GET /boundary-sets/":{"protocol":"http","operationId":"getBoundarySets","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"meta":{"key$":"meta","properties":{"next":{"nullable":true,"type":"string"},"previous":{"nullable":true,"type":"string"},"total_count":{"type":"integer"}},"type":"object"},"objects":{"items":{"properties":{"domain":{"type":"string","key$":"domain"},"name":{"type":"string","key$":"name"},"url":{"type":"string","key$":"url"}},"type":"object","index$":0},"key$":"objects","type":"array"}}}}}}},"parameters":[{"name":"limit","in":"query","description":"Number of results per page (default: 20)","schema":{"type":"integer","default":20},"index$":0},{"name":"offset","in":"query","description":"Offset for pagination","schema":{"type":"integer","default":0},"index$":1},{"name":"name","in":"query","description":"Filter by boundary set name","schema":{"type":"string"},"index$":2},{"name":"domain","in":"query","description":"Filter by domain (e.g., Canada)","schema":{"type":"string"},"index$":3},{"name":"format","in":"query","description":"Output format","schema":{"type":"string","enum":["json","apibrowser"]},"index$":4},{"name":"pretty","in":"query","description":"Pretty print JSON output","schema":{"type":"integer","enum":[0,1]},"index$":5},{"name":"callback","in":"query","description":"JSONP callback function name","schema":{"type":"string"},"index$":6}],"securitySource":"unspecified"},"GET /boundary-sets/{boundarySet}/":{"protocol":"http","operationId":"getBoundarySet","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"name":{"type":"string","key$":"name"},"domain":{"type":"string","key$":"domain"},"url":{"type":"string","key$":"url"}},"index$":0}}}}},"parameters":[{"name":"boundarySet","in":"path","required":true,"description":"Boundary set identifier (e.g., federal-electoral-districts)","schema":{"type":"string"},"index$":0},{"name":"format","in":"query","description":"Output format","schema":{"type":"string","enum":["json","apibrowser"]},"index$":1},{"name":"pretty","in":"query","description":"Pretty print JSON output","schema":{"type":"integer","enum":[0,1]},"index$":2},{"name":"callback","in":"query","description":"JSONP callback function name","schema":{"type":"string"},"index$":3}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let boundary_set_ref01_data = Object.values(setup.data.existing.boundary_set)[0] as any

    // LIST
    const boundary_set_ref01_ent = client.BoundarySet()
    const boundary_set_ref01_match: any = {}

    const boundary_set_ref01_list = (await boundary_set_ref01_ent.list(boundary_set_ref01_match)).map((e: any) => e.data())


    // LOAD
    const boundary_set_ref01_match_dt0: any = {}
    boundary_set_ref01_match_dt0.id = boundary_set_ref01_data.id
    const boundary_set_ref01_data_dt0 = (await boundary_set_ref01_ent.load(boundary_set_ref01_match_dt0)).data()
    assert(boundary_set_ref01_data_dt0.id === boundary_set_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/boundary_set/BoundarySetTestData.json')

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
    ['boundary_set01','boundary_set02','boundary_set03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'REPRESENT_OFFICIALS_TEST_BOUNDARY_SET_ENTID': idmap,
    'REPRESENT_OFFICIALS_TEST_LIVE': 'FALSE',
    'REPRESENT_OFFICIALS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['REPRESENT_OFFICIALS_TEST_BOUNDARY_SET_ENTID']

  const live = 'TRUE' === env.REPRESENT_OFFICIALS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['REPRESENT_OFFICIALS_TEST_BOUNDARY_SET_ENTID']
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
  
