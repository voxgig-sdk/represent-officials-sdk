

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


describe('BoundaryEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when REPRESENT_OFFICIALS_TEST_LIVE=TRUE.
  afterEach(liveDelay('REPRESENT_OFFICIALS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = RepresentOfficialsSDK.test()
    const ent = testsdk.Boundary()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.REPRESENT_OFFICIALS_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'boundary.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"boundary_set_name","req":false,"type":"`$STRING`","index$":0},{"active":true,"name":"external_id","req":false,"type":"`$STRING`","index$":1},{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":2},{"active":true,"name":"meta","req":false,"type":"`$OBJECT`","index$":3},{"active":true,"name":"metadata","req":false,"type":"`$OBJECT`","index$":4},{"active":true,"name":"name","req":false,"type":"`$STRING`","index$":5},{"active":true,"name":"objects","req":false,"type":"`$ARRAY`","index$":6},{"active":true,"name":"url","req":false,"type":"`$STRING`","index$":7}],"id":{"field":"id","name":"id"},"name":"boundary","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"callback","orig":"callback","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"contain","orig":"contain","reqd":false,"type":"`$STRING`","index$":1},{"active":true,"kind":"query","name":"external_id","orig":"external_id","reqd":false,"type":"`$STRING`","index$":2},{"active":true,"kind":"query","name":"format","orig":"format","reqd":false,"type":"`$STRING`","index$":3},{"active":true,"kind":"query","name":"intersect","orig":"intersect","reqd":false,"type":"`$STRING`","index$":4},{"active":true,"example":20,"kind":"query","name":"limit","orig":"limit","reqd":false,"type":"`$INTEGER`","index$":5},{"active":true,"kind":"query","name":"name","orig":"name","reqd":false,"type":"`$STRING`","index$":6},{"active":true,"example":0,"kind":"query","name":"offset","orig":"offset","reqd":false,"type":"`$INTEGER`","index$":7},{"active":true,"kind":"query","name":"pretty","orig":"pretty","reqd":false,"type":"`$INTEGER`","index$":8},{"active":true,"kind":"query","name":"set","orig":"set","reqd":false,"type":"`$STRING`","index$":9},{"active":true,"kind":"query","name":"touch","orig":"touch","reqd":false,"type":"`$STRING`","index$":10}]},"contract":{"id":"GET /boundaries/","json":"{\"operationId\":\"getBoundaries\",\"parameters\":[{\"description\":\"Number of results per page (default: 20)\",\"in\":\"query\",\"name\":\"limit\",\"schema\":{\"default\":20,\"type\":\"integer\"}},{\"description\":\"Offset for pagination\",\"in\":\"query\",\"name\":\"offset\",\"schema\":{\"default\":0,\"type\":\"integer\"}},{\"description\":\"Filter by boundary sets (comma-separated)\",\"in\":\"query\",\"name\":\"sets\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Filter by boundary name\",\"in\":\"query\",\"name\":\"name\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Filter by external ID\",\"in\":\"query\",\"name\":\"external_id\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Find boundaries containing latitude,longitude (e.g., 45.524,-73.596)\",\"in\":\"query\",\"name\":\"contains\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Find boundaries that touch the specified boundary\",\"in\":\"query\",\"name\":\"touches\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Find boundaries that intersect the specified boundary\",\"in\":\"query\",\"name\":\"intersects\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Output format\",\"in\":\"query\",\"name\":\"format\",\"schema\":{\"enum\":[\"json\",\"apibrowser\"],\"type\":\"string\"}},{\"description\":\"Pretty print JSON output\",\"in\":\"query\",\"name\":\"pretty\",\"schema\":{\"enum\":[0,1],\"type\":\"integer\"}},{\"description\":\"JSONP callback function name\",\"in\":\"query\",\"name\":\"callback\",\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"meta\":{\"properties\":{\"next\":{\"nullable\":true,\"type\":\"string\"},\"previous\":{\"nullable\":true,\"type\":\"string\"},\"total_count\":{\"type\":\"integer\"}},\"type\":\"object\"},\"objects\":{\"items\":{\"properties\":{\"boundary_set_name\":{\"type\":\"string\"},\"external_id\":{\"type\":\"string\"},\"metadata\":{\"type\":\"object\"},\"name\":{\"type\":\"string\"},\"url\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/boundaries/","segments":[{"lit":"boundaries"}],"select":{"exist":["callback","contain","external_id","format","intersect","limit","name","offset","pretty","set","touch"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"boundary_set","reqd":true,"type":"`$STRING`","index$":0}],"query":[{"active":true,"kind":"query","name":"callback","orig":"callback","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"contain","orig":"contain","reqd":false,"type":"`$STRING`","index$":1},{"active":true,"kind":"query","name":"external_id","orig":"external_id","reqd":false,"type":"`$STRING`","index$":2},{"active":true,"kind":"query","name":"format","orig":"format","reqd":false,"type":"`$STRING`","index$":3},{"active":true,"example":20,"kind":"query","name":"limit","orig":"limit","reqd":false,"type":"`$INTEGER`","index$":4},{"active":true,"kind":"query","name":"name","orig":"name","reqd":false,"type":"`$STRING`","index$":5},{"active":true,"example":0,"kind":"query","name":"offset","orig":"offset","reqd":false,"type":"`$INTEGER`","index$":6},{"active":true,"kind":"query","name":"pretty","orig":"pretty","reqd":false,"type":"`$INTEGER`","index$":7}]},"contract":{"id":"GET /boundaries/{boundarySet}/","json":"{\"operationId\":\"getBoundariesFromSet\",\"parameters\":[{\"description\":\"Boundary set identifier\",\"in\":\"path\",\"name\":\"boundarySet\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Number of results per page\",\"in\":\"query\",\"name\":\"limit\",\"schema\":{\"default\":20,\"type\":\"integer\"}},{\"description\":\"Offset for pagination\",\"in\":\"query\",\"name\":\"offset\",\"schema\":{\"default\":0,\"type\":\"integer\"}},{\"description\":\"Filter by boundary name\",\"in\":\"query\",\"name\":\"name\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Filter by external ID\",\"in\":\"query\",\"name\":\"external_id\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Find boundaries containing latitude,longitude\",\"in\":\"query\",\"name\":\"contains\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Output format\",\"in\":\"query\",\"name\":\"format\",\"schema\":{\"enum\":[\"json\",\"apibrowser\"],\"type\":\"string\"}},{\"description\":\"Pretty print JSON output\",\"in\":\"query\",\"name\":\"pretty\",\"schema\":{\"enum\":[0,1],\"type\":\"integer\"}},{\"description\":\"JSONP callback function name\",\"in\":\"query\",\"name\":\"callback\",\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"meta\":{\"properties\":{\"next\":{\"nullable\":true,\"type\":\"string\"},\"previous\":{\"nullable\":true,\"type\":\"string\"},\"total_count\":{\"type\":\"integer\"}},\"type\":\"object\"},\"objects\":{\"items\":{\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/boundaries/{boundarySet}/","rename":{"param":{"boundarySet":"id"}},"segments":[{"lit":"boundaries"},{"var":"id"}],"select":{"exist":["callback","contain","external_id","format","id","limit","name","offset","pretty"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0},{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"boundary","orig":"boundary","reqd":true,"type":"`$STRING`","index$":0},{"active":true,"kind":"param","name":"boundary_set","orig":"boundary_set","reqd":true,"type":"`$STRING`","index$":1}],"query":[{"active":true,"kind":"query","name":"callback","orig":"callback","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"format","orig":"format","reqd":false,"type":"`$STRING`","index$":1},{"active":true,"kind":"query","name":"pretty","orig":"pretty","reqd":false,"type":"`$INTEGER`","index$":2}]},"contract":{"id":"GET /boundaries/{boundarySet}/{boundary}/","json":"{\"operationId\":\"getBoundary\",\"parameters\":[{\"description\":\"Boundary set identifier\",\"in\":\"path\",\"name\":\"boundarySet\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Boundary identifier\",\"in\":\"path\",\"name\":\"boundary\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Output format\",\"in\":\"query\",\"name\":\"format\",\"schema\":{\"enum\":[\"json\",\"apibrowser\"],\"type\":\"string\"}},{\"description\":\"Pretty print JSON output\",\"in\":\"query\",\"name\":\"pretty\",\"schema\":{\"enum\":[0,1],\"type\":\"integer\"}},{\"description\":\"JSONP callback function name\",\"in\":\"query\",\"name\":\"callback\",\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"boundary_set_name\":{\"type\":\"string\"},\"external_id\":{\"type\":\"string\"},\"metadata\":{\"type\":\"object\"},\"name\":{\"type\":\"string\"},\"url\":{\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/boundaries/{boundarySet}/{boundary}/","rename":{"param":{"boundarySet":"boundary_set"}},"segments":[{"lit":"boundaries"},{"var":"boundary_set"},{"var":"boundary"}],"select":{"exist":["boundary","boundary_set","callback","format","pretty"]},"transform":{"req":"`reqdata`","res":"`body.metadata`"},"index$":1},{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"boundary","orig":"boundary","reqd":true,"type":"`$STRING`"},{"active":true,"kind":"param","name":"boundary_set","orig":"boundary_set","reqd":true,"type":"`$STRING`"}],"query":[{"active":true,"kind":"query","name":"callback","orig":"callback","reqd":false,"type":"`$STRING`"},{"active":true,"kind":"query","name":"format","orig":"format","reqd":false,"type":"`$STRING`"}]},"contract":{"id":"GET /boundaries/{boundarySet}/{boundary}/centroid","json":"{\"operationId\":\"getBoundaryCentroid\",\"parameters\":[{\"description\":\"Boundary set identifier\",\"in\":\"path\",\"name\":\"boundarySet\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Boundary identifier\",\"in\":\"path\",\"name\":\"boundary\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Output format\",\"in\":\"query\",\"name\":\"format\",\"schema\":{\"enum\":[\"json\",\"kml\",\"wkt\"],\"type\":\"string\"}},{\"description\":\"JSONP callback function name\",\"in\":\"query\",\"name\":\"callback\",\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"GeoJSON Feature with Point geometry\",\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/boundaries/{boundarySet}/{boundary}/centroid","rename":{"param":{"boundarySet":"boundary_set"}},"segments":[{"lit":"boundaries"},{"var":"boundary_set"},{"var":"boundary"},{"lit":"centroid"}],"select":{"$action":"centroid","exist":["boundary","boundary_set","callback","format"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":2},{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"boundary","orig":"boundary","reqd":true,"type":"`$STRING`"},{"active":true,"kind":"param","name":"boundary_set","orig":"boundary_set","reqd":true,"type":"`$STRING`"}],"query":[{"active":true,"kind":"query","name":"callback","orig":"callback","reqd":false,"type":"`$STRING`"},{"active":true,"kind":"query","name":"format","orig":"format","reqd":false,"type":"`$STRING`"}]},"contract":{"id":"GET /boundaries/{boundarySet}/{boundary}/shape","json":"{\"operationId\":\"getBoundaryShape\",\"parameters\":[{\"description\":\"Boundary set identifier\",\"in\":\"path\",\"name\":\"boundarySet\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Boundary identifier\",\"in\":\"path\",\"name\":\"boundary\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Output format\",\"in\":\"query\",\"name\":\"format\",\"schema\":{\"enum\":[\"json\",\"kml\",\"wkt\"],\"type\":\"string\"}},{\"description\":\"JSONP callback function name\",\"in\":\"query\",\"name\":\"callback\",\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"GeoJSON Feature\",\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/boundaries/{boundarySet}/{boundary}/shape","rename":{"param":{"boundarySet":"boundary_set"}},"segments":[{"lit":"boundaries"},{"var":"boundary_set"},{"var":"boundary"},{"lit":"shape"}],"select":{"$action":"shape","exist":["boundary","boundary_set","callback","format"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":3},{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"boundary","orig":"boundary","reqd":true,"type":"`$STRING`"},{"active":true,"kind":"param","name":"boundary_set","orig":"boundary_set","reqd":true,"type":"`$STRING`"}],"query":[{"active":true,"kind":"query","name":"callback","orig":"callback","reqd":false,"type":"`$STRING`"},{"active":true,"kind":"query","name":"format","orig":"format","reqd":false,"type":"`$STRING`"}]},"contract":{"id":"GET /boundaries/{boundarySet}/{boundary}/simple_shape","json":"{\"operationId\":\"getBoundarySimpleShape\",\"parameters\":[{\"description\":\"Boundary set identifier\",\"in\":\"path\",\"name\":\"boundarySet\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Boundary identifier\",\"in\":\"path\",\"name\":\"boundary\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Output format\",\"in\":\"query\",\"name\":\"format\",\"schema\":{\"enum\":[\"json\",\"kml\",\"wkt\"],\"type\":\"string\"}},{\"description\":\"JSONP callback function name\",\"in\":\"query\",\"name\":\"callback\",\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"GeoJSON Feature\",\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/boundaries/{boundarySet}/{boundary}/simple_shape","rename":{"param":{"boundarySet":"boundary_set"}},"segments":[{"lit":"boundaries"},{"var":"boundary_set"},{"var":"boundary"},{"lit":"simple_shape"}],"select":{"$action":"simple_shape","exist":["boundary","boundary_set","callback","format"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":4},{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"boundary_set","orig":"boundary_set","reqd":true,"type":"`$STRING`"}],"query":[{"active":true,"kind":"query","name":"callback","orig":"callback","reqd":false,"type":"`$STRING`"},{"active":true,"kind":"query","name":"format","orig":"format","reqd":false,"type":"`$STRING`"}]},"contract":{"id":"GET /boundaries/{boundarySet}/centroid","json":"{\"operationId\":\"getBoundarySetCentroids\",\"parameters\":[{\"description\":\"Boundary set identifier\",\"in\":\"path\",\"name\":\"boundarySet\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Output format\",\"in\":\"query\",\"name\":\"format\",\"schema\":{\"enum\":[\"json\",\"kml\",\"wkt\"],\"type\":\"string\"}},{\"description\":\"JSONP callback function name\",\"in\":\"query\",\"name\":\"callback\",\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"GeoJSON FeatureCollection\",\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/boundaries/{boundarySet}/centroid","rename":{"param":{"boundarySet":"boundary_set"}},"segments":[{"lit":"boundaries"},{"var":"boundary_set"},{"lit":"centroid"}],"select":{"$action":"centroid","exist":["boundary_set","callback","format"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":5},{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"boundary_set","orig":"boundary_set","reqd":true,"type":"`$STRING`"}],"query":[{"active":true,"kind":"query","name":"callback","orig":"callback","reqd":false,"type":"`$STRING`"},{"active":true,"kind":"query","name":"format","orig":"format","reqd":false,"type":"`$STRING`"}]},"contract":{"id":"GET /boundaries/{boundarySet}/shape","json":"{\"operationId\":\"getBoundarySetShapes\",\"parameters\":[{\"description\":\"Boundary set identifier\",\"in\":\"path\",\"name\":\"boundarySet\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Output format\",\"in\":\"query\",\"name\":\"format\",\"schema\":{\"enum\":[\"json\",\"kml\",\"wkt\"],\"type\":\"string\"}},{\"description\":\"JSONP callback function name\",\"in\":\"query\",\"name\":\"callback\",\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"GeoJSON FeatureCollection\",\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/boundaries/{boundarySet}/shape","rename":{"param":{"boundarySet":"boundary_set"}},"segments":[{"lit":"boundaries"},{"var":"boundary_set"},{"lit":"shape"}],"select":{"$action":"shape","exist":["boundary_set","callback","format"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":6},{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"boundary_set","orig":"boundary_set","reqd":true,"type":"`$STRING`"}],"query":[{"active":true,"kind":"query","name":"callback","orig":"callback","reqd":false,"type":"`$STRING`"},{"active":true,"kind":"query","name":"format","orig":"format","reqd":false,"type":"`$STRING`"}]},"contract":{"id":"GET /boundaries/{boundarySet}/simple_shape","json":"{\"operationId\":\"getBoundarySetSimpleShapes\",\"parameters\":[{\"description\":\"Boundary set identifier\",\"in\":\"path\",\"name\":\"boundarySet\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Output format\",\"in\":\"query\",\"name\":\"format\",\"schema\":{\"enum\":[\"json\",\"kml\",\"wkt\"],\"type\":\"string\"}},{\"description\":\"JSONP callback function name\",\"in\":\"query\",\"name\":\"callback\",\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"GeoJSON FeatureCollection\",\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/boundaries/{boundarySet}/simple_shape","rename":{"param":{"boundarySet":"boundary_set"}},"segments":[{"lit":"boundaries"},{"var":"boundary_set"},{"lit":"simple_shape"}],"select":{"$action":"simple_shape","exist":["boundary_set","callback","format"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":7}],"key$":"load"}},"relations":{"ancestors":[["boundary"]]},"key$":"boundary","name__orig":"boundary","Name":"Boundary","name_":"boundary","name-":"boundary","NAME":"BOUNDARY","index$":0}, {"active":true,"entity":"boundary","key$":"BasicBoundaryFlow","kind":"basic","name":"BasicBoundaryFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"boundary_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"boundary_ref01","srcdatavar":"boundary_ref01_data","suffix":"_dt0"},"match":{"id":"boundary01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-boundary_ref01"}}],"index$":1}]}, 'Boundary')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let boundary_ref01_data = Object.values(setup.data.existing.boundary)[0] as any

    // LIST
    const boundary_ref01_ent = client.Boundary()
    const boundary_ref01_match: any = {}

    const boundary_ref01_list = (await boundary_ref01_ent.list(boundary_ref01_match)).map((e: any) => e.data())


    // LOAD
    const boundary_ref01_match_dt0: any = {}
    boundary_ref01_match_dt0.id = boundary_ref01_data.id
    const boundary_ref01_data_dt0 = (await boundary_ref01_ent.load(boundary_ref01_match_dt0)).data()
    assert(boundary_ref01_data_dt0.id === boundary_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/boundary/BoundaryTestData.json')

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
    ['boundary01','boundary02','boundary03','boundary01','boundary02','boundary03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'REPRESENT_OFFICIALS_TEST_BOUNDARY_ENTID': idmap,
    'REPRESENT_OFFICIALS_TEST_LIVE': 'FALSE',
    'REPRESENT_OFFICIALS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['REPRESENT_OFFICIALS_TEST_BOUNDARY_ENTID']

  const live = 'TRUE' === env.REPRESENT_OFFICIALS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['REPRESENT_OFFICIALS_TEST_BOUNDARY_ENTID']
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
  
