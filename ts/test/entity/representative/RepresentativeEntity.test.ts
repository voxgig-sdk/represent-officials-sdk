

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


describe('RepresentativeEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when REPRESENT_OFFICIALS_TEST_LIVE=TRUE.
  afterEach(liveDelay('REPRESENT_OFFICIALS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = RepresentOfficialsSDK.test()
    const ent = testsdk.Representative()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.REPRESENT_OFFICIALS_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'representative.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"district_id":{"a":true,"h":"District Id","n":"district_id","r":false,"sh":"District identifier if available","t":"`$STRING`","key$":"district_id","index$":0},"district_name":{"a":true,"h":"District Name","n":"district_name","r":true,"sh":"Name of the electoral district","t":"`$STRING`","key$":"district_name","index$":1},"elected_office":{"a":true,"h":"Elected Office","n":"elected_office","r":true,"sh":"Type of office (e.g., MP, MLA, Mayor, Councillor, Alderman)","t":"`$STRING`","key$":"elected_office","index$":2},"email":{"a":true,"fo":"email","h":"Email","n":"email","r":false,"sh":"Email address","t":"`$STRING`","key$":"email","index$":3},"extra":{"a":true,"h":"Extra","n":"extra","r":false,"sh":"Additional data not covered by standard fields","t":"`$OBJECT`","key$":"extra","index$":4},"first_name":{"a":true,"h":"First Name","n":"first_name","r":false,"sh":"First name","t":"`$STRING`","key$":"first_name","index$":5},"gender":{"a":true,"h":"Gender","n":"gender","r":false,"sh":"Gender","t":"`$STRING`","key$":"gender","index$":6},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":7},"last_name":{"a":true,"h":"Last Name","n":"last_name","r":false,"sh":"Last name","t":"`$STRING`","key$":"last_name","index$":8},"meta":{"a":true,"h":"Meta","n":"meta","r":false,"t":"`$OBJECT`","key$":"meta","index$":9},"name":{"a":true,"h":"Name","n":"name","r":true,"sh":"Full name of the representative","t":"`$STRING`","key$":"name","index$":10},"objects":{"a":true,"h":"Objects","n":"objects","r":false,"t":"`$ARRAY`","key$":"objects","index$":11},"offices":{"a":true,"h":"Offices","n":"offices","r":false,"sh":"Contact information for representative's offices","t":"`$ARRAY`","key$":"offices","index$":12},"party_name":{"a":true,"h":"Party Name","n":"party_name","r":false,"sh":"Political party name","t":"`$STRING`","key$":"party_name","index$":13},"personal_url":{"a":true,"h":"Personal Url","n":"personal_url","r":false,"sh":"Personal website not on official legislature site","t":"`$STRING`","key$":"personal_url","index$":14},"photo_url":{"a":true,"h":"Photo Url","n":"photo_url","r":false,"sh":"URL to representative's photo","t":"`$STRING`","key$":"photo_url","index$":15},"source_url":{"a":true,"h":"Source Url","n":"source_url","r":false,"sh":"URL where the data is scraped from","t":"`$STRING`","key$":"source_url","index$":16},"url":{"a":true,"h":"Url","n":"url","r":false,"sh":"Representative's page on official legislature site","t":"`$STRING`","key$":"url","index$":17}},"id":{"field":"id","name":"id"},"name":"representative","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /representatives/","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"callback","or":"callback","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"district","or":"district","r":false,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"district_name","or":"district_name","r":false,"t":"`$STRING`","index$":2},{"a":true,"k":"query","n":"elected_office","or":"elected_office","r":false,"t":"`$STRING`","index$":3},{"a":true,"k":"query","n":"first_name","or":"first_name","r":false,"t":"`$STRING`","index$":4},{"a":true,"k":"query","n":"format","or":"format","r":false,"t":"`$STRING`","index$":5},{"a":true,"k":"query","n":"gender","or":"gender","r":false,"t":"`$STRING`","index$":6},{"a":true,"k":"query","n":"last_name","or":"last_name","r":false,"t":"`$STRING`","index$":7},{"a":true,"ex":20,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":8},{"a":true,"k":"query","n":"name","or":"name","r":false,"t":"`$STRING`","index$":9},{"a":true,"ex":0,"k":"query","n":"offset","or":"offset","r":false,"t":"`$INTEGER`","index$":10},{"a":true,"k":"query","n":"party_name","or":"party_name","r":false,"t":"`$STRING`","index$":11},{"a":true,"k":"query","n":"point","or":"point","r":false,"t":"`$STRING`","index$":12},{"a":true,"k":"query","n":"pretty","or":"pretty","r":false,"t":"`$INTEGER`","index$":13}]},"k":"http","m":"GET","o":"/representatives/","q":{"exist":["callback","district","district_name","elected_office","first_name","format","gender","last_name","limit","name","offset","party_name","point","pretty"]},"r":{},"s":[{"lit":"representatives"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /boundaries/{boundarySet}/{boundary}/representatives/","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"boundary","or":"boundary","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"boundary_set","or":"boundary_set","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"k":"query","n":"callback","or":"callback","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"format","or":"format","r":false,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"pretty","or":"pretty","r":false,"t":"`$INTEGER`","index$":2}]},"k":"http","m":"GET","o":"/boundaries/{boundarySet}/{boundary}/representatives/","q":{"exist":["boundary","boundary_set","callback","format","pretty"]},"r":{"param":{"boundarySet":"boundary_set"}},"s":[{"lit":"boundaries"},{"var":"boundary_set"},{"var":"boundary"},{"lit":"representatives"}],"t":{"req":"`reqdata`","res":"`body.objects`"},"index$":1}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /representatives/{representativeSet}/","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"representative_set","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"callback","or":"callback","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"district_name","or":"district_name","r":false,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"elected_office","or":"elected_office","r":false,"t":"`$STRING`","index$":2},{"a":true,"k":"query","n":"first_name","or":"first_name","r":false,"t":"`$STRING`","index$":3},{"a":true,"k":"query","n":"format","or":"format","r":false,"t":"`$STRING`","index$":4},{"a":true,"k":"query","n":"gender","or":"gender","r":false,"t":"`$STRING`","index$":5},{"a":true,"k":"query","n":"last_name","or":"last_name","r":false,"t":"`$STRING`","index$":6},{"a":true,"ex":20,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":7},{"a":true,"k":"query","n":"name","or":"name","r":false,"t":"`$STRING`","index$":8},{"a":true,"ex":0,"k":"query","n":"offset","or":"offset","r":false,"t":"`$INTEGER`","index$":9},{"a":true,"k":"query","n":"party_name","or":"party_name","r":false,"t":"`$STRING`","index$":10},{"a":true,"k":"query","n":"point","or":"point","r":false,"t":"`$STRING`","index$":11},{"a":true,"k":"query","n":"pretty","or":"pretty","r":false,"t":"`$INTEGER`","index$":12}]},"k":"http","m":"GET","o":"/representatives/{representativeSet}/","q":{"exist":["callback","district_name","elected_office","first_name","format","gender","id","last_name","limit","name","offset","party_name","point","pretty"]},"r":{"param":{"representativeSet":"id"}},"s":[{"lit":"representatives"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.boundary"]]},"key$":"representative","name__orig":"representative","Name":"Representative","name_":"representative","name-":"representative","NAME":"REPRESENTATIVE","index$":5}, {"active":true,"entity":"representative","key$":"BasicRepresentativeFlow","kind":"basic","name":"BasicRepresentativeFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"boundary":"boundary01","boundary_set":"boundary_set01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"representative_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"representative_ref01","srcdatavar":"representative_ref01_data","suffix":"_dt0"},"m":{"id":"representative01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-representative_ref01"}}],"index$":1}]}, 'Representative', {"GET /representatives/":{"protocol":"http","operationId":"getRepresentatives","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"meta":{"key$":"meta","properties":{"next":{"nullable":true,"type":"string"},"previous":{"nullable":true,"type":"string"},"total_count":{"type":"integer"}},"type":"object"},"objects":{"items":{"properties":{"district_id":{"description":"District identifier if available","type":"string","key$":"district_id"},"district_name":{"description":"Name of the electoral district","type":"string","key$":"district_name"},"elected_office":{"description":"Type of office (e.g., MP, MLA, Mayor, Councillor, Alderman)","type":"string","key$":"elected_office"},"email":{"description":"Email address","format":"email","type":"string","key$":"email"},"extra":{"description":"Additional data not covered by standard fields","type":"object","key$":"extra"},"first_name":{"description":"First name","type":"string","key$":"first_name"},"gender":{"description":"Gender","enum":["M","F"],"type":"string","key$":"gender"},"last_name":{"description":"Last name","type":"string","key$":"last_name"},"name":{"description":"Full name of the representative","type":"string","key$":"name"},"offices":{"description":"Contact information for representative's offices","items":{"properties":{"fax":{"description":"Fax number","type":"string"},"postal":{"description":"Mailing address","type":"string"},"tel":{"description":"Telephone number","type":"string"},"type":{"description":"Office type (e.g., constituency, legislature)","type":"string"}},"type":"object"},"type":"array","key$":"offices"},"party_name":{"description":"Political party name","type":"string","key$":"party_name"},"personal_url":{"description":"Personal website not on official legislature site","type":"string","key$":"personal_url"},"photo_url":{"description":"URL to representative's photo","type":"string","key$":"photo_url"},"source_url":{"description":"URL where the data is scraped from","type":"string","key$":"source_url"},"url":{"description":"Representative's page on official legislature site","type":"string","key$":"url"}},"required":["name","district_name","elected_office"],"type":"object","x-ref":"#/components/schemas/Representative","index$":0},"key$":"objects","type":"array"}}}}}}},"parameters":[{"name":"limit","in":"query","description":"Number of results per page (default: 20)","schema":{"type":"integer","default":20},"index$":0},{"name":"offset","in":"query","description":"Offset for pagination","schema":{"type":"integer","default":0},"index$":1},{"name":"point","in":"query","description":"Find representatives by latitude,longitude (e.g., 45.524,-73.596)","schema":{"type":"string"},"index$":2},{"name":"districts","in":"query","description":"Filter by districts (comma-separated)","schema":{"type":"string"},"index$":3},{"name":"name","in":"query","description":"Filter by representative name","schema":{"type":"string"},"index$":4},{"name":"first_name","in":"query","description":"Filter by first name","schema":{"type":"string"},"index$":5},{"name":"last_name","in":"query","description":"Filter by last name","schema":{"type":"string"},"index$":6},{"name":"gender","in":"query","description":"Filter by gender (M or F)","schema":{"type":"string","enum":["M","F"]},"index$":7},{"name":"district_name","in":"query","description":"Filter by district name","schema":{"type":"string"},"index$":8},{"name":"elected_office","in":"query","description":"Filter by elected office (e.g., MP, MLA, Mayor, Councillor)","schema":{"type":"string"},"index$":9},{"name":"party_name","in":"query","description":"Filter by party name","schema":{"type":"string"},"index$":10},{"name":"format","in":"query","description":"Output format","schema":{"type":"string","enum":["json","apibrowser"]},"index$":11},{"name":"pretty","in":"query","description":"Pretty print JSON output","schema":{"type":"integer","enum":[0,1]},"index$":12},{"name":"callback","in":"query","description":"JSONP callback function name","schema":{"type":"string"},"index$":13}],"securitySource":"unspecified"},"GET /boundaries/{boundarySet}/{boundary}/representatives/":{"protocol":"http","operationId":"getBoundaryRepresentatives","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"objects":{"items":{"properties":{"district_id":{"description":"District identifier if available","type":"string","key$":"district_id"},"district_name":{"description":"Name of the electoral district","type":"string","key$":"district_name"},"elected_office":{"description":"Type of office (e.g., MP, MLA, Mayor, Councillor, Alderman)","type":"string","key$":"elected_office"},"email":{"description":"Email address","format":"email","type":"string","key$":"email"},"extra":{"description":"Additional data not covered by standard fields","type":"object","key$":"extra"},"first_name":{"description":"First name","type":"string","key$":"first_name"},"gender":{"description":"Gender","enum":["M","F"],"type":"string","key$":"gender"},"last_name":{"description":"Last name","type":"string","key$":"last_name"},"name":{"description":"Full name of the representative","type":"string","key$":"name"},"offices":{"description":"Contact information for representative's offices","items":{"properties":{"fax":{"description":"Fax number","type":"string"},"postal":{"description":"Mailing address","type":"string"},"tel":{"description":"Telephone number","type":"string"},"type":{"description":"Office type (e.g., constituency, legislature)","type":"string"}},"type":"object"},"type":"array","key$":"offices"},"party_name":{"description":"Political party name","type":"string","key$":"party_name"},"personal_url":{"description":"Personal website not on official legislature site","type":"string","key$":"personal_url"},"photo_url":{"description":"URL to representative's photo","type":"string","key$":"photo_url"},"source_url":{"description":"URL where the data is scraped from","type":"string","key$":"source_url"},"url":{"description":"Representative's page on official legislature site","type":"string","key$":"url"}},"required":["name","district_name","elected_office"],"type":"object","x-ref":"#/components/schemas/Representative","index$":0},"key$":"objects","type":"array"}}}}}}},"parameters":[{"name":"boundarySet","in":"path","required":true,"description":"Boundary set identifier","schema":{"type":"string"},"index$":0},{"name":"boundary","in":"path","required":true,"description":"Boundary identifier","schema":{"type":"string"},"index$":1},{"name":"format","in":"query","description":"Output format","schema":{"type":"string","enum":["json","apibrowser"]},"index$":2},{"name":"pretty","in":"query","description":"Pretty print JSON output","schema":{"type":"integer","enum":[0,1]},"index$":3},{"name":"callback","in":"query","description":"JSONP callback function name","schema":{"type":"string"},"index$":4}],"securitySource":"unspecified"},"GET /representatives/{representativeSet}/":{"protocol":"http","operationId":"getRepresentativesFromSet","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"meta":{"type":"object","properties":{"next":{"type":"string","nullable":true},"previous":{"type":"string","nullable":true},"total_count":{"type":"integer"}},"key$":"meta"},"objects":{"type":"array","items":{"type":"object","required":["name","district_name","elected_office"],"properties":{"name":{"description":"Full name of the representative","type":"string"},"district_name":{"description":"Name of the electoral district","type":"string"},"elected_office":{"description":"Type of office (e.g., MP, MLA, Mayor, Councillor, Alderman)","type":"string"},"source_url":{"description":"URL where the data is scraped from","type":"string"},"first_name":{"description":"First name","type":"string"},"last_name":{"description":"Last name","type":"string"},"party_name":{"description":"Political party name","type":"string"},"email":{"description":"Email address","format":"email","type":"string"},"url":{"description":"Representative's page on official legislature site","type":"string"},"photo_url":{"description":"URL to representative's photo","type":"string"},"personal_url":{"description":"Personal website not on official legislature site","type":"string"},"district_id":{"description":"District identifier if available","type":"string"},"gender":{"description":"Gender","enum":["M","F"],"type":"string"},"offices":{"description":"Contact information for representative's offices","items":{"properties":{"fax":{"description":"Fax number","type":"string"},"postal":{"description":"Mailing address","type":"string"},"tel":{"description":"Telephone number","type":"string"},"type":{"description":"Office type (e.g., constituency, legislature)","type":"string"}},"type":"object"},"type":"array"},"extra":{"description":"Additional data not covered by standard fields","type":"object"}},"x-ref":"#/components/schemas/Representative"},"key$":"objects"}},"index$":0}}}}},"parameters":[{"name":"representativeSet","in":"path","required":true,"description":"Representative set identifier (e.g., house-of-commons)","schema":{"type":"string"},"index$":0},{"name":"limit","in":"query","description":"Number of results per page","schema":{"type":"integer","default":20},"index$":1},{"name":"offset","in":"query","description":"Offset for pagination","schema":{"type":"integer","default":0},"index$":2},{"name":"point","in":"query","description":"Find representatives by latitude,longitude","schema":{"type":"string"},"index$":3},{"name":"name","in":"query","description":"Filter by representative name","schema":{"type":"string"},"index$":4},{"name":"first_name","in":"query","description":"Filter by first name","schema":{"type":"string"},"index$":5},{"name":"last_name","in":"query","description":"Filter by last name","schema":{"type":"string"},"index$":6},{"name":"gender","in":"query","description":"Filter by gender","schema":{"type":"string","enum":["M","F"]},"index$":7},{"name":"district_name","in":"query","description":"Filter by district name","schema":{"type":"string"},"index$":8},{"name":"elected_office","in":"query","description":"Filter by elected office","schema":{"type":"string"},"index$":9},{"name":"party_name","in":"query","description":"Filter by party name","schema":{"type":"string"},"index$":10},{"name":"format","in":"query","description":"Output format","schema":{"type":"string","enum":["json","apibrowser"]},"index$":11},{"name":"pretty","in":"query","description":"Pretty print JSON output","schema":{"type":"integer","enum":[0,1]},"index$":12},{"name":"callback","in":"query","description":"JSONP callback function name","schema":{"type":"string"},"index$":13}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let representative_ref01_data = Object.values(setup.data.existing.representative)[0] as any

    // LIST
    const representative_ref01_ent = client.Representative()
    const representative_ref01_match: any = {}
    representative_ref01_match['boundary'] = setup.idmap['boundary01']
    representative_ref01_match['boundary_set'] = setup.idmap['boundary_set01']

    const representative_ref01_list = (await representative_ref01_ent.list(representative_ref01_match)).map((e: any) => e.data())


    // LOAD
    const representative_ref01_match_dt0: any = {}
    representative_ref01_match_dt0.id = representative_ref01_data.id
    const representative_ref01_data_dt0 = (await representative_ref01_ent.load(representative_ref01_match_dt0)).data()
    assert(representative_ref01_data_dt0.id === representative_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/representative/RepresentativeTestData.json')

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
    ['representative01','representative02','representative03','boundary01','boundary02','boundary03','boundary_set01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'REPRESENT_OFFICIALS_TEST_REPRESENTATIVE_ENTID': idmap,
    'REPRESENT_OFFICIALS_TEST_LIVE': 'FALSE',
    'REPRESENT_OFFICIALS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['REPRESENT_OFFICIALS_TEST_REPRESENTATIVE_ENTID']

  const live = 'TRUE' === env.REPRESENT_OFFICIALS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['REPRESENT_OFFICIALS_TEST_REPRESENTATIVE_ENTID']
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
  
