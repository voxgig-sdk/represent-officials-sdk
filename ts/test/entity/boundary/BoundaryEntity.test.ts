

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"boundary_set_name":{"a":true,"h":"Boundary Set Name","n":"boundary_set_name","r":false,"t":"`$STRING`","key$":"boundary_set_name","index$":0},"external_id":{"a":true,"h":"External Id","n":"external_id","r":false,"t":"`$STRING`","key$":"external_id","index$":1},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":2},"meta":{"a":true,"h":"Meta","n":"meta","r":false,"t":"`$OBJECT`","key$":"meta","index$":3},"metadata":{"a":true,"h":"Metadata","n":"metadata","r":false,"t":"`$OBJECT`","key$":"metadata","index$":4},"name":{"a":true,"h":"Name","n":"name","r":false,"t":"`$STRING`","key$":"name","index$":5},"objects":{"a":true,"h":"Objects","n":"objects","r":false,"t":"`$ARRAY`","key$":"objects","index$":6},"url":{"a":true,"h":"Url","n":"url","r":false,"t":"`$STRING`","key$":"url","index$":7}},"id":{"field":"id","name":"id"},"name":"boundary","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /boundaries/","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"callback","or":"callback","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"contain","or":"contain","r":false,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"external_id","or":"external_id","r":false,"t":"`$STRING`","index$":2},{"a":true,"k":"query","n":"format","or":"format","r":false,"t":"`$STRING`","index$":3},{"a":true,"k":"query","n":"intersect","or":"intersect","r":false,"t":"`$STRING`","index$":4},{"a":true,"ex":20,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":5},{"a":true,"k":"query","n":"name","or":"name","r":false,"t":"`$STRING`","index$":6},{"a":true,"ex":0,"k":"query","n":"offset","or":"offset","r":false,"t":"`$INTEGER`","index$":7},{"a":true,"k":"query","n":"pretty","or":"pretty","r":false,"t":"`$INTEGER`","index$":8},{"a":true,"k":"query","n":"set","or":"set","r":false,"t":"`$STRING`","index$":9},{"a":true,"k":"query","n":"touch","or":"touch","r":false,"t":"`$STRING`","index$":10}]},"k":"http","m":"GET","o":"/boundaries/","q":{"exist":["callback","contain","external_id","format","intersect","limit","name","offset","pretty","set","touch"]},"r":{},"s":[{"lit":"boundaries"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /boundaries/{boundarySet}/","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"boundary_set","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"callback","or":"callback","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"contain","or":"contain","r":false,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"external_id","or":"external_id","r":false,"t":"`$STRING`","index$":2},{"a":true,"k":"query","n":"format","or":"format","r":false,"t":"`$STRING`","index$":3},{"a":true,"ex":20,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":4},{"a":true,"k":"query","n":"name","or":"name","r":false,"t":"`$STRING`","index$":5},{"a":true,"ex":0,"k":"query","n":"offset","or":"offset","r":false,"t":"`$INTEGER`","index$":6},{"a":true,"k":"query","n":"pretty","or":"pretty","r":false,"t":"`$INTEGER`","index$":7}]},"k":"http","m":"GET","o":"/boundaries/{boundarySet}/","q":{"exist":["callback","contain","external_id","format","id","limit","name","offset","pretty"]},"r":{"param":{"boundarySet":"id"}},"s":[{"lit":"boundaries"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /boundaries/{boundarySet}/{boundary}/","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"boundary","or":"boundary","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"boundary_set","or":"boundary_set","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"k":"query","n":"callback","or":"callback","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"format","or":"format","r":false,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"pretty","or":"pretty","r":false,"t":"`$INTEGER`","index$":2}]},"k":"http","m":"GET","o":"/boundaries/{boundarySet}/{boundary}/","q":{"exist":["boundary","boundary_set","callback","format","pretty"]},"r":{"param":{"boundarySet":"boundary_set"}},"s":[{"lit":"boundaries"},{"var":"boundary_set"},{"var":"boundary"}],"t":{"req":"`reqdata`","res":"`body.metadata`"},"index$":1},{"a":true,"co":{"id":"GET /boundaries/{boundarySet}/{boundary}/centroid","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"boundary","or":"boundary","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"boundary_set","or":"boundary_set","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"k":"query","n":"callback","or":"callback","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"format","or":"format","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/boundaries/{boundarySet}/{boundary}/centroid","q":{"$action":"centroid","exist":["boundary","boundary_set","callback","format"]},"r":{"param":{"boundarySet":"boundary_set"}},"s":[{"lit":"boundaries"},{"var":"boundary_set"},{"var":"boundary"},{"lit":"centroid"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2},{"a":true,"co":{"id":"GET /boundaries/{boundarySet}/{boundary}/shape","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"boundary","or":"boundary","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"boundary_set","or":"boundary_set","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"k":"query","n":"callback","or":"callback","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"format","or":"format","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/boundaries/{boundarySet}/{boundary}/shape","q":{"$action":"shape","exist":["boundary","boundary_set","callback","format"]},"r":{"param":{"boundarySet":"boundary_set"}},"s":[{"lit":"boundaries"},{"var":"boundary_set"},{"var":"boundary"},{"lit":"shape"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":3},{"a":true,"co":{"id":"GET /boundaries/{boundarySet}/{boundary}/simple_shape","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"boundary","or":"boundary","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"boundary_set","or":"boundary_set","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"k":"query","n":"callback","or":"callback","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"format","or":"format","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/boundaries/{boundarySet}/{boundary}/simple_shape","q":{"$action":"simple_shape","exist":["boundary","boundary_set","callback","format"]},"r":{"param":{"boundarySet":"boundary_set"}},"s":[{"lit":"boundaries"},{"var":"boundary_set"},{"var":"boundary"},{"lit":"simple_shape"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":4},{"a":true,"co":{"id":"GET /boundaries/{boundarySet}/centroid","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"boundary_set","or":"boundary_set","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"callback","or":"callback","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"format","or":"format","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/boundaries/{boundarySet}/centroid","q":{"$action":"centroid","exist":["boundary_set","callback","format"]},"r":{"param":{"boundarySet":"boundary_set"}},"s":[{"lit":"boundaries"},{"var":"boundary_set"},{"lit":"centroid"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":5},{"a":true,"co":{"id":"GET /boundaries/{boundarySet}/shape","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"boundary_set","or":"boundary_set","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"callback","or":"callback","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"format","or":"format","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/boundaries/{boundarySet}/shape","q":{"$action":"shape","exist":["boundary_set","callback","format"]},"r":{"param":{"boundarySet":"boundary_set"}},"s":[{"lit":"boundaries"},{"var":"boundary_set"},{"lit":"shape"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":6},{"a":true,"co":{"id":"GET /boundaries/{boundarySet}/simple_shape","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"boundary_set","or":"boundary_set","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"callback","or":"callback","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"format","or":"format","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/boundaries/{boundarySet}/simple_shape","q":{"$action":"simple_shape","exist":["boundary_set","callback","format"]},"r":{"param":{"boundarySet":"boundary_set"}},"s":[{"lit":"boundaries"},{"var":"boundary_set"},{"lit":"simple_shape"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":7}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"boundary","name__orig":"boundary","Name":"Boundary","name_":"boundary","name-":"boundary","NAME":"BOUNDARY","index$":0}, {"active":true,"entity":"boundary","key$":"BasicBoundaryFlow","kind":"basic","name":"BasicBoundaryFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"boundary_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"boundary_ref01","srcdatavar":"boundary_ref01_data","suffix":"_dt0"},"m":{"id":"boundary01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-boundary_ref01"}}],"index$":1}]}, 'Boundary', {"GET /boundaries/":{"protocol":"http","operationId":"getBoundaries","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"meta":{"key$":"meta","properties":{"next":{"nullable":true,"type":"string"},"previous":{"nullable":true,"type":"string"},"total_count":{"type":"integer"}},"type":"object"},"objects":{"items":{"properties":{"boundary_set_name":{"type":"string","key$":"boundary_set_name"},"external_id":{"type":"string","key$":"external_id"},"metadata":{"type":"object","key$":"metadata"},"name":{"type":"string","key$":"name"},"url":{"type":"string","key$":"url"}},"type":"object","index$":0},"key$":"objects","type":"array"}}}}}}},"parameters":[{"name":"limit","in":"query","description":"Number of results per page (default: 20)","schema":{"type":"integer","default":20},"index$":0},{"name":"offset","in":"query","description":"Offset for pagination","schema":{"type":"integer","default":0},"index$":1},{"name":"sets","in":"query","description":"Filter by boundary sets (comma-separated)","schema":{"type":"string"},"index$":2},{"name":"name","in":"query","description":"Filter by boundary name","schema":{"type":"string"},"index$":3},{"name":"external_id","in":"query","description":"Filter by external ID","schema":{"type":"string"},"index$":4},{"name":"contains","in":"query","description":"Find boundaries containing latitude,longitude (e.g., 45.524,-73.596)","schema":{"type":"string"},"index$":5},{"name":"touches","in":"query","description":"Find boundaries that touch the specified boundary","schema":{"type":"string"},"index$":6},{"name":"intersects","in":"query","description":"Find boundaries that intersect the specified boundary","schema":{"type":"string"},"index$":7},{"name":"format","in":"query","description":"Output format","schema":{"type":"string","enum":["json","apibrowser"]},"index$":8},{"name":"pretty","in":"query","description":"Pretty print JSON output","schema":{"type":"integer","enum":[0,1]},"index$":9},{"name":"callback","in":"query","description":"JSONP callback function name","schema":{"type":"string"},"index$":10}],"securitySource":"unspecified"},"GET /boundaries/{boundarySet}/":{"protocol":"http","operationId":"getBoundariesFromSet","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"meta":{"type":"object","properties":{"next":{"type":"string","nullable":true},"previous":{"type":"string","nullable":true},"total_count":{"type":"integer"}},"key$":"meta"},"objects":{"type":"array","items":{"type":"object"},"key$":"objects"}},"index$":0}}}}},"parameters":[{"name":"boundarySet","in":"path","required":true,"description":"Boundary set identifier","schema":{"type":"string"},"index$":0},{"name":"limit","in":"query","description":"Number of results per page","schema":{"type":"integer","default":20},"index$":1},{"name":"offset","in":"query","description":"Offset for pagination","schema":{"type":"integer","default":0},"index$":2},{"name":"name","in":"query","description":"Filter by boundary name","schema":{"type":"string"},"index$":3},{"name":"external_id","in":"query","description":"Filter by external ID","schema":{"type":"string"},"index$":4},{"name":"contains","in":"query","description":"Find boundaries containing latitude,longitude","schema":{"type":"string"},"index$":5},{"name":"format","in":"query","description":"Output format","schema":{"type":"string","enum":["json","apibrowser"]},"index$":6},{"name":"pretty","in":"query","description":"Pretty print JSON output","schema":{"type":"integer","enum":[0,1]},"index$":7},{"name":"callback","in":"query","description":"JSONP callback function name","schema":{"type":"string"},"index$":8}],"securitySource":"unspecified"},"GET /boundaries/{boundarySet}/{boundary}/":{"protocol":"http","operationId":"getBoundary","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"boundary_set_name":{"type":"string"},"name":{"type":"string"},"external_id":{"type":"string"},"metadata":{"type":"object"},"url":{"type":"string"}}}}}}},"parameters":[{"name":"boundarySet","in":"path","required":true,"description":"Boundary set identifier","schema":{"type":"string"},"index$":0},{"name":"boundary","in":"path","required":true,"description":"Boundary identifier","schema":{"type":"string"},"index$":1},{"name":"format","in":"query","description":"Output format","schema":{"type":"string","enum":["json","apibrowser"]},"index$":2},{"name":"pretty","in":"query","description":"Pretty print JSON output","schema":{"type":"integer","enum":[0,1]},"index$":3},{"name":"callback","in":"query","description":"JSONP callback function name","schema":{"type":"string"},"index$":4}],"securitySource":"unspecified"},"GET /boundaries/{boundarySet}/{boundary}/centroid":{"protocol":"http","operationId":"getBoundaryCentroid","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","description":"GeoJSON Feature with Point geometry"}}}}},"parameters":[{"name":"boundarySet","in":"path","required":true,"description":"Boundary set identifier","schema":{"type":"string"},"index$":0},{"name":"boundary","in":"path","required":true,"description":"Boundary identifier","schema":{"type":"string"},"index$":1},{"name":"format","in":"query","description":"Output format","schema":{"type":"string","enum":["json","kml","wkt"]},"index$":2},{"name":"callback","in":"query","description":"JSONP callback function name","schema":{"type":"string"},"index$":3}],"securitySource":"unspecified"},"GET /boundaries/{boundarySet}/{boundary}/shape":{"protocol":"http","operationId":"getBoundaryShape","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","description":"GeoJSON Feature"}}}}},"parameters":[{"name":"boundarySet","in":"path","required":true,"description":"Boundary set identifier","schema":{"type":"string"},"index$":0},{"name":"boundary","in":"path","required":true,"description":"Boundary identifier","schema":{"type":"string"},"index$":1},{"name":"format","in":"query","description":"Output format","schema":{"type":"string","enum":["json","kml","wkt"]},"index$":2},{"name":"callback","in":"query","description":"JSONP callback function name","schema":{"type":"string"},"index$":3}],"securitySource":"unspecified"},"GET /boundaries/{boundarySet}/{boundary}/simple_shape":{"protocol":"http","operationId":"getBoundarySimpleShape","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","description":"GeoJSON Feature"}}}}},"parameters":[{"name":"boundarySet","in":"path","required":true,"description":"Boundary set identifier","schema":{"type":"string"},"index$":0},{"name":"boundary","in":"path","required":true,"description":"Boundary identifier","schema":{"type":"string"},"index$":1},{"name":"format","in":"query","description":"Output format","schema":{"type":"string","enum":["json","kml","wkt"]},"index$":2},{"name":"callback","in":"query","description":"JSONP callback function name","schema":{"type":"string"},"index$":3}],"securitySource":"unspecified"},"GET /boundaries/{boundarySet}/centroid":{"protocol":"http","operationId":"getBoundarySetCentroids","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","description":"GeoJSON FeatureCollection"}}}}},"parameters":[{"name":"boundarySet","in":"path","required":true,"description":"Boundary set identifier","schema":{"type":"string"},"index$":0},{"name":"format","in":"query","description":"Output format","schema":{"type":"string","enum":["json","kml","wkt"]},"index$":1},{"name":"callback","in":"query","description":"JSONP callback function name","schema":{"type":"string"},"index$":2}],"securitySource":"unspecified"},"GET /boundaries/{boundarySet}/shape":{"protocol":"http","operationId":"getBoundarySetShapes","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","description":"GeoJSON FeatureCollection"}}}}},"parameters":[{"name":"boundarySet","in":"path","required":true,"description":"Boundary set identifier","schema":{"type":"string"},"index$":0},{"name":"format","in":"query","description":"Output format","schema":{"type":"string","enum":["json","kml","wkt"]},"index$":1},{"name":"callback","in":"query","description":"JSONP callback function name","schema":{"type":"string"},"index$":2}],"securitySource":"unspecified"},"GET /boundaries/{boundarySet}/simple_shape":{"protocol":"http","operationId":"getBoundarySetSimpleShapes","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","description":"GeoJSON FeatureCollection"}}}}},"parameters":[{"name":"boundarySet","in":"path","required":true,"description":"Boundary set identifier","schema":{"type":"string"},"index$":0},{"name":"format","in":"query","description":"Output format","schema":{"type":"string","enum":["json","kml","wkt"]},"index$":1},{"name":"callback","in":"query","description":"JSONP callback function name","schema":{"type":"string"},"index$":2}],"securitySource":"unspecified"}})
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
    ['boundary01','boundary02','boundary03'],
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
  
